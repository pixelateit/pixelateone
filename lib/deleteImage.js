// lib/deleteImage.js
async function deleteImageGeneric(type, id, imageUrl, field) {
  const res = await fetch(`/api/${type}/${id}/delete-image`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, field }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || "Failed to delete image");
  }
  return data;
}

export const deleteWorkImage = (id, imageUrl, field) =>
  deleteImageGeneric("work", id, imageUrl, field);

export const deleteProfileImage = (id, imageUrl, field) =>
  deleteImageGeneric("profiles", id, imageUrl, field);

export const deletePosterImage = (id, imageUrl, field) =>
  deleteImageGeneric("posters", id, imageUrl, field);

export const deleteMiscImage = (id, imageUrl, field) =>
  deleteImageGeneric("miscs", id, imageUrl, field);

export const deleteBlogImage = (id, imageUrl, field) =>
  deleteImageGeneric("blogs", id, imageUrl, field);

export const deleteQuoteImage = (id, imageUrl, field) =>
  deleteImageGeneric("quotes", id, imageUrl, field);
export const deleteUserImage = (id, imageUrl, field) =>
  deleteImageGeneric("users", id, imageUrl, field);

export const deleteFeaturedImage = (workId, imageUrl, field) =>
  deleteImageGeneric("featured-work", workId, imageUrl, field);
