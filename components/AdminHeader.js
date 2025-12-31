"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import PageLink from "./PageLink";
import LogoLongB from "@/public/home/logoLongB.svg";
import Profile from "@/public/profile.jpg"; // fallback default image
import {
  BellIcon,
  LogOut,
  User,
  CreditCard,
  Bell,
  BellOff,
} from "lucide-react";
import usePageTransition from "@/hooks/usePageTransition";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const menuRef = useRef(null);

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => setShowLogoutModal(false), 200); // wait for fade-out
  };

  useEffect(() => {
    if (showLogoutModal) {
      // slight delay ensures transition works
      setTimeout(() => setShowModal(true), 10);
    } else {
      setShowModal(false);
    }
  }, [showLogoutModal]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutsideNotifications(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setOpenNotification(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideNotifications);
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutsideNotifications
      );
    };
  }, []);

  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    toast.info("Logging out...");
    await signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully 👋");
  };

  // Session fallback values
  const userImage = session?.user?.image || Profile;
  const userName = session?.user?.name || "Admin";
  const userEmail = session?.user?.email || "admin@email.com";

  return (
    <div className="flex w-full flex-row justify-between px-6 py-3 fixed top-0 left-0 z-10">
      {/* Logo */}
      <div className="px-[5px] flex items-center">
        <PageLink href={"/admin"}>
          <Image
            src={LogoLongB}
            alt="Pixelateit Logo"
            priority={true}
            width={120}
            height={26}
            className="h-6 w-auto"
          />
        </PageLink>
      </div>

      {/* Right side */}
      <div className="flex flex-row gap-4 items-center" ref={dropdownRef}>
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setOpenNotification(!openNotification);
              setOpen(false);
            }}
            className="p-2 rounded-2xl transition-all duration-300 bg-[#eef0f2] group hover:bg-[#E4E9EE] cursor-pointer relative"
          >
            <BellIcon size={24} className="text-[#5C5F64]" />
            <div className="absolute bottom-0 right-0">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-red-500"></span>
              </span>
            </div>
          </button>

          {openNotification && (
            <div
              className="absolute p-1 right-0 mt-3 w-[260px]  rounded-[8px] shadow-lg border border-[#e5e5e5] z-20"
              style={{
                background: "linear-gradient(180deg, #0B99FF 5%, #ffffff 60%)",
              }}
            >
              <div
                className="w-4 h-4 bg-[#0B99FF] rounded-tr-[4px] top-[-8px] right-[12px] -rotate-45 absolute border border-[#e5e5e5]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 100% 100%)",
                }}
              />
              {/* User info */}
              <div className="flex items-center gap-3 p-2 pb-2  w-full">
                <p className="text-lg font-medium font-archivo text-white">
                  Notifications
                </p>
              </div>

              {/* Menu items */}
              <div className="p-2 w-full h-[200px] flex items-center justify-center bg-white rounded-t-[8px] rounded-b-[4px] shadow-[0_2px_4px_-1px_rgba(0,0,0,0.25)]">
                <div className="w-fit flex flex-row gap-1 items-center">
                  <BellOff className="w-5 h-5 text-[#b0b0b0]" />
                  <span className="font-archivo text-[#b0b0b0] font-normal text-sm">
                    No new notifications
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => {
              setOpen(!open);
              setOpenNotification(false);
            }}
            className="rounded-full cursor-pointer outline-2 outline-[#ced0d2]"
          >
            <Image
              src={userImage}
              alt="profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover "
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-[#e5e5e5] z-20">
              <div
                className="w-4 h-4 bg-white rounded-tr-[4px] top-[-8px] right-[12px] -rotate-45 absolute border border-[#e5e5e5]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 100% 100%)",
                }}
              />
              {/* User info */}
              <div className="flex items-center gap-3 p-2 border-b border-[#e5e5e5] w-full">
                <Image
                  src={userImage}
                  alt="profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg object-cover flex"
                />
                <div className="flex flex-col">
                  <p className="text-sm font-medium font-archivo text-[#242222] truncate w-[145px]">
                    {userName}
                  </p>
                  <p className="text-xs font-archivo text-[#242222]/60 truncate w-[145px]">
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-2">
                <DropdownItem
                  icon={<User size={16} />}
                  href={"/admin/my-profile"}
                  setOpen={setOpen}
                  label="Account"
                />
                <DropdownItem
                  icon={<CreditCard size={16} />}
                  href={"/admin/members"}
                  setOpen={setOpen}
                  label="Members"
                />
                <DropdownItem icon={<Bell size={16} />} label="Notifications" />
              </div>

              {/* Logout */}
              <div className="border-t border-[#e5e5e5] p-2">
                <LogoutButton
                  icon={<LogOut size={16} />}
                  label="Log out"
                  onClick={() => {
                    setOpen(false);
                    setShowLogoutModal(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
            showModal ? "bg-black/20 opacity-100" : "bg-black/0 opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-[360px] transform border border-[#e5e5e5] transition-all duration-200 ${
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
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm font-archivo font-medium bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
              >
                Yes, Logout!
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
  href = "/admin",
  setOpen,
  classNames = "text-[#757575] hover:bg-[#f0f0f0]",
}) {
  return (
    <PageLink2
      href={href}
      setOpen={setOpen}
      className={
        " flex items-center gap-2 w-full px-3 py-2 text-sm font-archivo font-medium rounded-md transition duration-300 cursor-pointer " +
        classNames
      }
    >
      {icon}
      {label}
    </PageLink2>
  );
}

function PageLink2({ href, children, className = "", delay = 300, setOpen }) {
  const navigate = usePageTransition();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    e.preventDefault();
    setTimeout(() => {
      navigate(href);
      if (setOpen) setOpen(false); // ✅ safely close dropdown
    }, delay);
  };

  return (
    <Link
      href={href}
      className={"cursor-pointer " + className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

function LogoutButton({
  icon,
  label,
  onClick,
  classNames = "text-[#757575] hover:text-[#fff] hover:bg-[#242222]",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center gap-2 w-full px-3 py-2 text-sm font-archivo font-medium rounded-md transition duration-300 cursor-pointer " +
        classNames
      }
    >
      {icon}
      {label}
    </button>
  );
}
