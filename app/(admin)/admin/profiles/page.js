// admin/profiles/page.js
"use client";
import { useEffect, useRef, useState } from "react";
import addDefault2 from "@/public/addDefault-2.png";
import AddButtonAdmin from "@/components/AddButtonAdmin";
import PageLink from "@/components/PageLink";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { EllipsisVertical, Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ProfileAdminPage() {
  const profileRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteProfileId, setDeleteProfileId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/profiles");

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();

        // ✅ Ensure you set `data.profiles` if API responds { profiles: [...] }
        setProfiles(Array.isArray(data.profiles) ? data.profiles : data);
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
    if (!confirm("Are you sure you want to delete this profile?")) return;
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete profile");
      setProfiles((prev) => prev.filter((p) => p._id !== id));
      setDeleteProfileId(null);
      toast.success("Profile deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete profile");
    }
  };

  useEffect(() => {
    function handleClickOutside(id) {
      if (profileRef.current && !profileRef.current.contains(id.target)) {
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
            Company Profiles
          </h1>
          <p className="font-oswald font-medium text-[#242222] text-sm w-fit">
            <span className="font-archivo text-[#242222]/60">Total:</span> (
            {profiles.length})
          </p>
        </div>

        <div className="w-full flex flex-row gap-5 mt-6">
          <AddButtonAdmin
            href={"/admin/profiles/add-profile"}
            image={addDefault2}
            label="Company Profile"
          />
        </div>

        <div className="w-full h-[1px] bg-[#DBDBDB] my-8" />
        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Recent Profiles
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Company
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
        ) : profiles.length > 0 ? (
          profiles.map((profile) => (
            <div
              key={profile._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
              ref={profile._id === openDropdownId ? profileRef : null}
            >
              <div
                className={`p-2 rounded-[5px] ${
                  profile?.isActive ? "bg-[#0085FF]" : "bg-[#C3C5C7]"
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <PageLink
                href={`/admin/profiles/${profile._id}`}
                className="font-archivo w-full font-medium text-base text-[#242222] flex-1"
              >
                <span className="w-[200px] flex md:w-[500px] truncate">
                  {profile.title}
                </span>
              </PageLink>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {profile?.company}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(profile.createdAt)}
              </p>
              <div className="relative w-fit h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === profile._id ? null : profile._id
                    )
                  }
                  className="w-6 h-6 rounded-[5px] bg-transparent hover:bg-[#e6e6e6] p-0.5 cursor-pointer flex"
                >
                  <EllipsisVertical className="w-5 h-5 text-[#5C5F64]" />
                </button>

                {openDropdownId === profile._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
                    <div className="p-2">
                      <DropdownItem
                        onClick={() =>
                          router.push(`/admin/profiles/${profile._id}`)
                        }
                        icon={<Pencil size={16} />}
                        label="Edit"
                      />
                      <DropdownItem
                        className="text-red-500 hover:bg-red-100"
                        onClick={() => {
                          setDeleteProfileId(profile._id);
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

      {deleteProfileId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteProfileId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteProfileId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteProfileId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this profile?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteProfileId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteProfileId)}
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
