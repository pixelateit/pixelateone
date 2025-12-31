import { deleteImageFromFirebase } from "@/lib/deleteImageFromFirebase";

export async function deleteImageDbAndFirebase(Model, id, imageUrl, field) {
  if (!imageUrl || !field) {
    throw new Error("Missing imageUrl or field");
  }

  const doc = await Model.findById(id);
  if (!doc) {
    throw new Error("Document not found");
  }

  // Delete from Firebase
  await deleteImageFromFirebase(imageUrl);

  // Update DB
  if (Array.isArray(doc[field])) {
    doc[field] = doc[field].filter((url) => url !== imageUrl);
  } else if (doc[field] === imageUrl) {
    doc[field] = null;
  } else {
    doc[field] = null;
  }

  await doc.save();

  return doc;
}
