import { db } from "./firebase-config.js";
import { collection, query, where, orderBy, onSnapshot }
  from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

export const COURTS_COLLECTION = "courts";

/**
 * Listen to courts collection with real-time updates
 * @param {Object} filters - Filter options (e.g., { area: "Quận 1" })
 * @param {Function} onData - Callback when data arrives
 * @param {Function} onError - Callback on error
 * @returns {Function} Unsubscribe function
 */
export function listenToCourts(filters, onData, onError) {
  const clauses = [];
  if (filters?.area) {
    clauses.push(where("area", "==", filters.area));
  }

  const q = query(
    collection(db, COURTS_COLLECTION),
    ...clauses,
    orderBy("name", "asc")
  );

  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    },
    (err) => {
      console.error("listenToCourts error:", err);
      onError?.(err);
    }
  );
}
