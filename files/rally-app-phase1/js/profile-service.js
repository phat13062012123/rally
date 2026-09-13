// ==========================================================================
// PROFILE SERVICE
// Quản lý đọc/ghi document users/{uid} trong Firestore.
// Cấu trúc field bám theo playersystem.md + Bước 3 (Tạo hồ sơ) trong luồng.
// ==========================================================================

import { db, doc, getDoc, setDoc, serverTimestamp } from "./firebase-config.js";

/**
 * Lấy hồ sơ người chơi theo uid.
 * @returns {Promise<object|null>} null nếu chưa có hồ sơ (user mới, chưa qua bước onboarding)
 */
export async function getPlayerProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

/**
 * Tạo hồ sơ người chơi lần đầu (Bước 3: Tạo hồ sơ).
 * Field khớp với playersystem.md: displayName, skillLevel, playingStyle, favoriteCourt
 * + các số liệu thống kê khởi tạo = 0 để Player Profile card có dữ liệu để hiển thị.
 */
export async function createPlayerProfile(uid, { displayName, email, skillLevel, playingStyle, favoriteCourt, photoURL }) {
  const profile = {
    uid,
    displayName,
    email,
    photoURL: photoURL || null,
    skillLevel,        // "Beginner" | "Intermediate" | "Advanced"
    playingStyle,       // array: ["Singles"], ["Doubles"], hoặc cả hai
    favoriteCourt,
    rating: 0,
    matchesPlayed: 0,
    playersMet: 0,
    followers: 0,
    following: 0,
    createdAt: serverTimestamp(),
  };
  await setDoc(doc(db, "users", uid), profile);
  return profile;
}

async function readProfileAfterAuth(user) {
  await user.getIdToken();
  try {
    return await getPlayerProfile(user.uid);
  } catch (firstErr) {
    // Token Auth đôi khi chưa kịp gắn vào Firestore ngay sau login/register.
    await new Promise((resolve) => setTimeout(resolve, 450));
    await user.getIdToken(true);
    try {
      return await getPlayerProfile(user.uid);
    } catch {
      throw firstErr;
    }
  }
}

function withTimeout(promise, timeoutMs = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error("PROFILE_READ_TIMEOUT")), timeoutMs);
    }),
  ]);
}

/**
 * Điều hướng sau khi đăng nhập/đăng ký thành công.
 * Auth đã xong thì luôn rời auth.html — không để lỗi Firestore giữ người dùng lại form.
 * - Có hồ sơ -> dashboard.html (trang chủ)
 * - Chưa có hồ sơ -> onboarding.html
 * - Firestore lỗi -> dashboard.html (dashboard tự fallback)
 */
export async function routeAfterAuth(user) {
  try {
    // Không để Firestore Rules hoặc kết nối mạng làm kẹt màn hình auth vô thời hạn.
    const profile = await withTimeout(readProfileAfterAuth(user));
    window.location.replace(profile ? "dashboard.html" : "onboarding.html");
  } catch (err) {
    console.error("Không đọc được hồ sơ Firestore, vẫn vào trang chủ:", err);
    window.location.replace("dashboard.html");
  }
}
