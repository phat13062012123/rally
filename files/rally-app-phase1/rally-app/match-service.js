// js/match-service.js
// Đọc và ghi dữ liệu trận đấu trong collection Firestore "matches".

import { db } from "../js/firebase-config.js";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export const MATCHES_COLLECTION = "matches";

// Trận ở trạng thái này mới hiện ra cho người khác tìm thấy.
export const MATCH_STATUS = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  FULL: "FULL",
  CANCELLED: "CANCELLED",
};

export async function createMatch(host, match) {
  const matchData = {
    ...match,
    hostUid: host.uid,
    hostName: host.displayName || "Người chơi Rally",
    hostPhotoURL: host.photoURL || "",
    currentPlayers: 1,
    playerUids: [host.uid],
    status: MATCH_STATUS.PUBLISHED,
    createdAt: Timestamp.now(),
  };

  const matchRef = await addDoc(collection(db, MATCHES_COLLECTION), matchData);
  return matchRef.id;
}

/**
 * Cấu trúc 1 document trong collection "matches" (tham khảo khi tạo dữ liệu mẫu
 * hoặc khi làm Create Match ở phase sau):
 *
 * matches/{matchId}
 * ├── title            string   "Saturday Smash"
 * ├── hostUid          string   uid của người tạo trận
 * ├── hostName         string
 * ├── hostPhotoURL     string
 * ├── area             string   "Quận 1" | "Quận 3" | ... (khớp danh sách favoriteCourt ở onboarding.html)
 * ├── courtName        string   "Sân Lăng Cha Cả"
 * ├── date             string   "2026-09-13"  (YYYY-MM-DD, để so sánh/sort đơn giản)
 * ├── startTime        string   "19:00"
 * ├── endTime          string   "21:00"
 * ├── skillLevel       string   "Beginner" | "Intermediate" | "Advanced" | "All"
 * ├── playingStyle     string[] ["Singles","Doubles"]
 * ├── maxPlayers       number   8
 * ├── currentPlayers   number   5
 * ├── playerUids       string[] [uid1, uid2, ...]
 * ├── pricePerPerson   number   50000
 * ├── status           string   "PUBLISHED"
 * └── createdAt        Timestamp
 */

/**
 * Lắng nghe realtime danh sách trận theo bộ lọc. Trả về hàm unsubscribe.
 *
 * @param {{area?:string, skillLevel?:string, date?:string, onlyOpen?:boolean}} filters
 * @param {(matches:object[]) => void} onData
 * @param {(error:Error) => void} onError
 * @returns {() => void} unsubscribe
 */
export function listenToMatches(filters, onData, onError) {
  const clauses = [];

  // Chỉ hiện trận đã publish. Việc ẩn trận đã đầy chỗ (currentPlayers >= maxPlayers)
  // khi bật "Chỉ hiện trận còn chỗ" được lọc ở phía client (xem findmatch.html),
  // để tránh phải query thêm điều kiện bất đẳng thức trên "currentPlayers" (cần composite
  // index phức tạp hơn và không cộng dồn tốt với orderBy("date")).
  clauses.push(where("status", "==", MATCH_STATUS.PUBLISHED));

  if (filters.area) clauses.push(where("area", "==", filters.area));
  if (filters.skillLevel && filters.skillLevel !== "All") clauses.push(where("skillLevel", "==", filters.skillLevel));
  if (filters.date) clauses.push(where("date", "==", filters.date));

  // Trận gần nhất lên trước. Lưu ý: lần đầu chạy, Firestore có thể báo lỗi kèm link
  // để bạn bấm tạo composite index (where + orderBy nhiều trường) — chỉ cần bấm link đó.
  const q = query(
    collection(db, MATCHES_COLLECTION),
    ...clauses,
    orderBy("date", "asc"),
    orderBy("startTime", "asc"),
    limit(50)
  );

  return onSnapshot(
    q,
    (snap) => {
      const matches = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(matches);
    },
    (err) => {
      console.error("listenToMatches error:", err);
      onError?.(err);
    }
  );
}

/** Định dạng "2026-09-13" -> "Th 7, 13/09" để hiển thị thân thiện hơn. */
export function formatMatchDate(isoDate) {
  if (!isoDate) return "";
  const d = new Date(`${isoDate}T00:00:00`);
  const days = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${days[d.getDay()]}, ${dd}/${mm}`;
}
