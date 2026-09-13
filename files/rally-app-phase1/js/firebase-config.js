// ==========================================================================
// FIREBASE INIT — dùng chung cho toàn bộ hệ thống Rally
// Mọi trang (auth.html, onboarding.html, dashboard.html...) import từ đây
// để chỉ có DUY NHẤT MỘT chỗ khởi tạo Firebase App.
// ==========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpD0iha2sLAk3fMMxELGSLzuJdyCkAmL4",
  authDomain: "reclub-8206e.firebaseapp.com",
  projectId: "reclub-8206e",
  storageBucket: "reclub-8206e.firebasestorage.app",
  messagingSenderId: "410587996077",
  appId: "1:410587996077:web:f4c8a066d071008e2b0b24",
  measurementId: "G-4ZKT1MB4RC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth,
  db,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
};
