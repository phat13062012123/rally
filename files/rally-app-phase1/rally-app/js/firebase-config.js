// js/firebase-config.js
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
  writeBatch,
  deleteDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Cấu hình Firebase của bạn - THAY THẾ BẰNG CONFIG CỦA BẠN
const firebaseConfig = {
  apiKey: "AIzaSyBpD0iha2sLAk3fMMxELGSLzuJdyCkAmL4",
  authDomain: "reclub-8206e.firebaseapp.com",
  projectId: "reclub-8206e",
  storageBucket: "reclub-8206e.firebasestorage.app",
  messagingSenderId: "410587996077",
  appId: "1:410587996077:web:f4c8a066d071008e2b0b24",
  measurementId: "G-4ZKT1MB4RC"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export các hàm và đối tượng cần thiết
export {
  auth,
  db,
  googleProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
  writeBatch,
  deleteDoc,
  arrayUnion,
};
