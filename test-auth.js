import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function testAuth() {
  try {
    const cred = await signInAnonymously(auth);
    console.log("SUCCESS! UID:", cred.user.uid);
  } catch (e) {
    console.error("Auth Failed:", e);
  }
}

testAuth();
