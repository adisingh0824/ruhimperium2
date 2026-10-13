/**
 * Centralised Firestore‑sync helpers for admin‑editable collections.
 *
 * Each admin collection lives under the `settings` Firestore document, e.g.
 *   • settings/coupons
 *   • settings/orders
 *   • settings/blogArticles
 *   • settings/siteSettings (if you add extra fields)
 *
 * The helpers expose two functions:
 *   - syncCollection<T>(path, setState, fallback) – sets up a realtime listener
 *     that updates a React state array whenever the Firestore document changes.
 *   - writeCollection<T>(path, list) – writes the whole array back to Firestore.
 *
 * Both functions use the `withTimeout` wrapper defined in `src/config/firebase.ts`
 * to avoid hanging when the network is offline.
 */
import type { Dispatch, SetStateAction } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, withTimeout } from "../config/firebase";

/**
 * Subscribe a React state setter to a Firestore document.
 *
 * @param path          Document name inside the `settings` collection (e.g. "coupons")
 * @param setState      React's `setXxx` function for the corresponding array state
 * @param fallbackData Initial data to write if the document does not yet exist.
 * @returns            The unsubscribe function that should be called on component unmount.
 */
export const syncCollection = <T>(
  path: string,
  setState: Dispatch<SetStateAction<T[]>>,
  fallbackData: T[]
) => {
  const unsub = onSnapshot(doc(db, "settings", path), (snap) => {
    if (snap.exists()) {
      const data = snap.data() as { list: T[] };
      setState(data.list ?? []);
    } else {
      // Initialise the document with the fallback array
      withTimeout(setDoc(doc(db, "settings", path), { list: fallbackData }));
      setState(fallbackData);
    }
  });
  return unsub;
};

/**
 * Write an entire collection array back to Firestore.
 * Use this after an admin CRUD operation.
 *
 * @param path  Document name inside `settings`
 * @param list  New array to persist
 */
export const writeCollection = <T>(path: string, list: T[]) => {
  return withTimeout(setDoc(doc(db, "settings", path), { list }));
};
