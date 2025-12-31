// lib/uploadFile.js
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function uploadFile(file, folder = "works", onProgress) {
  return new Promise((resolve, reject) => {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filePath);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress); // callback for progress
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

// helper for multiple files
export async function uploadFiles(files = [], folder = "works", onProgress) {
  if (!files || !files.length) return [];
  return await Promise.all(
    files.map((file, i) =>
      uploadFile(
        file,
        folder,
        (p) => onProgress?.(i, p) // track per-file progress
      )
    )
  );
}
