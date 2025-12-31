//admin/quotes/add-quote/page.js

"use client";
import PageLink from "@/components/PageLink";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddQuotePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    quote: "",
    quotee: "",
    image: null,
    active: true,
  });

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
      [name]: { file, preview: URL.createObjectURL(file) },
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

      // append single files
      if (formData.image?.file) {
        form.append("image", formData.image.file);
      }

      // append text fields
      form.append("quote", formData.quote.trim());
      form.append("quotee", formData.quotee.trim());
      form.append("active", formData.active ? "true" : "false");

      const res = await fetch("/api/quotes", {
        method: "POST",
        body: form,
      });

      if (!formData.quote.trim() || !formData.quotee.trim()) {
        toast.error("Quote and Quotee are required");
        return;
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save quote");
      }
      toast.success("Quote submitted successfully!");
      router.push("/admin");
    } catch (err) {
      console.error("Error submitting profile:", err);
      toast.error("Failed to submit profile");
    } finally {
      setUploading(false);
    }
  };

  return loading ? (
    ""
  ) : (
    <div className="max-w-[1080px] mx-auto py-12">
      <div className="flex w-full flex-row gap-2.5 items-center mb-6">
        <PageLink>
          <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all duration-300 hover:text-[#A4A4A4]" />
        </PageLink>
        <span
          className="text-2xl w-full font-archivo text-[#242222] font-semibold"
          style={{ letterSpacing: "-0.03em" }}
        >
          Enter Quote details
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
              name="quotee"
              value={formData.quotee}
              placeholder="Quotee Name"
              onChange={handleChange}
              className="border border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />

            <div className="w-full flex flex-col gap-1">
              <div className="w-full px-4">
                <label
                  htmlFor="quote"
                  className="w-full font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Quotes
                </label>
              </div>
              <textarea
                id="quote"
                name="quote"
                required
                rows={6}
                value={formData.quote}
                placeholder="Quote Text"
                onChange={handleChange}
                className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              />
            </div>

            <div className="w-full flex flex-row justify-between items-center p-4">
              <label
                htmlFor="active-toggle"
                className="font-archivo font-semibold text-base text-[#5f5f5f]"
              >
                Show quote on aboutpage?
              </label>

              <div
                id="active-toggle"
                name="active"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    active: !prev.active,
                  }))
                }
                className={`relative w-16 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 
              ${formData.active ? "bg-[#2A7FFF]" : "bg-gray-500"}`}
              >
                {/* Switch Knob */}
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300
                ${formData.active ? "right-1" : "left-1"}`}
                />
                {/* Text */}
                <span
                  className={`absolute top-1/2 transform -translate-y-1/2 text-[14px] font-bold tracking-wider transition-colors duration-300
                ${
                  formData.active
                    ? "left-2 text-white"
                    : "right-2 text-gray-300"
                }`}
                >
                  {formData.active ? "YES" : "NO"}
                </span>
              </div>
            </div>

            <div className="w-full px-2.5 py-4 z-10 fixed left-0 bottom-0 items-center justify-center bg-white border-t border-[#dbdbdb] flex flex-row gap-3">
              <button
                type="button"
                onClick={() => (uploading ? "" : router.push("/admin"))}
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
                  htmlFor="image"
                  className="font-archivo font-semibold text-base text-[#5f5f5f]"
                >
                  Image
                </label>
                <button
                  type="button"
                  onClick={() => triggerFileInput("image")}
                  className="px-4 py-3 bg-[#242222] hover:bg-[#454545] transition-all duration-300 cursor-pointer w-[200px] rounded-lg flex flex-row justify-between"
                >
                  <span className="font-archivo font-normal text-base text-white">
                    Upload image
                  </span>
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleFileChange(e, "image")}
                />
              </div>
              {formData.image?.preview && (
                <Image
                  src={formData.image.preview}
                  alt="Logo Preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 bg-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
