"use client";
import { useEffect, useRef, useState } from "react";
import addDefault2 from "@/public/addDefault-2.png";
import AddButtonAdmin from "@/components/AddButtonAdmin";
import PageLink from "@/components/PageLink";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { EllipsisVertical, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function BlogAdminPage() {
  const blogRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "/api/blogs?fields=_id,title,slug,createdAt,author,status"
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();
        // ✅ Ensure you set `data.blogs` if API responds { blogs: [...] }
        setBlogs(Array.isArray(data) ? data : data.blogs || []);
        setLoading(false);
      } catch (err) {
        console.error("fetchBlogs failed:", err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [pathname]);

  function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // delete handler
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((p) => p._id !== id));
      setDeleteBlogId(null);
      toast.success("Poster deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete blog");
    }
  };

  useEffect(() => {
    function handleClickOutside(id) {
      if (blogRef.current && !blogRef.current.contains(id.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1080px] py-12">
        <div className="w-full flex flex-row justify-between items-center">
          <span
            className="font-archivo font-semibold text-2xl text-[#242222]"
            style={{ letterSpacing: "-0.02em" }}
          >
            All Blogs/Articles
          </span>
          <p className="font-oswald font-medium text-[#242222] text-sm w-fit">
            <span className="font-archivo text-[#242222]/60">Total:</span> (
            {blogs.length})
          </p>
        </div>

        <div className="w-full flex flex-row gap-5 mt-6">
          <AddButtonAdmin
            href={"/admin/blogs/add-blog"}
            image={addDefault2}
            label="Add Blog"
          />
        </div>

        <div className="w-full h-[1px] bg-[#DBDBDB] my-8" />
        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Recent Blogs
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Created By
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Date created
          </p>
          <div className="w-6 h-2 flex" />
        </div>
        {/*Work Item*/}
        {loading ? (
          <div className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white">
            <div className="w-8 rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
            <div className="w-full flex-1">
              <div className="w-[200px] rounded-md animate-pulse h-6 bg-[#E5E5E5]" />
            </div>
            <div className="w-[200px] hidden md:block rounded-md animate-pulse h-6 bg-[#E5E5E5]" />
            <div className="w-[200px] hidden md:block rounded-md animate-pulse h-6 bg-[#E5E5E5]" />
            <div className="w-8 rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
          </div>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
              ref={blog._id === openDropdownId ? blogRef : null}
            >
              <div
                className={`p-2 rounded-[5px] ${
                  blog?.status === "published" ? "bg-[#0085FF]" : "bg-[#C3C5C7]"
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <PageLink
                href={`/admin/blogs/${blog._id}`}
                className="font-archivo font-medium text-base text-[#242222] flex-1 flex flex-row items-center"
              >
                <span className="w-[200px] md:w-[500px] truncate">
                  {blog.title}
                </span>
                {/* <span
                  className={`ms-2 px-1.5 py-1 ${
                    blog?.status === "draft"
                      ? ` bg-[#dce5f4] `
                      : ` bg-[#a6d8c3] `
                  }  font-semibold rounded-sm text-sm font-archivo uppercase text-[#242222]/50`}
                >
                  {blog.status}
                </span> */}
              </PageLink>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {blog.author}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(blog.createdAt)}
              </p>
              <div className="relative w-fit h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === blog._id ? null : blog._id
                    )
                  }
                  className="w-6 h-6 rounded-[5px] bg-transparent hover:bg-[#e6e6e6] p-0.5 cursor-pointer flex"
                >
                  <EllipsisVertical className="w-5 h-5 text-[#5C5F64]" />
                </button>

                {openDropdownId === blog._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
                    <div className="p-2">
                      <DropdownItem
                        onClick={() => router.push(`/blogs/${blog.slug}`)}
                        icon={<Eye size={16} />}
                        label="View"
                      />
                      <DropdownItem
                        onClick={() => router.push(`/admin/blogs/${blog._id}`)}
                        icon={<Pencil size={16} />}
                        label="Edit"
                      />
                      <DropdownItem
                        className="text-red-500 hover:bg-red-100"
                        onClick={() => {
                          setDeleteBlogId(blog._id);
                          setOpenDropdownId(null);
                        }}
                        icon={<Trash2 size={16} />}
                        label="Delete"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#f2f2f2] transition-all duration-300">
            <p className="font-archivo font-normal text-sm text-center text-[#242222]/80 w-full">
              No records available
            </p>
          </div>
        )}
      </div>

      {deleteBlogId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteBlogId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteBlogId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteBlogId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this blog?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteBlogId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteBlogId)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function DropdownItem({
  icon,
  label,
  onClick,
  className = "text-[#757575] hover:bg-[#f0f0f0]",
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex items-center gap-2 w-full px-3 py-2 text-sm font-archivo font-medium  rounded-md transition duration-300 cursor-pointer " +
        className
      }
    >
      {icon}
      {label}
    </button>
  );
}
