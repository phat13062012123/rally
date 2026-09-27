// js/match-request-service.js
// Quản lý collection "matchRequests" — yêu cầu tham gia trận.
// Doc ID = `${matchId}__${playerId}` → chống duplicate tự nhiên.

import {
  db,
  collection,
  doc,
  query,
  where,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  arrayUnion,
  writeBatch,
} from "./firebase-config.js";
import { createNotification } from "./notification-service.js";

const REQUESTS = "matchRequests";
const MATCHES = "matches";
const ACCEPTANCES = "playerAcceptances";

/**
 * ⚠️ Nếu project lưu UID host dưới field khác, sửa duy nhất hàm này.
 */
function getHostId(match) {
  return (
    match?.hostId ||
    // Trường của các trận được tạo bằng phiên bản Rally trước đây.
    match?.hostUid ||
    match?.ownerId ||
    match?.createdBy ||
    match?.userId ||
    null
  );
}
export function getMatchHostId(match) {
  return getHostId(match);
}

function buildRequestId(matchId, playerId) {
  return `${matchId}__${playerId}`;
}

function buildChatId(matchId, playerId) {
  return `${matchId}__${playerId}`;
}

/**
 * Tạo join request. Ném Error với message là mã lỗi:
 *   AUTH_REQUIRED | MATCH_ID_MISSING | HOST_ID_MISSING | HOST_CANNOT_JOIN
 *   MATCH_NOT_FOUND | MATCH_FULL
 *   REQUEST_PENDING | REQUEST_ACCEPTED | REQUEST_REJECTED | REQUEST_EXISTS | ALREADY_JOINED
 *
 * @returns {Promise<string>} requestId
 */
export async function createJoinRequest({ match, player }) {
  if (!player?.uid) throw new Error("AUTH_REQUIRED");

  const matchId = match?.id || match?.matchId;
  if (!matchId) throw new Error("MATCH_ID_MISSING");

  const hostId = getHostId(match);
  if (!hostId) throw new Error("HOST_ID_MISSING");
  if (hostId === player.uid) throw new Error("HOST_CANNOT_JOIN");

  const reqId = buildRequestId(matchId, player.uid);
  const reqRef = doc(db, REQUESTS, reqId);
  const matchRef = doc(db, MATCHES, matchId);
  const chatId = buildChatId(matchId, player.uid);
  const chatRef = doc(db, "chats", chatId);
  const acceptanceRef = doc(db, ACCEPTANCES, player.uid);

  try {
    await runTransaction(db, async (tx) => {
      const acceptanceSnap = await tx.get(acceptanceRef);
      if (acceptanceSnap.exists()) throw new Error("ALREADY_JOINED");
      const matchSnap = await tx.get(matchRef);
      if (!matchSnap.exists()) throw new Error("MATCH_NOT_FOUND");

      const m = matchSnap.data();
      if (Array.isArray(m.playerUids) && m.playerUids.includes(player.uid)) {
        throw new Error("REQUEST_ACCEPTED");
      }
      const current = m.currentPlayers ?? 0;
      const max = m.maxPlayers ?? 0;
      if (max > 0 && current >= max) throw new Error("MATCH_FULL");

      // Không đọc request trước khi ghi vì document chưa tồn tại có thể bị
      // Firestore Rules từ chối. Rules chỉ cho player `create`, còn `update`
      // chỉ dành cho host, nên set() không thể ghi đè request đã tồn tại.
      tx.set(reqRef, {
        matchId,
        hostId,
        playerId: player.uid,
        playerName: player.displayName || player.email || "Người chơi",
        playerPhotoURL: player.photoURL || "",
        matchTitle: match.title || "",
        status: "pending",
        createdAt: serverTimestamp(),
      });
      // Host và người gửi có thể trao đổi ngay trong lúc chờ duyệt.
      tx.set(chatRef, {
        matchId,
        matchTitle: match.title || m.title || "Trận cầu lông",
        hostId,
        playerId: player.uid,
        participantIds: [hostId, player.uid],
        hostName: m.hostName || match.hostName || "Chủ trận",
        playerName: player.displayName || player.email || "Người chơi",
        lastMessage: "",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    });
  } catch (err) {
    throw err;
  }

  // Notification cho Host — không chặn flow chính nếu fail
  try {
    await createNotification({
      recipientId: hostId,
      senderId: player.uid,
      type: "match_join_request",
      matchId,
      requestId: reqId,
      chatId,
      title: "Yêu cầu tham gia trận",
      message: `${player.displayName || "Người chơi"} muốn tham gia trận "${
        match.title || ""
      }".`,
    });
  } catch (err) {
    console.error("Không gửi được notification cho host:", err);
  }

  return reqId;
}

/**
 * Lắng nghe tất cả request mà 1 player đã gửi.
 * @returns {Function} unsubscribe
 */
export function listenToPlayerJoinRequests(playerId, onData, onError) {
  if (!playerId) return () => {};
  const q = query(collection(db, REQUESTS), where("playerId", "==", playerId));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

export function listenToPlayerAcceptance(playerId, onData, onError) {
  if (!playerId) return () => {};
  return onSnapshot(doc(db, ACCEPTANCES, playerId),
    (snap) => onData(snap.exists() ? snap.data() : null), onError);
}

export async function cancelOtherJoinRequests(requests, acceptedRequestId) {
  const others = requests.filter((request) => request.id !== acceptedRequestId && request.status === "pending");
  for (let i = 0; i < others.length; i += 400) {
    const batch = writeBatch(db);
    others.slice(i, i + 400).forEach((request) =>
      batch.update(doc(db, REQUESTS, request.id), { status: "cancelled", respondedAt: serverTimestamp() }));
    await batch.commit();
  }
}

/**
 * Lắng nghe tất cả request gửi đến 1 host.
 * @returns {Function} unsubscribe
 */
export function listenToHostJoinRequests(hostId, onData, onError) {
  if (!hostId) return () => {};
  const q = query(collection(db, REQUESTS), where("hostId", "==", hostId));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError
  );
}

/**
 * Host chấp nhận request. Transaction đảm bảo:
 *   - request.status: pending → accepted
 *   - match.currentPlayers += 1 (không double)
 *   - không vượt maxPlayers
 *   - mỗi người chơi chỉ có một yêu cầu được chấp nhận
 */
export async function acceptJoinRequest(requestId, hostId) {
  if (!requestId || !hostId) throw new Error("INVALID_ARGS");

  const reqRef = doc(db, REQUESTS, requestId);
  let reqData = null;

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists()) throw new Error("REQUEST_NOT_FOUND");
    reqData = reqSnap.data();

    if (reqData.hostId !== hostId) throw new Error("NOT_HOST");
    if (reqData.status !== "pending") throw new Error("REQUEST_NOT_PENDING");

    const matchRef = doc(db, MATCHES, reqData.matchId);
    const acceptanceRef = doc(db, ACCEPTANCES, reqData.playerId);
    const matchSnap = await tx.get(matchRef);
    const acceptanceSnap = await tx.get(acceptanceRef);
    if (acceptanceSnap.exists()) throw new Error("ALREADY_JOINED");
    if (!matchSnap.exists()) throw new Error("MATCH_NOT_FOUND");

    const match = matchSnap.data();
    const current = match.currentPlayers ?? 0;
    const max = match.maxPlayers ?? 0;
    if (max > 0 && current >= max) throw new Error("MATCH_FULL");

    const responseNotificationRef = doc(collection(db, "notifications"));
    const chatId = buildChatId(reqData.matchId, reqData.playerId);

    tx.set(acceptanceRef, {
      playerId: reqData.playerId,
      hostId,
      matchId: reqData.matchId,
      requestId,
      acceptedAt: serverTimestamp(),
    });
    tx.update(reqRef, { status: "accepted", respondedAt: serverTimestamp() });
    tx.update(matchRef, {
      currentPlayers: current + 1,
      // Giữ danh sách thành viên đồng bộ với số lượng người chơi. arrayUnion
      // cũng giúp an toàn nếu dữ liệu trận cũ chưa có playerUids.
      playerUids: arrayUnion(reqData.playerId),
    });
    // Đổi trạng thái, thêm thành viên và báo cho người chơi phải cùng thành
    // công. Không để trận đã được duyệt nhưng người chơi không nhận kết quả.
    tx.set(responseNotificationRef, {
      recipientId: reqData.playerId,
      senderId: hostId,
      type: "match_request_accepted",
      matchId: reqData.matchId,
      requestId,
      title: "Yêu cầu tham gia được chấp nhận",
      message: `Host đã chấp nhận bạn vào trận "${reqData.matchTitle || ""}".`,
      read: false,
      handled: false,
      createdAt: serverTimestamp(),
      chatId,
    });
  });

  return true;
}

/**
 * Host từ chối request. Không đụng vào currentPlayers.
 */
export async function rejectJoinRequest(requestId, hostId) {
  if (!requestId || !hostId) throw new Error("INVALID_ARGS");

  const reqRef = doc(db, REQUESTS, requestId);
  let reqData = null;

  await runTransaction(db, async (tx) => {
    const reqSnap = await tx.get(reqRef);
    if (!reqSnap.exists()) throw new Error("REQUEST_NOT_FOUND");
    reqData = reqSnap.data();

    if (reqData.hostId !== hostId) throw new Error("NOT_HOST");
    if (reqData.status !== "pending") throw new Error("REQUEST_NOT_PENDING");

    const responseNotificationRef = doc(collection(db, "notifications"));
    tx.update(reqRef, { status: "rejected", respondedAt: serverTimestamp() });
    tx.set(responseNotificationRef, {
      recipientId: reqData.playerId,
      senderId: hostId,
      type: "match_request_rejected",
      matchId: reqData.matchId,
      requestId,
      title: "Yêu cầu tham gia bị từ chối",
      message: `Host đã từ chối yêu cầu tham gia trận "${reqData.matchTitle || ""}".`,
      read: false,
      handled: false,
      createdAt: serverTimestamp(),
    });
  });

  return true;
}
