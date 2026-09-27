// js/profile-service.js
import { db, serverTimestamp } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const PROFILES_COLLECTION = "users";

/**
 * Lấy hồ sơ người chơi từ Firestore
 */
export async function getPlayerProfile(uid) {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting player profile:", error);
    throw error;
  }
}

/**
 * Tạo hoặc cập nhật hồ sơ người chơi
 */
export async function savePlayerProfile(uid, profileData) {
  try {
    const docRef = doc(db, PROFILES_COLLECTION, uid);
    await setDoc(docRef, profileData, { merge: true });
    return true;
  } catch (error) {
    console.error("Error saving player profile:", error);
    throw error;
  }
}

/**
 * Lắng nghe realtime hồ sơ người chơi
 */
export function listenToPlayerProfile(uid, onData, onError) {
  const docRef = doc(db, PROFILES_COLLECTION, uid);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        onData(snap.data());
      } else {
        onData(null);
      }
    },
    (error) => {
      console.error("Error listening to profile:", error);
      onError?.(error);
    }
  );
}

/**
 * Điều hướng sau khi xác thực, không yêu cầu hoàn tất onboarding
 */
export async function routeAfterAuth(user) {
  if (!user) return;

  window.location.replace("dashboard.html");
}

// API used by onboarding.html to create the initial player profile.
export async function createPlayerProfile(uid, profileData) {
  return savePlayerProfile(uid, {
    uid,
    ...profileData,
    rating: 0,
    matchesPlayed: 0,
    playersMet: 0,
    followers: 0,
    following: 0,
    createdAt: serverTimestamp(),
  });
}
