import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/**
 * Robust video upload helper for Ruh Imperium
 * 1. Attempts direct upload to Firebase Cloud Storage (bypasses server payload limits, works on Vercel/production)
 * 2. If Firebase Storage fails, attempts backend /api/upload-video with safe text/json parsing (never throws "Unexpected end of JSON input")
 * 3. If file is small (< 800KB) and cloud fails, falls back to base64 Data URL
 * 4. Otherwise throws a clear, user-friendly error with instructions
 */
export async function uploadVideoFile(file: File, adminPassword?: string): Promise<string> {
  if (!file) {
    throw new Error("No video file selected.");
  }

  // 1. Try Firebase Cloud Storage first (Best for production / Vercel SPA)
  let storageError: any = null;
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

    const snapshot = await uploadBytes(storageRef, file, metadata);
    const downloadUrl = await getDownloadURL(snapshot.ref);
    if (downloadUrl) {
      return downloadUrl;
    }
  } catch (err: any) {
    console.warn("Firebase Storage video upload attempt failed, trying backend fallback:", err);
    storageError = err;
  }

  // 2. Try backend /api/upload-video (when running express server)
  let apiError: any = null;
  try {
    const base64 = await readFileAsDataURL(file);
    const token = adminPassword || (typeof window !== "undefined" && (window as any).VITE_ADMIN_PASSWORD) || "Adi19983@@";

    const response = await fetch("/api/upload-video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token
      },
      body: JSON.stringify({
        videoData: base64,
        filename: file.name
      })
    });

    const responseText = await response.text();
    let data: any = null;
    if (responseText && responseText.trim().length > 0) {
      try {
        data = JSON.parse(responseText);
      } catch {
        // Not valid JSON (e.g. HTML 404 or Vercel static rewrite)
      }
    }

    if (response.ok && data?.url) {
      return data.url;
    }

    if (data?.error) {
      apiError = new Error(data.error);
    } else {
      apiError = new Error(`Server returned HTTP ${response.status} (non-JSON response)`);
    }
  } catch (err: any) {
    console.warn("Backend /api/upload-video attempt failed:", err);
    apiError = err;
  }

  // 3. Fallback to base64 Data URL only if file is small enough for Firestore (< 800 KB)
  if (file.size <= 800 * 1024) {
    try {
      const base64 = await readFileAsDataURL(file);
      return base64;
    } catch (err: any) {
      console.warn("Base64 encoding fallback failed:", err);
    }
  }

  // 4. If all fail, provide a clear, actionable message to the user
  const reasons: string[] = [];
  if (storageError?.message) {
    reasons.push(`Cloud storage: ${storageError.message}`);
  }
  if (apiError?.message) {
    reasons.push(`Backend API: ${apiError.message}`);
  }

  const detail = reasons.length > 0 ? reasons.join(" | ") : "Serverless upload unavailable";
  throw new Error(
    `Unable to upload video directly (${detail}). For larger videos, please paste a YouTube, Vimeo, or direct video link using the "Video Link" button.`
  );
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
