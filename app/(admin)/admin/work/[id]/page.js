"use client";

import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import {
  handleFeaturedImageDelete,
  handleWorkImageDelete,
} from "@/utils/deleteImageHelper";
import PageLink from "@/components/PageLink";

export default function WorkEditPage() {
  // const { data: session } = useSession();
  const router = useRouter();
  const { id: workId } = useParams();

  const [uploading, setUploading] = useState(false);
  const [userID, setUserID] = useState("");
  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    createdBy: "",
    logo: null,
    thumbnail: null,
    banner: null,
    showWork: false,
    weblink: "",
    hasFeaturedWork: false,
    timeline: "",
    clientName: "",
    deliverables: "",
    description: "",
    projectDetails: "",
    teamMembers: "",
    logoDesign: "",
    logoDesignImg: null,
    slider1: [],
    typography: null,
    designProcess: "",
    designProcessImg: null,
    slider2: [],
    featuredTitle: "",
    industry: "",
    bgColor: "",
    isfeatured: false,
    featuredImages: [],
  });

  // ------------------------------
  // Fetch Work by ID
  // ------------------------------
  useEffect(() => {
    const fetchWork = async () => {
      try {
        const res = await fetch(`/api/work/${workId}`);
        if (!res.ok) throw new Error("Failed to fetch work");

        const { work } = await res.json();

        setFormData({
          ...work,
          bgColor: work.featuredWork?.bgColor || "orange",
          isfeatured: work.featuredWork?.isfeatured || false,
          featuredTitle: work.featuredWork?.featuredTitle || "",
          industry: work.featuredWork?.industry || "",
          logo: work.logo ? { url: work.logo, preview: work.logo } : null,
          thumbnail: work.thumbnail
            ? { url: work.thumbnail, preview: work.thumbnail }
            : null,
          typography: work.typography ? { preview: work.typography } : null,
          banner: work.banner
            ? { url: work.banner, preview: work.banner }
            : null,
          logoDesignImg: work.logoDesignImg
            ? { url: work.logoDesignImg, preview: work.logoDesignImg }
            : null,
          designProcessImg: work.designProcessImg
            ? { url: work.designProcessImg, preview: work.designProcessImg }
            : null,
          slider1: (work.slider1 || []).map((url) => ({ url, preview: url })),
          slider2: (work.slider2 || []).map((url) => ({ url, preview: url })),
          featuredImages: (work.featuredWork?.featuredImages || []).map(
            (url) => ({
              url,
              preview: url,
            })
          ),
        });

        setUserID(work.createdBy);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load work");
        setLoading(false);
      }
    };

    if (workId) fetchWork();
  }, [workId]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/users/${userID}`);
        if (!res.ok) throw new Error("Failed to fetch work");

        const user = await res.json();

        setUser(user.name);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load user");
        setLoading(false);
      }
    };

    if (userID) fetchUser();
  }, [userID]);

  // ------------------------------
  // Handle text/boolean changes
  // ------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // trigger hidden input
  const triggerFileInput = (id) => {
    document.getElementById(id).click();
  };

  // ------------------------------
  // Handle file changes
  // ------------------------------
  const handleFileChange = (e, name) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [name]: { file, preview: URL.createObjectURL(file) },
    }));
  };

  const handleMultiFileChange = (e, name) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ...newFiles],
    }));
  };

  function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // ------------------------------
  // Submit handler (PUT update for WorkEditPage)
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const form = new FormData();

      // append single files
      [
        "logo",
        "thumbnail",
        "banner",
        "typography",
        "logoDesignImg",
        "designProcessImg",
      ].forEach((key) => {
        if (formData[key]?.file) {
          form.append(key, formData[key].file);
        }
      });

      // append multiple files
      ["slider1", "slider2", "featuredImages"].forEach((key) => {
        if (formData[key]?.length) {
          formData[key].forEach((f) => form.append(key, f.file));
        }
      });

      // append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (
          ![
            "logo",
            "thumbnail",
            "banner",
            "typography",
            "logoDesignImg",
            "designProcessImg",
            "slider1",
            "slider2",
            "featuredImages",
          ].includes(key)
        ) {
          form.append(key, value);
        }
      });

      const res = await fetch(`/api/work/${workId}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error || "Failed to save work");

      toast.success("Work submitted successfully!");
      router.push("/admin/work");
    } catch (err) {
      console.error("Error submitting work:", err);
      toast.error("Failed to submit work");
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
            Enter work details
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-10 w-full pb-24 relative">
          <div className="w-full flex flex-col gap-4 md:max-w-[640px] relative">
            <div className="w-full flex flex-row justify-between items-center">
              <div className="w-1/3 rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
              <div className="w-[200px] rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
            </div>

            <div className="w-full rounded-md animate-pulse h-12 bg-[#E5E5E5]" />

            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-row justify-between items-center ps-3">
                <div className="w-1/3 rounded-md animate-pulse h-8 bg-[#E5E5E5] flex" />
                <div className="w-[200px] flex rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
              </div>
              <div className="w-20 flex rounded-md animate-pulse h-20 bg-[#E5E5E5]" />
            </div>

            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-row justify-between items-center ps-3">
                <div className="w-1/3 rounded-md animate-pulse h-8 bg-[#E5E5E5] flex" />
                <div className="w-[200px] flex rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
              </div>
              <div className="w-20 flex rounded-md animate-pulse h-20 bg-[#E5E5E5]" />
            </div>

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

            <div className="w-full flex flex-col gap-2.5">
              <div className="w-full flex flex-row justify-between items-center ps-3">
                <div className="w-1/3 rounded-md animate-pulse h-8 bg-[#E5E5E5] flex" />
                <div className="w-[200px] flex rounded-md animate-pulse h-12 bg-[#E5E5E5]" />
              </div>
              <div className="w-20 flex rounded-md animate-pulse h-20 bg-[#E5E5E5]" />
            </div>

            <div className="w-full h-[1px] bg-[#dbdbdb]" />

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
        <PageLink className="h-fit">
          <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all cursor-pointer duration-300 hover:text-[#A4A4A4]" />
        </PageLink>
        <span
          className="text-2xl w-full font-archivo text-[#242222] font-semibold"
          style={{ letterSpacing: "-0.03em" }}
        >
          Enter work details
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10 w-full pb-24 relative"
      >
        <div className="w-full flex flex-col gap-4 md:max-w-[640px] relative">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="font-archivo font-semibold text-base text-[#5f5f5f]">
              Author: <span className="font-normal">{user}</span>
            </span>
            <span className="font-archivo font-semibold text-base text-[#5f5f5f]">
              Date:{" "}
              <span className="font-normal">
                {formattedDate(formData?.createdAt)}
              </span>
            </span>
          </div>

          <div className="w-full flex flex-row justify-between items-center">
            <label
              htmlFor="showWork"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Show Work
            </label>

            <div
              id="showWork"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  showWork: !prev.showWork,
                }))
              }
              className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${formData.showWork ? "bg-[#2A7FFF]" : "bg-gray-500"}`}
            >
              {/* Switch Knob */}
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                ${formData.showWork ? "right-1" : "left-1"}`}
              />
              {/* Text */}
              <span
                className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
                ${
                  formData.showWork
                    ? "left-2 text-white"
                    : "right-2 text-gray-300"
                }`}
              >
                {formData.showWork ? "YES" : "NO"}
              </span>
            </div>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            placeholder="Title / Company name"
            onChange={handleChange}
            className="border border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            required
          />

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="logo"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Logo
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("logo")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
              disabled={!formData.logo ? false : true}
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload image
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, "logo")}
            />
          </div>
          {formData.logo?.preview && (
            <div
              className="w-20 h-20 bg-cover rounded-lg relative"
              style={{ backgroundImage: `url(${formData.logo.preview})` }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
                    { url: formData.logo?.url },
                    "logo",
                    setFormData
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

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
              accept="image/*"
              name="thumbnail"
              hidden
              onChange={(e) => handleFileChange(e, "thumbnail")}
            />
          </div>
          {formData.thumbnail?.preview && (
            <div
              className="w-20 h-20 bg-cover rounded-lg relative"
              style={{ backgroundImage: `url(${formData.thumbnail.preview})` }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
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

          <div className="w-full flex flex-row gap-4">
            <input
              type="text"
              name="weblink"
              value={formData.weblink}
              placeholder="Website link"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />

            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              placeholder="Enter Timeline"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="clientName"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Client name
              </label>
            </div>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              placeholder="Client name"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="deliverables"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Deliverables
              </label>
            </div>
            <input
              type="text"
              id="deliverables"
              value={formData.deliverables}
              name="deliverables"
              placeholder="Deliverables"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />
          </div>

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="banner"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Banner image
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("banner")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
              disabled={!formData.banner ? false : true}
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload image
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="banner"
              name="banner"
              hidden
              accept="image/*"
              onChange={(e) => handleFileChange(e, "banner")}
            />
          </div>
          {formData.banner?.preview && (
            <div
              className="w-full h-20 bg-cover rounded-lg relative"
              style={{ backgroundImage: `url(${formData.banner.preview})` }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
                    { url: formData.banner?.url },
                    "banner",
                    setFormData
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <div className="w-full h-[1px] bg-[#dbdbdb]" />

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

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="projectDetails"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Project details
              </label>
            </div>
            <textarea
              id="projectDetails"
              name="projectDetails"
              value={formData.projectDetails}
              placeholder="Project details"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="teamMembers"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Team Members
              </label>
            </div>
            <textarea
              id="teamMembers"
              name="teamMembers"
              value={formData.teamMembers}
              placeholder="Team Members"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />
          </div>

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="logoDesign"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Logo Design
              </label>
            </div>
            <textarea
              id="logoDesign"
              name="logoDesign"
              value={formData.logoDesign}
              placeholder="Logo Design"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />
          </div>

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="logoDesignImg"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Logo Design Image
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("logoDesignImg")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
              disabled={!formData.logoDesignImg ? false : true}
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload image
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="logoDesignImg"
              name="logoDesignImg"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, "logoDesignImg")}
            />
          </div>
          {formData.logoDesignImg?.preview && (
            <div
              className="w-20 h-20 bg-cover rounded-lg relative"
              style={{
                backgroundImage: `url(${formData.logoDesignImg.preview})`,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
                    { url: formData.logoDesignImg?.url },
                    "logoDesignImg",
                    setFormData
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <div className="w-full h-[1px] bg-[#dbdbdb]" />

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="slider1"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Slider Images 1
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("slider1")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload images
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="slider1"
              name="slider1"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => handleMultiFileChange(e, "slider1")}
            />
          </div>
          <div className="w-full flex flex-row flex-wrap gap-3">
            {formData.slider1?.length > 0 &&
              formData.slider1.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-lg bg-cover"
                  style={{ backgroundImage: `url(${img.preview})` }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleWorkImageDelete(
                        workId,
                        { url: img.url },
                        "slider1",
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

          <div className="w-full h-[1px] bg-[#dbdbdb]" />

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="typography"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Typography
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("typography")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
              disabled={!formData.typography ? false : true}
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload image
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="typography"
              accept="image/*"
              name="typography"
              hidden
              onChange={(e) => handleFileChange(e, "typography")}
            />
          </div>
          {formData.typography?.preview && (
            <div
              className="w-20 h-20 bg-cover rounded-lg relative"
              style={{ backgroundImage: `url(${formData.typography.preview})` }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
                    { url: formData.typography?.url },
                    "typography",
                    setFormData
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <div className="w-full flex flex-col gap-1">
            <div className="w-full px-4">
              <label
                htmlFor="designProcess"
                className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Design Process
              </label>
            </div>
            <textarea
              id="designProcess"
              name="designProcess"
              placeholder="Design Process"
              value={formData.designProcess}
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />
          </div>

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="designProcessImg"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Design Process Image
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("designProcessImg")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] disabled:bg-[#454545] disabled:cursor-default transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
              disabled={!formData.designProcessImg ? false : true}
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload image
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="designProcessImg"
              name="designProcessImg"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, "designProcessImg")}
            />
          </div>

          {formData.designProcessImg?.preview && (
            <div
              className="w-20 h-20 bg-cover rounded-lg relative"
              style={{
                backgroundImage: `url(${formData.designProcessImg.preview})`,
              }}
            >
              <button
                type="button"
                onClick={() =>
                  handleWorkImageDelete(
                    workId,
                    { url: formData.designProcessImg?.url },
                    "designProcessImg",
                    setFormData
                  )
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}

          <div className="w-full h-[1px] bg-[#dbdbdb]" />

          <div className="w-full flex flex-row justify-between items-center ps-3">
            <label
              htmlFor="slider2"
              className="font-archivo font-semibold text-base text-[#5f5f5f]"
            >
              Slider Images 2
            </label>
            <button
              type="button"
              onClick={() => triggerFileInput("slider2")}
              className="px-4 py-3 bg-[#242222] hover:bg-[#454545] transition-all duration-300 w-[200px] cursor-pointer rounded-lg flex flex-row justify-between"
            >
              <span className="font-archivo font-normal text-base text-white">
                Upload images
              </span>
              <Plus className="w-6 h-6 text-white" />
            </button>
            <input
              type="file"
              id="slider2"
              name="slider2"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => handleMultiFileChange(e, "slider2")}
            />
          </div>

          <div className="w-full flex flex-row flex-wrap gap-3">
            {formData.slider2?.length > 0 &&
              formData.slider2.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 rounded-lg bg-cover"
                  style={{ backgroundImage: `url(${img.preview})` }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      handleWorkImageDelete(
                        workId,
                        { url: img.url },
                        "slider2",
                        setFormData,
                        idx // pass index for arrays
                      )
                    }
                    className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>

          <div className="w-full px-2.5 py-4 z-10 fixed left-0 bottom-0 items-center justify-center bg-white border-t border-[#dbdbdb] flex flex-row gap-3">
            <button
              type="button"
              onClick={() => (uploading ? "" : router.push("/admin/work"))}
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

        <div className="w-full md:max-w-[400px] flex flex-col gap-4">
          <div className="w-full p-[6px] bg-[#F2F2F2] rounded-2xl">
            <div className="w-full p-4 flex flex-row justify-between">
              <span
                className="font-archivo font-semibold text-[#242222] text-xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Featured Work
              </span>

              <div
                id="hasFeaturedWork"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    hasFeaturedWork: !prev.hasFeaturedWork,
                  }))
                }
                className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${formData.hasFeaturedWork ? "bg-[#2A7FFF]" : "bg-gray-500"}`}
              >
                {/* Switch Knob */}
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                ${formData.hasFeaturedWork ? "right-1" : "left-1"}`}
                />
                {/* Text */}
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
                ${
                  formData.hasFeaturedWork
                    ? "left-2 text-white"
                    : "right-2 text-gray-300"
                }`}
                >
                  {formData.hasFeaturedWork ? "YES" : "NO"}
                </span>
              </div>
            </div>
            {formData.hasFeaturedWork && (
              <div className="w-full p-4 flex flex-col gap-4 bg-white rounded-xl shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
                <input
                  type="text"
                  name="featuredTitle"
                  placeholder="Title / Company name"
                  value={formData.featuredTitle}
                  onChange={handleChange}
                  className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                  required
                />

                <div className="w-full flex flex-col gap-1">
                  <div className="w-full px-4">
                    <label
                      htmlFor="industry"
                      className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
                    >
                      Industry
                    </label>
                  </div>
                  <input
                    type="text"
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    placeholder="Industry"
                    onChange={handleChange}
                    className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                    required
                  />
                </div>

                <select
                  name="bgColor"
                  placeholder="Select BG Color"
                  value={formData.bgColor}
                  onChange={handleChange}
                  className="border cursor-pointer w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                  required
                >
                  <option value="" disabled>
                    Select BG Color
                  </option>
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="black">Black</option>
                  <option value="violet">Violet</option>
                </select>

                <div className="w-full h-[1px] bg-[#dbdbdb]" />

                <div className="w-full flex flex-row justify-between items-center ps-3">
                  <label
                    htmlFor="featuredImages"
                    className="font-archivo font-semibold text-base text-[#5f5f5f] flex"
                  >
                    Featured Images
                  </label>
                  <button
                    type="button"
                    onClick={() => triggerFileInput("featuredImages")}
                    className="px-4 py-3 bg-[#242222] hover:bg-[#454545] transition-all duration-300 w-[200px] cursor-pointer rounded-lg flex flex-row justify-between"
                  >
                    <span className="font-archivo font-normal text-base text-white">
                      Upload images
                    </span>
                    <Plus className="w-6 h-6 text-white" />
                  </button>
                  <input
                    type="file"
                    id="featuredImages"
                    name="featuredImages"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={(e) => handleMultiFileChange(e, "featuredImages")}
                  />
                </div>

                <div className="w-full flex flex-row flex-wrap gap-3">
                  {formData.featuredImages?.length > 0 &&
                    formData.featuredImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 rounded-lg bg-cover"
                        style={{ backgroundImage: `url(${img.preview})` }}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            handleFeaturedImageDelete(
                              workId,
                              { url: img.url },
                              "featuredImages",
                              setFormData,
                              idx // pass index for arrays
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>

                <div className="w-full flex flex-row justify-between items-center p-4">
                  <label
                    htmlFor="isfeatured"
                    className="font-archivo font-semibold text-base text-[#5f5f5f]"
                  >
                    Show Featured Work
                  </label>

                  <div
                    id="isfeatured"
                    name="isfeatured"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isfeatured: !prev.isfeatured,
                      }))
                    }
                    className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${formData.isfeatured ? "bg-[#2A7FFF]" : "bg-gray-500"}`}
                  >
                    {/* Switch Knob */}
                    <div
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                ${formData.isfeatured ? "right-1" : "left-1"}`}
                    />
                    {/* Text */}
                    <span
                      className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
                ${
                  formData.isfeatured
                    ? "left-2 text-white"
                    : "right-2 text-gray-300"
                }`}
                    >
                      {formData.isfeatured ? "YES" : "NO"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
