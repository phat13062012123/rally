// js/notification-service.js
// Quản lý collection "notifications" trong Firestore.
// Phụ thuộc: firebase-config.js phải re-export các hàm Firestore dưới đây.

import {
  db,
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "./firebase-config.js";

const COLLECTION = "notifications";

/**
 * Tạo một notification mới.
 * @returns {Promise<string>} notificationId
 */
export async function createNotification({
  recipientId,
  senderId = null,
  type,
  matchId = null,
  requestId = null,
  title = "",
  message = "",
}) {
  if (!recipientId) throw new Error("recipientId is required");
  if (!type) throw new Error("type is required");

  const ref = await addDoc(collection(db, COLLECTION), {
    recipientId,
    senderId,
    type,
    matchId,
    requestId,
    title,
    message,
    read: false,
    handled: false,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

/**
 * Lắng nghe notification realtime của 1 user.
 * @returns {Function} unsubscribe
 */
export function listenToNotifications(userId, onData, onError) {
  if (!userId) return () => {};
  const q = query(
    collection(db, COLLECTION),
    where("recipientId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(50)
  );
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(items);
    },
    onError
  );
}

export async function markNotificationAsRead(notificationId) {
  if (!notificationId) return;
  await updateDoc(doc(db, COLLECTION, notificationId), { read: true });
}

export async function updateNotification(notificationId, updates) {
  if (!notificationId) return;
  await updateDoc(doc(db, COLLECTION, notificationId), updates);
}

/**
 * Đánh dấu tất cả notification chưa đọc của user thành đã đọc.
 * @returns {Promise<number>} số notification đã cập nhật
 */
export async function markAllNotificationsAsRead(userId) {
  if (!userId) return 0;
  const q = query(
    collection(db, COLLECTION),
    where("recipientId", "==", userId),
    where("read", "==", false)
  );
  const snap = await getDocs(q);
  if (snap.empty) return 0;

  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.update(d.ref, { read: true }));
  await batch.commit();
  return snap.size;
}