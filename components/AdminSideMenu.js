"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import {
  BriefcaseBusiness,
  Building2,
  FileImage,
  GalleryVertical,
  LayoutDashboard,
  LogOut,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import EdgR from "@/public/edgR.svg";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageLink from "./PageLink";

export default function AdminSideMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutModal, setLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false); // for animation

  const handleLogout = async () => {
    toast.info("Logging out...");
    await signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully 👋");
  };

  // Escape key closes modal
  useEffect(() => {
    if (!logoutModal) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [logoutModal]);

  // Animation mount/unmount handling
  useEffect(() => {
    if (logoutModal) {
      setTimeout(() => setShowModal(true), 20); // trigger fade-in
    } else {
      setShowModal(false);
    }
  }, [logoutModal]);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setLogoutModal(false), 200); // wait for fade-out
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      key: "work",
      label: "Work",
      icon: BriefcaseBusiness,
      href: "/admin/work",
    },
    {
      key: "profiles",
      label: "Profiles",
      icon: Building2,
      href: "/admin/profiles",
    },
    {
      key: "posters",
      label: "Posters",
      icon: FileImage,
      href: "/admin/posters",
    },
    {
      key: "miscs",
      label: "Miscellaneous",
      icon: GalleryVertical,
      href: "/admin/miscs",
    },
    { key: "blogs", label: "Blogs", icon: WalletCards, href: "/admin/blogs" },
  ];

  // ✅ check if current pathname matches exactly one of the menu hrefs
  const isAdminRoute = menuItems.some((item) => pathname === item.href);

  if (!isAdminRoute) {
    return null; // hide sidebar completely
  }

  return (
    <>
      {/* Sidebar */}
      <div className="w-[60px] hidden md:flex flex-col fixed top-0 left-0 h-screen">
        <div className="w-full h-full flex items-center pt-[60px]">
          <div className="w-full flex flex-col">
            <Image src={EdgR} alt="edgUp" className="w-full aspect-auto" />

            {/* Menu */}
            <div className="px-2 flex flex-col gap-[5px] bg-[#F4F4F4] py-3">
              {menuItems.map(({ key, label, icon: Icon, href }) => {
                const isActive = pathname === href;
                return (
                  <div key={key} className="relative group flex justify-center">
                    <PageLink
                      // onClick={() => router.push(href)}
                      href={href}
                      className={` p-3 rounded-2xl ${
                        isActive
                          ? "bg-[#FF3F2B] hover:bg-[#d92410]"
                          : "bg-[#EBEBEB] hover:bg-[#D4D4D4]"
                      } cursor-pointer transition-all duration-300`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? "text-white" : "text-[#5C5F64]"}
                      />
                    </PageLink>
                    {/* Tooltip */}
                    <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#282828] font-archivo font-medium text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <Image
              src={EdgR}
              alt="edgUp"
              className="w-full aspect-auto rotate-x-180"
            />
          </div>
        </div>

        {/* Logout button */}
        <div className="w-full p-2 relative group flex justify-center">
          <button
            onClick={() => setLogoutModal(true)}
            className="p-3 rounded-full bg-[#282828] cursor-pointer hover:bg-[#3e3e3e] transition-all duration-300"
          >
            <LogOut size={20} className="text-white" />
          </button>
          {/* Tooltip */}
          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#282828] font-archivo font-medium text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Logout
          </span>
        </div>
      </div>

      <div className="w-full flex md:hidden flex-col fixed bottom-0 left-0 h-[60px]">
        <div className="w-full h-full flex items-center">
          <div className="w-full flex flex-row">
            {/* Menu */}
            <div className="p-2 flex flex-row gap-[5px] bg-[#F4F4F4] w-full justify-center">
              {menuItems.map(({ key, label, icon: Icon, href }) => {
                const isActive = pathname === href;
                return (
                  <div key={key} className="relative group flex justify-center">
                    <PageLink
                      // onClick={() => router.push(href)}
                      href={href}
                      className={` p-3 rounded-2xl ${
                        isActive
                          ? "bg-[#FF3F2B] hover:bg-[#d92410]"
                          : "bg-[#EBEBEB] hover:bg-[#D4D4D4]"
                      } cursor-pointer transition-all duration-300`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? "text-white" : "text-[#5C5F64]"}
                      />
                    </PageLink>
                    {/* Tooltip */}
                    <span className="absolute left-1/2 mt-2 -top-full -translate-x-1/2 whitespace-nowrap bg-[#282828] font-archivo font-medium text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            showModal ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] border border-[#e5e5e5] transform transition-all duration-200 ${
              showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-1 font-archivo w-full">
              Are you absolutely sure?
            </h2>
            <p className="mb-6 text-[#737373] text-base font-archivo font-normal w-full">
              Do you really want to logout?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-white border border-gray-300 hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeModal();
                  handleLogout();
                }}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
