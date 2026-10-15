import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

export interface VideoUploadOutcome {
  url: string;
  isCloudHosted: boolean;
  message?: string;
}

/**
 * Robust video upload helper for Ruh Imperium
 *
 * 1. Attempts direct upload to Firebase Cloud Storage.
 *    - Uses a 90-second timeout to allow full upload of videos up to 50MB.
 *    - Tries both the configured bucket and the standard .appspot.com bucket.
 * 2. If running full-stack, attempts /api/upload-video endpoint.
 * 3. If cloud storage is not yet activated in the Firebase Console, falls back to
 *    an instant local preview Blob URL with a clear explanation of how to activate Storage.
 */
export async function uploadVideoFile(file: File, adminPassword?: string): Promise<VideoUploadOutcome> {
  if (!file) {
    throw new Error("No video file selected.");
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const uniquePath = `videos/${Date.now()}_${cleanName}`;
  const metadata = {
    contentType: file.type || "video/mp4",
    customMetadata: {
      originalName: file.name,
      uploadedAt: new Date().toISOString()
    }
  };

  // 1. Try Firebase Cloud Storage (primary and fallback buckets)
  const bucketsToTry = [
    storage,
    getStorage(storage.app, "gs://ruh-imperium.appspot.com"),
    getStorage(storage.app, "gs://ruh-imperium.firebasestorage.app")
  ];

  for (const targetStorage of bucketsToTry) {
    try {
      const storageRef = ref(targetStorage, uniquePath);
      const uploadPromise = uploadBytes(storageRef, file, metadata).then((snap) =>
        getDownloadURL(snap.ref)
      );

      // Allow up to 90 seconds for videos up to 50MB
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Upload timed out after 90 seconds.")), 90000)
      );

      const downloadUrl = await Promise.race([uploadPromise, timeoutPromise]);
      if (downloadUrl) {
        return {
          url: downloadUrl,
          isCloudHosted: true,
          message: `🎬 Video "${file.name}" uploaded to Cloud Storage and is now broadcasting live to all customers in native quality!`
        };
      }
    } catch (err: any) {
      console.warn("[MediaUpload] Bucket attempt failed:", err?.message || err);
    }
  }

  // 2. Try Node server /api/upload-video endpoint if backend is present
  try {
    const dataUrl = await readFileAsDataURL(file);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (adminPassword) headers["x-admin-token"] = adminPassword;

    const res = await fetch("/api/upload-video", {
      method: "POST",
      headers,
      body: JSON.stringify({ videoData: dataUrl, filename: file.name }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json.url) {
        return {
          url: json.url,
          isCloudHosted: true,
          message: `🎬 Video "${file.name}" saved to server disk and broadcasting live to all visitors!`
        };
      }
    }
  } catch (err: any) {
    console.warn("[MediaUpload] Server upload API skipped/unavailable:", err?.message || err);
  }

  // 3. Fallback: Local preview Blob URL (plays immediately in current session)
  const localBlobUrl = URL.createObjectURL(file);
  return {
    url: localBlobUrl,
    isCloudHosted: false,
    message: `Video "${file.name}" loaded for preview! To broadcast permanently to ALL customers worldwide: 1) Go to Firebase Console -> Storage and click "Get Started", or 2) Paste a YouTube/Vimeo/MP4 direct link in the Direct Video URL field above.`
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
