//admin/miscs/[id]/page.js

"use client";
import PageLink from "@/components/PageLink";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleMiscImageDelete } from "@/utils/deleteImageHelper";

export default function EditMiscPage() {
  const router = useRouter();
  const { id: miscId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    thumbnail: null,
    date: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  // Fetch existing misc if editing
  useEffect(() => {
    const fetchMisc = async () => {
      try {
        const res = await fetch(`/api/miscs/${miscId}`);
        if (!res.ok) throw new Error("Failed to fetch misc");

        const { miscs } = await res.json();

        setFormData({
          ...miscs,
          isActive: miscs.isActive || false,
          date: miscs.date
            ? new Date(miscs.date).toISOString().split("T")[0]
            : "",
          thumbnail: miscs.thumbnail
            ? { url: miscs.thumbnail, preview: miscs.thumbnail }
            : null,
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load misc data");
        setLoading(false);
      }
    };

    if (miscId) fetchMisc();
  }, [miscId]);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  // handle text
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle single file
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      [name]: file ? { file, preview: URL.createObjectURL(file) } : null,
    }));
  };

  // trigger hidden input
  const triggerFileInput = (id) => {
    document.getElementById(id).click();
  };

  // submit form → API (Admin SDK handles uploads)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const form = new FormData();

      // --- Thumbnail (single) ---
      if (formData.thumbnail?.file) {
        // new upload
        form.append("thumbnail", formData.thumbnail.file);
      }

      // append text fields
      form.append("title", formData.title.trim());
      form.append("date", formData.date);
      form.append("isActive", formData.isActive ? "true" : "false");

      const res = await fetch(`/api/miscs/${miscId}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save misc project");
      }
      toast.success("Misc project submitted successfully!");
      router.push("/admin/miscs");
    } catch (err) {
      console.error("Error submitting misc project:", err);
      toast.error("Failed to submit misc project");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="max-w-[1080px] mx-auto py-12">
        <div className="flex w-full flex-row gap-2.5 items-center mb-6">
          <PageLink>
            <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all duration-300 hover:text-[#A4A4A4]" />
          </PageLink>
          <span
            className="text-2xl w-full font-archivo text-[#242222] font-semibold"
            style={{ letterSpacing: "-0.03em" }}
          >
            Enter Misc details
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full pb-24 relative">
          <div className="w-full flex flex-col gap-4 md:max-w-[640px] relative">
            <div className="w-full rounded-md animate-pulse h-12 bg-[#E5E5E5]" />

            <div className="w-full flex flex-row gap-4">
              <div className="w-full flex rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
              <div className="w-full flex rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4">
                <div className="w-[100px] rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
              </div>
              <div className="w-full rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4">
                <div className="w-[100px] rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
              </div>
              <div className="w-full rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
            </div>
          </div>

          <div className="w-full md:max-w-[400px] flex flex-col gap-4">
            <div className="w-full p-[6px] bg-[#F2F2F2] rounded-2xl">
              <div className="w-full p-4 flex flex-row justify-between">
                <div className="w-[120px] rounded-md animate-pulse h-8 bg-[#E5E5E5] flex" />
                <div className="w-16 rounded-md animate-pulse h-8 bg-[#E5E5E5] flex" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="max-w-[1080px] mx-auto py-12">
      <div className="flex w-full flex-row gap-2.5 items-center mb-6">
        <PageLink>
          <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all duration-300 hover:text-[#A4A4A4]" />
        </PageLink>
        <span
          className="text-2xl w-full font-archivo text-[#242222] font-semibold"
          style={{ letterSpacing: "-0.03em" }}
        >
          Enter Misc details
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10 w-full pb-24 relative"
      >
        <div className="w-full md:max-w-[640px]">
          <div className="w-full flex flex-col gap-4 relative mx-auto">
            <div className="w-full flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Enter title"
                onChange={handleChange}
                className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                placeholder="Select Date"
                onChange={handleChange}
                className="border w-full cursor-pointer border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              />
            </div>

            <div className="w-full flex flex-row justify-between items-center p-4">
              <label
                htmlFor="active-toggle"
                className="font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Show it to the public?
              </label>

              <div
                id="active-toggle"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${formData.isActive ? "bg-[#2A7FFF]" : "bg-gray-500"}`}
              >
                {/* Switch Knob */}
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                ${formData.isActive ? "right-1" : "left-1"}`}
                />
                {/* Text */}
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
                ${
                  formData.isActive
                    ? "left-2 text-white"
                    : "right-2 text-gray-300"
                }`}
                >
                  {formData.isActive ? "YES" : "NO"}
                </span>
              </div>
            </div>

            <div className="w-full px-2.5 py-4 z-10 fixed left-0 bottom-0 items-center justify-center bg-white border-t border-[#dbdbdb] flex flex-row gap-3">
              <button
                type="button"
                onClick={() => (uploading ? "" : router.push("/admin/miscs"))}
                className="bg-white font-archivo border border-[#dbdbdb] text-center text-base cursor-pointer font-semibold text-[#5F5F5F] px-4 py-3 rounded-lg hover:bg-[#f2f2f2] transition-all duration-300 w-40"
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
          </div>
        </div>

        <div className="w-full md:max-w-[400px] flex flex-col p-1.5 bg-[#EEEEEE] rounded-2xl h-fit">
          <span
            className="font-archivo font-semibold text-[#242222] text-xl p-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Image Uploads
          </span>

          <div className="w-full p-4 flex flex-col gap-4 h-fit bg-white rounded-xl shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-row justify-between items-center ps-3">
                <label
                  htmlFor="thumbnail"
                  className="font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Thumbnail
                </label>
                <button
                  type="button"
                  onClick={() => triggerFileInput("thumbnail")}
                  className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
                  disabled={!formData.thumbnail ? false : true}
                >
                  <span className="font-archivo font-normal text-base text-white">
                    Upload image
                  </span>
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                />
              </div>
              {formData.thumbnail?.preview && (
                <div
                  className="w-20 h-20 bg-cover rounded-lg relative"
                  style={{
                    backgroundImage: `url(${formData.thumbnail.preview})`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleMiscImageDelete(
                        profileId,
                        { url: formData.thumbnail?.url },
                        "thumbnail",
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
          </div>
        </div>
      </form>
    </div>
  );
}
