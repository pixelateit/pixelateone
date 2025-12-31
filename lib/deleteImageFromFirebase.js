import { adminStorage } from "@/lib/firebaseAdmin";
import { getPathFromUrl } from "@/lib/getPathFromUrl";

export async function deleteImageFromFirebase(imageUrl) {
  const filePath = getPathFromUrl(imageUrl);
  if (!filePath) {
    console.warn("Could not extract Firebase file path:", imageUrl);
    return;
  }

  try {
    console.log("Deleting:", filePath);
    await adminStorage.file(filePath).delete();
  } catch (err) {
    // ignore "No such object" — already deleted
    if (!err.message.includes("No such object")) {
      console.warn("Firebase delete failed:", err.message);
    }
  }
}
