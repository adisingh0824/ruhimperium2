import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, doc, getDocFromServer } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage } from "firebase/storage";
import firebaseConfig from "../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

// Force Long Polling to bypass mobile carrier WebSocket blocks and guarantee sync
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const storage = getStorage(app);

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
