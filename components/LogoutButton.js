"use client";

import { trackClick } from "@/utils/analytics";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const handleLogout = async () => {
    toast.info("Logging out...");
    await signOut({ callbackUrl: "/login" });
    toast.success("Logged out successfully 👋");
  };
  return (
    <button
      onClick={() => {
        handleLogout();
        trackClick("admin_logout_button");
      }}
      className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </button>
  );
}
