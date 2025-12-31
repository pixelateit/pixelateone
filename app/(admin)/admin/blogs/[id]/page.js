//admin/blogs/[id]/page.js

"use client";
import PageLink from "@/components/PageLink";
import { ArrowLeft, LoaderCircle, Plus } from "lucide-react";
import { handleBlogImageDelete } from "@/utils/deleteImageHelper";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

export default function BlogEditPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { id: blogId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    content: "",
    thumbnail: null,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
  });

  // ------------------------------
  // Fetch Work by ID
  // ------------------------------
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogId}`);
        if (!res.ok) throw new Error("Failed to fetch blog");

        const { blog } = await res.json();

        setFormData({
          title: blog.title || "",
          tags: Array.isArray(blog.tags)
            ? blog.tags.join(", ")
            : blog.tags || "",
          content: blog.content || "",
          thumbnail: blog.thumbnail
            ? { url: blog.thumbnail, preview: blog.thumbnail }
            : null,
          status: blog.status || "draft",
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [loading]);

  // handle basic text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  // handle rich text editor
  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  // auto-fill metadata
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

      if (formData.thumbnail?.file) {
        form.append("thumbnail", formData.thumbnail.file);
      }
      // else if (formData.thumbnail?.preview) {
      //   form.append("thumbnail_existing", formData.thumbnail.preview);
      // }

      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("status", formData.status);
      form.append("metaTitle", formData.metaTitle);
      form.append("metaDescription", formData.metaDescription);
      form.append("tags", formData.tags);

      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save blog");
      }

      toast.success("Blog updated successfully!");
      router.push("/admin/blogs");
    } catch (err) {
      console.error("Error submitting blog:", err);
      toast.error("Failed to submit blog");
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
            Enter Blog details
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
          Enter Blog details
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10 w-full pb-24 relative"
      >
        <div className="w-full md:max-w-[640px]">
          <div className="w-full flex flex-col gap-4 relative mx-auto">
            <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-1">
              <span className="font-archivo font-semibold text-base text-[#5f5f5f]">
                Author:
                <span className="font-normal">{session?.user?.name}</span>
              </span>
              <span className="font-archivo font-semibold text-base text-[#5f5f5f]">
                Date: <span className="font-normal">{formattedDate || ""}</span>
              </span>
            </div>

            <input
              type="text"
              name="title"
              value={formData.title}
              placeholder="Enter Title"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />

            <div className="w-full flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="tags"
                value={formData.tags}
                placeholder="Enter tags (comma separated)"
                onChange={handleChange}
                className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              />

              <select
                name="status"
                placeholder="Select Status"
                value={formData.status}
                onChange={handleChange}
                className="border cursor-pointer w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
                required
              >
                <option defaultValue="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <ReactQuill
              value={formData.content || ""}
              onChange={handleEditorChange}
              theme="snow"
              className="my-quill-editor"
              placeholder="Enter Content..."
            />

            <div className="w-full px-2.5 py-4 z-10 fixed left-0 bottom-0 items-center justify-center bg-white border-t border-[#dbdbdb] flex flex-row gap-3">
              <PageLink
                href={uploading ? "" : "/admin/blogs"}
                className="bg-white font-archivo border border-[#dbdbdb] text-center text-base cursor-pointer font-semibold text-[#5F5F5F] px-4 py-3 rounded-lg hover:bg-[#f2f2f2] transition-all duration-300 w-40"
              >
                Cancel
              </PageLink>
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
            Meta Info
          </span>

          <div className="w-full p-4 flex flex-col gap-4 h-fit bg-white rounded-xl shadow-[0px_2px_2px_rgba(0,0,0,0.25)]">
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              placeholder="Select Meta Title"
              onChange={handleChange}
              className="border w-full cursor-pointer border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
              required
            />

            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              placeholder="Meta Description"
              onChange={handleChange}
              className="border w-full border-[#DBDBDB] px-4 py-3 bg-[#f8f8f8] rounded-lg focus:outline-2 focus:outline-[#0095FF] text-base font-archivo text-[#242222] placeholder:text-[#5f5f5f]"
            />

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
                      handleBlogImageDelete(
                        blogId,
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
