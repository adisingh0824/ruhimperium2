import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebaseConfig from "../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

// The AI Studio project uses a specific named database, not the (default) database
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId || "(default)");

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
