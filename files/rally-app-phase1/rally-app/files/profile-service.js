// js/profile-service.js
// Đọc/ghi hồ sơ người chơi trong collection Firestore "users".
// Quy tắc #5: mỗi user chỉ có đúng 1 document, ID document = uid.

import { db, doc, getDoc, setDoc, serverTimestamp } from "./firebase-config.js";

const USERS_COLLECTION = "users";

/**
 * Đọc hồ sơ người chơi theo uid.
 * @param {string} uid
 * @returns {Promise<object|null>} object hồ sơ, hoặc null nếu user chưa tạo hồ sơ (cần onboarding)
 */
export async function getPlayerProfile(uid) {
  const ref = doc(db, USERS_COLLECTION, uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

/**
 * Tạo hồ sơ người chơi lần đầu (bước Onboarding, Bước 3/3).
 * @param {string} uid
 * @param {{displayName:string, email:string, photoURL:string, skillLevel:string, playingStyle:string[], favoriteCourt:string}} data
 */
export async function createPlayerProfile(uid, data) {
  const { displayName, email, photoURL, skillLevel, playingStyle, favoriteCourt } = data;
  const ref = doc(db, USERS_COLLECTION, uid);
  await setDoc(ref, {
    uid,
    displayName: displayName || "",
    email: email || "",
    photoURL: photoURL || "",
    skillLevel: skillLevel || "Intermediate",
    playingStyle: playingStyle || [],
    favoriteCourt: favoriteCourt || "",
    rating: 0,
    matchesPlayed: 0,
    playersMet: 0,
    followers: 0,
    following: 0,
    createdAt: serverTimestamp(),
  });
}

/**
 * Gọi ngay sau khi đăng nhập/đăng ký thành công (dùng trong auth.html):
 * - Chưa có hồ sơ  -> onboarding.html
 * - Đã có hồ sơ    -> dashboard.html
 * @param {import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js").User} user
 */
export async function routeAfterAuth(user) {
  try {
    const profile = await getPlayerProfile(user.uid);
    window.location.replace(profile ? "dashboard.html" : "onboarding.html");
  } catch (err) {
    console.error("routeAfterAuth: không đọc được hồ sơ Firestore:", err);
    // Auth đã thành công; nếu Firestore lỗi tạm thời, vẫn cho vào onboarding
    // để user tự tạo hồ sơ thay vì kẹt lại ở trang đăng nhập.
    window.location.replace("onboarding.html");
  }
}
