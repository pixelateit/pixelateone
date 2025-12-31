// utils/deleteImageHelper.js

import {
  deleteWorkImage,
  deleteProfileImage,
  deletePosterImage,
  deleteMiscImage,
  deleteBlogImage,
  deleteQuoteImage,
  deleteUserImage,
  deleteFeaturedImage,
} from "@/lib/deleteImage";
import { toast } from "react-toastify";

/**
 * Generic delete handler for both Work and Profile images
 * @param {"work"|"profiles"|"posters"|"miscs" } type - work or profile
 * @param {String} id - WorkId or ProfileId
 * @param {Object} imageObj - { url?, file?, preview }
 * @param {String} field - DB field (logo, banner, sliderImages, etc.)
 * @param {Function} setFormData - React setState fn
 * @param {Number|null} index - For multi-image fields
 */
async function deleteImageHandler(
  type,
  id,
  imageObj,
  field,
  setFormData,
  index = null
) {
  try {
    if (imageObj?.url) {
      // Only call API if the image exists in Firebase/DB
      if (type === "work") {
        await deleteWorkImage(id, imageObj.url, field);
      } else if (type === "profiles") {
        await deleteProfileImage(id, imageObj.url, field);
      } else if (type === "posters") {
        await deletePosterImage(id, imageObj.url, field);
      } else if (type === "miscs") {
        await deleteMiscImage(id, imageObj.url, field);
      } else if (type === "blogs") {
        await deleteBlogImage(id, imageObj.url, field);
      } else if (type === "quotes") {
        await deleteQuoteImage(id, imageObj.url, field);
      } else if (type === "users") {
        await deleteUserImage(id, imageObj.url, field);
      } else if (type === "featured-image") {
        await deleteFeaturedImage(id, imageObj.url, field);
      }
    }

    // Update local state
    setFormData((prev) => {
      if (index !== null) {
        return {
          ...prev,
          [field]: prev[field].filter((_, i) => i !== index),
        };
      }
      return { ...prev, [field]: null };
    });
  } catch (err) {
    console.error("Image delete failed:", err);
    toast.error("Failed to delete image");
  }
}

// Convenience wrappers
export const handleWorkImageDelete = (
  id,
  imageObj, // pass {url?, file?, preview}
  field,
  setFormData,
  index = null
) => deleteImageHandler("work", id, imageObj, field, setFormData, index);

export const handleProfileImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index = null
) => deleteImageHandler("profiles", id, imageObj, field, setFormData, index);

export const handlePosterImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index = null
) => deleteImageHandler("posters", id, imageObj, field, setFormData, index);

export const handleMiscImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index = null
) => deleteImageHandler("miscs", id, imageObj, field, setFormData, index);

export const handleBlogImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index = null
) => deleteImageHandler("blogs", id, imageObj, field, setFormData, index);

export const handleQuoteImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index = null
) => deleteImageHandler("quotes", id, imageObj, field, setFormData, index);

export const handleUserImageDelete = (
  id,
  imageObj,
  field,
  setFormData,
  index
) => deleteImageHandler("users", id, imageObj, field, setFormData, index);

export const handleFeaturedImageDelete = (
  workId,
  imageObj,
  field,
  setFormData,
  index = null
) =>
  deleteImageHandler(
    "featured-image",
    workId,
    imageObj,
    field,
    setFormData,
    index
  );
