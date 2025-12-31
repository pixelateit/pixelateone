"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Profile from "@/public/profile.jpg"; // fallback default image
import { ArrowLeft, Pencil } from "lucide-react";
import EditProfileModal from "@/components/EditProfileModal";
import { useEffect, useState } from "react";
import PageLink from "@/components/PageLink";

export default function MyProfileAdminPage() {
  const { data: session } = useSession();
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    email: "",
    profilePicture: "",
    isGoogleAccount: false,
  });

  useEffect(() => {
    const userData = session?.user || {};

    const fetchUser = async () => {
      // Fetch user data if needed
      try {
        const res = await fetch(`/api/users/${userData.id}`);
        if (res.ok) {
          const data = await res.json();
          // Update user state if necessary

          if (data.success === false) {
            console.error("Error fetching user data:", data.message);
            return;
          }
          const user = data.user;

          setFormData({
            _id: user._id || "",
            name: user.name || "",
            email: user.email || "",
            profilePicture: user.profilePicture || "",
            isGoogleAccount: user.isGoogleAccount || false,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userData?.id) {
      fetchUser();
    }
  }, [session]);

  return (
    <div className="w-full relative mt-[-64px]">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-[100vw] h-60 px-[5px] pt-[5px]">
          <div className="w-full h-full rounded-[5px] bg-[#F0F0F0]">
            <div className="w-full max-w-[1080px] h-full relative mx-auto">
              {/*Profile Image*/}
              <div className="p-[5px] rounded-full bg-white absolute bottom-[-40px] md:left-0 left-6">
                <Image
                  src={formData?.profilePicture || Profile}
                  width={120}
                  height={120}
                  alt="Profile Image"
                  className="w-[120px] h-[120px] rounded-full bg-cover object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1080px] flex flex-col gap-6 pt-14 mx-auto">
          <div className="w-full flex flex-col gap-4 md:flex-row md:justify-between items-center pe-8">
            <div className="flex flex-row gap-2 w-full">
              <PageLink className=" h-fit py-1 ">
                <ArrowLeft className="w-6 h-6 text-[#5f5f5f] transition-all cursor-pointer duration-300 hover:text-[#A4A4A4]" />
              </PageLink>
              <div className="flex flex-col gap-0.5">
                <span
                  className="font-archivo font-semibold text-2xl text-[#242222]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {formData?.name}
                </span>
                <p className="font-archivo font-normal text-lg text-[#5F5F5F]">
                  {formData?.email}
                </p>
              </div>
            </div>

            {formData?.isGoogleAccount ? (
              ""
            ) : (
              <button
                type="button"
                className="cursor-pointer px-4 py-3 rounded-lg bg-[#242222] flex flex-row gap-2 outline-4 w-fit items-center outline-white/0 hover:outline-[#242222]/20 duration-100"
                onClick={() => setIsEditProfileModalOpen(true)}
              >
                <span className="font-archivo font-medium text-white">
                  Edit
                </span>
                <Pencil className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          <div className="w-full px-8">
            <div className="w-full h-[1px] bg-[#dbdbdb]" />
          </div>
        </div>
      </div>

      {/* Modal Section*/}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        user={formData}
        onClose={() => setIsEditProfileModalOpen(false)}
      />
    </div>
  );
}
