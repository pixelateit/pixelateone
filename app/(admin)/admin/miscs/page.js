"use client";
import { useEffect, useRef, useState } from "react";
import addDefault2 from "@/public/addDefault-2.png";
import AddButtonAdmin from "@/components/AddButtonAdmin";
import PageLink from "@/components/PageLink";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { EllipsisVertical, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function MiscellaneousAdminPage() {
  const miscsRef = useRef(null);
  const [miscs, setMiscs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteMiscId, setDeleteMiscId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchMiscs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/miscs");
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const { miscs } = await res.json();
        setMiscs(Array.isArray(miscs) ? miscs : []);
        setLoading(false);
      } catch (err) {
        console.error("fetchMiscs failed:", err);
        setLoading(false);
      }
    };
    fetchMiscs();
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
    if (!confirm("Are you sure you want to delete this misc project?")) return;
    try {
      const res = await fetch(`/api/miscs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete project");
      setMiscs((prev) => prev.filter((m) => m._id !== id));
      setDeleteMiscId(null);
      toast.success("Project deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete project");
    }
  };

  useEffect(() => {
    function handleClickOutside(id) {
      if (miscsRef.current && !miscsRef.current.contains(id.target)) {
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
          <h1
            className="font-archivo font-semibold text-2xl text-[#242222]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Miscellaneous
          </h1>
          <p className="font-oswald font-medium text-[#242222] text-sm w-fit">
            <span className="font-archivo text-[#242222]/60">Total:</span> (
            {miscs.length})
          </p>
        </div>

        <div className="w-full flex flex-row gap-5 mt-6">
          <AddButtonAdmin
            href={"/admin/miscs/add-miscs"}
            image={addDefault2}
            label="Add Miscellaneous"
          />
        </div>

        <div className="w-full h-[1px] bg-[#DBDBDB] my-8" />
        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Recent Projects
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Project Date
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
        ) : miscs.length > 0 ? (
          miscs.map((misc) => (
            <div
              key={misc._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
              ref={misc._id === openDropdownId ? miscsRef : null}
            >
              <div
                className={`p-2 rounded-[5px] ${
                  misc?.isActive ? "bg-[#0085FF]" : "bg-[#C3C5C7]"
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <PageLink
                href={`/admin/miscs/${misc._id}`}
                className="font-archivo font-medium text-base text-[#242222] flex-1"
              >
                <span className="w-[200px] flex md:w-[500px] truncate">
                  {misc.title}
                </span>
              </PageLink>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(misc.date)}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(misc.createdAt)}
              </p>
              <div className="relative w-fit h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === misc._id ? null : misc._id
                    )
                  }
                  className="w-6 h-6 rounded-[5px] bg-transparent hover:bg-[#e6e6e6] p-0.5 cursor-pointer flex"
                >
                  <EllipsisVertical className="w-5 h-5 text-[#5C5F64]" />
                </button>

                {openDropdownId === misc._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
                    <div className="p-2">
                      <DropdownItem
                        onClick={() => router.push(`/admin/miscs/${misc._id}`)}
                        icon={<Pencil size={16} />}
                        label="Edit"
                      />
                      <DropdownItem
                        className="text-red-500 hover:bg-red-100"
                        onClick={() => {
                          setDeleteMiscId(misc._id);
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

      {deleteMiscId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteMiscId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteMiscId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteMiscId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this project?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteMiscId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteMiscId)}
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
