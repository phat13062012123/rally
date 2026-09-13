// js/firebase-config.js
// Nơi DUY NHẤT khởi tạo Firebase App. Mọi file khác (auth.html, onboarding.html,
// dashboard.html, profile-service.js, match-service.js sau này...) chỉ import từ đây,
// không gọi initializeApp() ở đâu khác để tránh khởi tạo trùng.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

// ⚠️ QUAN TRỌNG: thay các giá trị TODO dưới đây bằng config THẬT của bạn
// (Firebase Console → Project settings → Your apps → SDK setup and configuration).
// Vì bạn đã đăng nhập/đăng ký chạy được rồi, nghĩa là bạn đang có 1 bộ config thật
// đang dùng — hãy copy đúng bộ đó vào đây, đừng để nguyên placeholder.
const firebaseConfig = {
  apiKey: "TODO_API_KEY",
  authDomain: "TODO_PROJECT.firebaseapp.com",
  projectId: "TODO_PROJECT_ID",
  storageBucket: "TODO_PROJECT_ID.appspot.com",
  messagingSenderId: "TODO_SENDER_ID",
  appId: "TODO_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Re-export các hàm Auth — đúng với cách auth.html / onboarding.html / dashboard.html
// đang import (`import { auth, onAuthStateChanged, signOut } from "./js/firebase-config.js"`)
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
};

// Re-export các hàm Firestore hay dùng để profile-service.js (và match-service.js
// ở phase sau) import gọn từ một chỗ duy nhất thay vì import lại từ CDN mỗi file.
export { doc, getDoc, setDoc, updateDoc, serverTimestamp };
