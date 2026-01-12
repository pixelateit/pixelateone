//app/(admin)/admin/work/page.js

"use client";
import { useEffect, useRef, useState } from "react";

import AddButtonAdmin from "@/components/AddButtonAdmin";
import addDefault2 from "@/public/addDefault-2.png";
import { FileText, EllipsisVertical, Pencil, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import PageLink from "@/components/PageLink";

export default function WorkAdminPage() {
  const workRef = useRef(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteWorkId, setDeleteWorkId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "/api/work?fields=title,createdAt,createdBy,showWork"
        );

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();

        // ✅ Ensure you set `data.works` if API responds { works: [...] }
        setWorks(Array.isArray(data.works) ? data.works : data);
        setLoading(false);
      } catch (err) {
        console.error("fetchWorks failed:", err);
        setLoading(false);
      }
    };

    fetchWorks();
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
    try {
      const res = await fetch(`/api/work/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete work");
      setWorks((prev) => prev.filter((w) => w._id !== id));
      setDeleteWorkId(null);
      toast.success("Work deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete work");
    }
  };

  useEffect(() => {
    function handleClickOutside(id) {
      if (workRef.current && !workRef.current.contains(id.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="w-full flex justify-center px-5">
      <div className="w-full max-w-[1080px] py-12">
        <div className="w-full flex flex-row justify-between items-center">
          <span
            className="font-archivo font-semibold text-2xl text-[#242222]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Work Section
          </span>
          <p className="font-oswald font-medium text-[#242222] text-sm w-fit">
            <span className="font-archivo text-[#242222]/60">Total:</span> (
            {works.length})
          </p>
        </div>

        <div className="w-full flex flex-row gap-5 mt-6 flex-wrap">
          <AddButtonAdmin href={"/admin/work/add-work"} label="Selected Work" />
          <AddButtonAdmin
            href={"/admin/work/add-work?hasFeaturedWork=true"}
            image={addDefault2}
            label="Featured Work"
          />
        </div>

        <div className="w-full h-[1px] bg-[#DBDBDB] my-8" />
        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Recent Works
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Created by
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
        ) : works.length > 0 ? (
          works.map((work) => (
            <div
              key={work._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
              ref={work._id === openDropdownId ? workRef : null}
            >
              <div
                className={`p-2 rounded-[5px] ${
                  work?.showWork ? "bg-[#0085FF]" : "bg-[#C3C5C7]"
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <PageLink
                href={`/admin/work/${work._id}`}
                className="font-archivo font-medium text-base text-[#242222] flex-1"
              >
                {work.title}
              </PageLink>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {work?.createdBy}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(work.createdAt)}
              </p>
              <div className="relative w-fit h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === work._id ? null : work._id
                    )
                  }
                  className="w-6 h-6 rounded-[5px] bg-transparent hover:bg-[#e6e6e6] p-0.5 cursor-pointer flex"
                >
                  <EllipsisVertical className="w-5 h-5 text-[#5C5F64]" />
                </button>

                {openDropdownId === work._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
                    <div className="p-2">
                      <DropdownItem
                        onClick={() => router.push(`/works/${work._id}`)}
                        icon={<Eye size={16} />}
                        label="View"
                      />
                      <DropdownItem
                        onClick={() => router.push(`/admin/work/${work._id}`)}
                        icon={<Pencil size={16} />}
                        label="Edit"
                      />
                      <DropdownItem
                        className="text-red-500 hover:bg-red-100"
                        onClick={() => {
                          setDeleteWorkId(work._id);
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

      {deleteWorkId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteWorkId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteWorkId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteWorkId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this work?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteWorkId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteWorkId)}
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
