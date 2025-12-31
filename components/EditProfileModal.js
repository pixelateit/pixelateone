"use client";

import { useState, useRef, useEffect } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { handleUserImageDelete } from "@/utils/deleteImageHelper";

export default function EditProfileModal({ isOpen, onClose, user }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    profilePicture: "",
    file: null, // for new upload
  });

  useEffect(() => {
    setFormData({
      _id: user?._id || "",
      name: user?.name || "",
      email: user?.email || "",
      profilePicture: user?.profilePicture || "",
    });
  }, [user]);

  // console.log(formData);

  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file, // actual file for upload
        profilePicture: URL.createObjectURL(file), // preview blob URL
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const body = new FormData();
      if (formData.file) {
        body.append("profilePicture", formData.file);
      }
      body.append("name", formData.name);
      body.append("email", formData.email);

      const res = await fetch(`/api/users/${formData._id}`, {
        method: "PUT",
        body,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update profile");
      }

      toast.success(data.message || "Profile updated successfully!");
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      toast.error(data.message || "Failed to update profile");
    } finally {
      setUploading(false);
      router.refresh();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-5 w-full max-w-md shadow-lg border border-[#e5e5e5]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-archivo text-xl font-semibold mb-4">
          Edit Profile
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center ps-1">
              <label
                htmlFor="profilePicture"
                className="font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Profile Picture
              </label>
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-3 bg-[#242222] disabled:bg-[#454545] disabled:cursor-default hover:bg-[#454545] transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
                disabled={!formData.profilePicture ? false : true}
              >
                <span className="font-archivo font-normal text-base text-white">
                  Upload image
                </span>
                <Plus className="w-6 h-6 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                name="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>
            {formData?.profilePicture && (
              <div
                className="w-20 h-20 bg-cover rounded-lg relative"
                style={{
                  backgroundImage: `url(${formData.profilePicture})`,
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleUserImageDelete(
                      formData._id,
                      { url: formData.profilePicture },
                      "profilePicture",
                      setFormData
                    )
                  }
                  className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-1">
              <label
                htmlFor="name"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Name
              </label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-1">
              <label
                htmlFor="email"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Email
              </label>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => (uploading ? "" : onClose())}
              className="bg-white font-archivo border border-[#dbdbdb] text-center text-base cursor-pointer font-semibold text-[#5F5F5F] px-4 py-3 rounded-lg hover:bg-[#f2f2f2] transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-[#2A7FFF] disabled:bg-[#A8B6CD] disabled:hover:bg-[#95a1b4] font-archivo font-semibold cursor-pointer text-base text-white px-4 py-3 rounded-lg flex gap-1 items-center justify-center hover:bg-blue-600 transition-all duration-300 w-40"
            >
              <span>{uploading ? "Uploading..." : "Save"}</span>{" "}
              {uploading ? (
                <LoaderCircle className="w-6 h-6 text-[#eeeeee] animate-spin" />
              ) : (
                ""
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
