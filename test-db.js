import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfig = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

async function checkData() {
  const settingsDoc = await getDoc(doc(db, "settings", "site"));
  console.log("Site Settings:", settingsDoc.exists() ? "EXISTS" : "MISSING");
  if (settingsDoc.exists()) {
      console.log(settingsDoc.data());
  }

  const productsSnap = await getDocs(collection(db, "products"));
  console.log("Products Count:", productsSnap.size);
  if (!productsSnap.empty) {
      console.log("First Product:", productsSnap.docs[0].id, productsSnap.docs[0].data().name);
  }
}

checkData().catch(console.error);
