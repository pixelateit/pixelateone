// app/admin/profiles/[id]/page.js

"use client";
import PageLink from "@/components/PageLink";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { handleProfileImageDelete } from "@/utils/deleteImageHelper";

export default function EditCompanyProfilePage() {
  const router = useRouter();
  const { id: profileId } = useParams();

  const [formData, setFormData] = useState({
    company: "",
    thumbnail: null,
    title: "",
    description: "",
    software: "",
    date: new Date().toISOString().split("T")[0],
    sliderImages: [],
    isActive: true,
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(`/api/profiles/${profileId}`);
        if (!res.ok) throw new Error("Failed to fetch work");

        const { profile } = await res.json();

        setFormData({
          ...profile,
          isActive: profile.isActive || false,
          date: profile.date
            ? new Date(profile.date).toISOString().split("T")[0]
            : "",
          thumbnail: profile.thumbnail
            ? { url: profile.thumbnail, preview: profile.thumbnail }
            : null,
          sliderImages: (profile.sliderImages || []).map((url) => ({
            url: url,
            preview: url,
          })),
        });

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };

    if (profileId) fetchWork();
  }, [profileId]);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  // handle text
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  function handleFileSelect(e, field, multi = false) {
    const files = Array.from(e.target.files);

    setFormData((prev) => {
      if (multi) {
        return {
          ...prev,
          [field]: [
            ...(prev[field] || []),
            ...files.map((file) => ({
              file,
              preview: URL.createObjectURL(file),
            })),
          ],
        };
      } else {
        const file = files[0];
        return {
          ...prev,
          [field]: file ? { file, preview: URL.createObjectURL(file) } : null,
        };
      }
    });
  }

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
      if (formData.thumbnail) {
        if (formData.thumbnail.file) {
          // new upload
          form.append("thumbnail", formData.thumbnail.file);
        }
      }

      // --- Slider Images (multiple) ---
      if (formData.sliderImages?.length) {
        formData.sliderImages.forEach((img) => {
          if (img.file) {
            // new upload
            form.append("sliderImages_new", img.file);
          } else {
            // existing image URL
            form.append("sliderImages", img.url);
          }
        });
      }

      // --- Other text fields ---
      form.append("company", formData.company);
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("software", formData.software);
      form.append("date", formData.date);

      form.append("isActive", formData.isActive ? "true" : "false");

      const res = await fetch(`/api/profiles/${profileId}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save profile");
      }
      toast.success("Profile submitted successfully!");
      router.push("/admin/profiles");
    } catch (err) {
      console.error("Error submitting profile:", err);
      toast.error("Failed to submit profile");
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
            Enter Profile details
          </span>
        </div>

        <div className="flex flex-row gap-10 w-full pb-24 relative">
          <div className="w-full flex flex-col gap-4 max-w-[640px] relative">
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

          <div className="w-full max-w-[400px] flex flex-col gap-4">
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
          Enter Profile details
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10 w-full pb-24 relative"
      >
        <div className="w-full md:max-w-[640px]">
          <div className="w-full flex flex-col gap-4 relative mx-auto">
            <input
              type="text"
              name="company"
              value={formData.company}
              placeholder="Company name"
              onChange={handleChange}
              className="border border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />

            <div className="w-full flex flex-row gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                placeholder="Select Date"
                onChange={handleChange}
                className="border w-full cursor-pointer border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              />

              <select
                name="software"
                placeholder="Enter Timeline"
                value={formData.software}
                onChange={handleChange}
                className="border cursor-pointer w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              >
                <option value="" disabled>
                  Select Software
                </option>
                <option value="Figma">Figma</option>
                <option value="Photoshop">Photoshop</option>
                <option value="Canva">Canva</option>
                <option value="Illustrator">Illustrator</option>
              </select>
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4">
                <label
                  htmlFor="title"
                  className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Title
                </label>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="Enter title"
                onChange={handleChange}
                className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4">
                <label
                  htmlFor="description"
                  className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Description
                </label>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Description"
                onChange={handleChange}
                className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
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
                onClick={() =>
                  uploading ? "" : router.push("/admin/profiles")
                }
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
                  htmlFor="logo"
                  className="font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Thumbnail
                </label>
                <button
                  type="button"
                  onClick={() => triggerFileInput("thumbnail")}
                  className="px-4 py-3 bg-[#242222] disabled:bg-[#454545] disabled:cursor-default hover:bg-[#454545] transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
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
                  onChange={(e) => handleFileSelect(e, "thumbnail")}
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
                      handleProfileImageDelete(
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

            <div className="w-full h-[1px] bg-[#dbdbdb] my-3" />

            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-row justify-between items-center ps-3">
                <label
                  htmlFor="sliderImages"
                  className="font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Slider Images
                </label>
                <button
                  type="button"
                  onClick={() => triggerFileInput("sliderImages")}
                  className="px-4 py-3 bg-[#242222] hover:bg-[#454545] transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
                >
                  <span className="font-archivo font-normal text-base text-white">
                    Upload images
                  </span>
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <input
                  type="file"
                  id="sliderImages"
                  name="sliderImages"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => handleFileSelect(e, "sliderImages", true)}
                />
              </div>

              <div className="w-full flex flex-row flex-wrap gap-3">
                {formData.sliderImages?.length > 0 &&
                  formData.sliderImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-lg bg-cover"
                      style={{ backgroundImage: `url(${img.preview})` }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          handleProfileImageDelete(
                            profileId,
                            { url: formData.sliderImages[idx]?.url },
                            "sliderImages",
                            setFormData,
                            idx
                          )
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
