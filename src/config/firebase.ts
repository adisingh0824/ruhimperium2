import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";
import defaultConfig from "../../firebase-applet-config.json";

// Allow runtime override via Vite environment variables
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || defaultConfig.measurementId
};

const app = initializeApp(config);

// Connect to the (default) database created by the user in the Firebase Console
export const db = getFirestore(app);

export const auth = getAuth(app);
export const storage = getStorage(app);

// Helper to prevent infinite hangs on offline/missing databases
export const withTimeout = <T>(promise: Promise<T>, ms: number = 4000): Promise<T> => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("Connection to live database timed out. Ensure your database is active."));
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

// Validate and test initial connection, and sign in anonymously to satisfy Storage rules
async function validateConnection() {
  try {
    await signInAnonymously(auth);
    console.log("Firebase Auth signed in anonymously.");
  } catch (error) {
    console.warn("Anonymous auth failed (Storage uploads may fallback to Base64 if rules require auth):", error);
  }

  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase/Firestore connected successfully!");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase configuration or network note: The client is offline or starting up.");
    } else {
      console.log("Firestore status update:", error);
    }
  }
}
validateConnection();
