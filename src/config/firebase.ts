// Firebase SDK initialization for Ruh Imperium
// This file replaces the previous env‑based config with the concrete values you provided.
// It exports the Firestore DB, Storage bucket, optional Analytics, and a timeout helper.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// -----------------------------------------------------------------------------
// Your Firebase project credentials – copy‑paste from the Firebase console.
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCHzalBGVMTP3rRAdLaUZsbpl56JhY6l54",
  authDomain: "ruh-imperium.firebaseapp.com",
  projectId: "ruh-imperium",
  storageBucket: "ruh-imperium.firebasestorage.app",
  messagingSenderId: "117266018138",
  appId: "1:117266018138:web:fe9873ad4de79a4f4dcd63",
  measurementId: "G-818PXTEQSR",
};

// Initialise Firebase app (singleton)
const app = initializeApp(firebaseConfig);

// Export core services used throughout the codebase
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

/**
 * Helper that adds a timeout + simple error handling to any Firestore write.
 * Usage: `withTimeout(() => setDoc(...))`.
 */
export const withTimeout = async (promise: Promise<any>, ms = 8000) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Firestore write timed out"));
    }, ms);
    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
  });
};
