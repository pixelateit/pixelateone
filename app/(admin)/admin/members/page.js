// app/(admin)/admin/members/page.js
"use client";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageLink from "@/components/PageLink";
import { toast } from "react-toastify";

export default function MembersPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users");
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }
        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : data);
        setLoading(false);
      } catch (err) {
        console.error("fetchUsers failed:", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [pathname]);

  // delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prev) => prev.filter((m) => m._id !== id));
      setDeleteUserId(null);
      toast.success("User deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete user");
    }
  };

  function formattedDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1080px] py-12">
        <div className="w-full flex flex-row">
          <div className="w-full flex flex-row gap-2 flex-1 items-center">
            <PageLink className=" h-fit ">
              <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all cursor-pointer duration-300 hover:text-[#A4A4A4]" />
            </PageLink>
            <span
              className="font-archivo font-semibold text-2xl text-[#242222]"
              style={{ letterSpacing: "-0.02em" }}
            >
              All Members
            </span>
          </div>

          <PageLink
            href={"/admin/members/add-member"}
            className=" cursor-pointer px-3 py-2 rounded-lg bg-[#242222] flex flex-row gap-2 outline-4 items-center outline-white/0 hover:outline-[#242222]/20 duration-100 "
          >
            <div className="flex flex-row gap-1">
              <Plus className="h-6 w-6 text-white" />
              <span className="font-archivo font-medium text-white text-base">
                Member
              </span>
            </div>
          </PageLink>
        </div>

        <div className="w-full h-[1px] bg-[#DBDBDB] my-8" />

        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            Members List
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Email
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Sign-In Method
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Date Added
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
            <div className="w-[200px] hidden md:block rounded-md animate-pulse h-6 bg-[#E5E5E5]" />
            <div className="w-8 rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
          </div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div
              key={user._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
            >
              <div
                className="w-8 h-8 rounded-[5px] bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${user.profilePicture})`,
                }}
              />
              <p className="font-archivo font-medium text-base text-[#242222] flex-1">
                {user?.name}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {user?.email}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {user?.isGoogleAccount ? "Google" : "Email"}
              </p>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {formattedDate(user?.createdAt)}
              </p>

              {!user.isGoogleAccount &&
              user?.email != "prakhars@protonmail.com" ? (
                <button
                  type="button"
                  onClick={() => setDeleteUserId(user._id)}
                  className="w-8 h-8 rounded-[5px] bg-[#e6e6e6] hover:bg-[#e2e2e2] p-0.5 cursor-pointer flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5 text-[#5C5F64]" />
                </button>
              ) : (
                <div className="w-6 h-2 flex" />
              )}
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

      {deleteUserId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteUserId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteUserId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteUserId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this member?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteUserId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteUserId)}
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
