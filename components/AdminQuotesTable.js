"use client";
import { useEffect, useRef, useState } from "react";
import {
  FileText,
  EllipsisVertical,
  Pencil,
  Trash2,
  Eye,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import PageLink from "@/components/PageLink";

export default function AdminQuotesTable() {
  const quoteRef = useRef(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [deleteQuoteId, setDeleteQuoteId] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/quotes");
        console.log(res);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();

        // ✅ Ensure you set `data.quotes` if API responds { quotes: [...] }
        setQuotes(Array.isArray(data.quotes) ? data.quotes : data);
        setLoading(false);
      } catch (err) {
        console.error("fetchQuotes failed:", err);
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [pathname]);

  //   console.log(quotes);

  // delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete quote");
      setQuotes((prev) => prev.filter((w) => w._id !== id));
      setDeleteQuoteId(null);
      toast.success("Work deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete quote. Please try again.");
    }
  };

  useEffect(() => {
    function handleClickOutside(id) {
      if (quoteRef.current && !quoteRef.current.contains(id.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full pt-8 pb-12">
        <div className="w-full h-[1px] bg-[#DBDBDB] mb-8" />

        <div className="w-full flex flex-row justify-between items-center mb-6">
          <div className="w-fit flex flex-row gap-2 items-center">
            <span
              className="font-archivo font-semibold text-xl text-[#242222]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Quotes
            </span>
            <p className="font-oswald font-medium text-[#242222] text-base w-fit">
              ({quotes.length})
            </p>
          </div>

          <PageLink
            href={"/admin/quotes/add-quote"}
            className=" cursor-pointer px-3 py-2 rounded-lg bg-[#242222] flex flex-row gap-2 outline-4 items-center outline-white/0 hover:outline-[#242222]/20 duration-100 "
          >
            <div className="flex flex-row items-center gap-1">
              <Plus className="h-6 w-6 text-white" />
              <span className="font-archivo font-medium text-white text-base">
                Quote
              </span>
            </div>
          </PageLink>
        </div>

        {/*Header*/}
        <div className="w-full flex flex-row items-center gap-2.5 px-4 mb-4">
          <p
            className="font-archivo font-semibold text-lg text-[#242222] flex-1"
            style={{ letterSpacing: "-0.03em" }}
          >
            All quotes
          </p>
          <p className="w-[200px] hidden md:block font-archivo font-medium text-sm text-center text-[#242222]/40">
            Quotee
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
            <div className="w-8 rounded-md animate-pulse h-8 bg-[#E5E5E5]" />
          </div>
        ) : quotes.length > 0 ? (
          quotes.map((quote) => (
            <div
              key={quote._id}
              className="p-4 flex flex-row items-center gap-2.5 border-b border-[#dbdbdb] bg-white hover:bg-[#EEF2FA] transition-all duration-300"
              ref={quote._id === openDropdownId ? quoteRef : null}
            >
              <div
                className={`p-2 rounded-[5px] ${
                  quote?.active ? "bg-[#0085FF]" : "bg-[#C3C5C7]"
                }`}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>
              <PageLink
                href={`/admin/quotes/${quote._id}`}
                className="font-archivo font-medium text-base text-[#242222] flex-1"
              >
                <span className="w-[180px] md:w-[500px] truncate block">
                  {quote?.quote}
                </span>
              </PageLink>
              <p className="font-archivo hidden md:block font-normal text-sm text-center text-[#242222]/80 w-[200px]">
                {quote?.quotee}
              </p>

              <div className="relative w-fit h-fit">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdownId(
                      openDropdownId === quote._id ? null : quote._id
                    )
                  }
                  className="w-6 h-6 rounded-[5px] bg-transparent hover:bg-[#e6e6e6] p-0.5 cursor-pointer flex"
                >
                  <EllipsisVertical className="w-5 h-5 text-[#5C5F64]" />
                </button>

                {openDropdownId === quote._id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
                    <div className="p-2">
                      <DropdownItem
                        onClick={() =>
                          router.push(`/admin/quotes/${quote._id}`)
                        }
                        icon={<Pencil size={16} />}
                        label="Edit"
                      />
                      <DropdownItem
                        className="text-red-500 hover:bg-red-100"
                        onClick={() => {
                          setDeleteQuoteId(quote._id);
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

      {deleteQuoteId && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            deleteQuoteId ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={() => setDeleteQuoteId(null)}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
              deleteQuoteId ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to delete this quote?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteQuoteId(null)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteQuoteId)}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Delete!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
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
