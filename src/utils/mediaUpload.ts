import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export interface VideoUploadOutcome {
  url: string;
  isCloudHosted: boolean;
  message?: string;
}

/**
 * Robust video upload helper for Ruh Imperium
 *
 * 1. Attempts direct upload to Firebase Cloud Storage with a 4-second timeout.
 * 2. If Cloud Storage is not provisioned (or fails), safely falls back to an instant
 *    local Blob URL so the admin can immediately preview the video in native quality
 *    without the UI ever freezing or hanging.
 */
export async function uploadVideoFile(file: File, _adminPassword?: string): Promise<VideoUploadOutcome> {
  if (!file) {
    throw new Error("No video file selected.");
  }

  // 1. Try Firebase Cloud Storage with a 4-second timeout
  try {
    const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const uniquePath = `videos/${Date.now()}_${cleanName}`;
    const storageRef = ref(storage, uniquePath);
    const metadata = {
      contentType: file.type || "video/mp4",
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString()
      }
    };

    const uploadPromise = uploadBytes(storageRef, file, metadata).then((snap) =>
      getDownloadURL(snap.ref)
    );

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firebase Storage request timed out (bucket not provisioned or offline)")), 4000)
    );

    const downloadUrl = await Promise.race([uploadPromise, timeoutPromise]);
    if (downloadUrl) {
      return {
        url: downloadUrl,
        isCloudHosted: true,
        message: `Scent film "${file.name}" uploaded to cloud and broadcasting live to all customers in native quality!`
      };
    }
  } catch (err: any) {
    console.warn("Cloud storage attempt timed out or failed (bucket may not be provisioned):", err?.message);
  }

  // 2. Safe local playback fallback (plays immediately, never hangs)
  const localBlobUrl = URL.createObjectURL(file);
  return {
    url: localBlobUrl,
    isCloudHosted: false,
    message: `Video "${file.name}" loaded and playing in your hero banner! To broadcast permanently to ALL customers worldwide, paste a YouTube, Vimeo, or direct .mp4 URL into the Direct Video URL field above.`
  };
}

/**
 * Reads a File as Base64 Data URL
 */
export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as data URL"));
      }
    };
    reader.onerror = () => reject(reader.error || new Error("File reading error"));
    reader.readAsDataURL(file);
  });
}
