// js/profile-service.js
import { db } from "./firebase-config.js";
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
 * Điều hướng sau khi đăng nhập dựa trên trạng thái hồ sơ
 */
export async function routeAfterAuth(user) {
  if (!user) return;
  
  try {
    const profile = await getPlayerProfile(user.uid);
    if (!profile) {
      window.location.replace("onboarding.html");
    } else {
      // Kiểm tra xem user đã hoàn thành onboarding chưa
      if (!profile.skillLevel || !profile.favoriteCourt) {
        window.location.replace("onboarding.html");
      } else {
        window.location.replace("dashboard.html");
      }
    }
  } catch (error) {
    console.error("Error routing after auth:", error);
    window.location.replace("dashboard.html");
  }
}
