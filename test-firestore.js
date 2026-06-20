import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json"));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId || "(default)");

async function test() {
  try {
    const d = doc(db, "settings", "connection_test");
    await setDoc(d, { timestamp: Date.now() });
    console.log("Write success!");
    const snap = await getDoc(d);
    console.log("Read success!", snap.data());
  } catch (e) {
    console.error("Error:", e.message);
  }
  process.exit();
}
test();
