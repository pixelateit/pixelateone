"use client";

import gsap from "gsap";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";
import AddDefault from "@/public/addDefault-1.png";
// import Link from "next/link";
import PageLink from "./PageLink";

export default function AddButtonAdmin({ image, label, href }) {
  const btnRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    // Timeline with forward + reverse bounce effect
    tlRef.current = gsap.timeline({ paused: true }).fromTo(
      btnRef.current,
      { background: "linear-gradient(180deg, #FEFEFE 0%, #F4F4F4 95%)" },
      {
        background: "linear-gradient(180deg, #f9f9f9 0%, #F4F4F4 95%)",
        duration: 0.5,
        ease: "power4.out",
      }
    );
  }, []);

  const handleMouseEnter = () => tlRef.current?.play();
  const handleMouseLeave = () => tlRef.current?.reverse();

  return (
    <PageLink
      href={href}
      ref={btnRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="md:max-w-80 min-w-[320px] w-full p-9 overflow-hidden rounded-lg outline-[#DBDBDB] group cursor-pointer outline-1 hover:outline-[#0085FF] hover:outline-2 transition duration-300"
      style={{
        background: "linear-gradient(180deg, #FEFEFE 0%, #F4F4F4 95%)",
      }}
    >
      <div className="flex w-fit gap-1 justify-center items-center mx-auto">
        <Plus className="w-6 h-6 text-[#242222]/80" />
        <span className="font-archivo font-semibold text-base text-[#242222]/80">
          {label}
        </span>
      </div>
      <div className="w-full h-[88px] mt-4 relative">
        <Image
          src={image || AddDefault}
          width={280}
          alt="add default"
          className="absolute top-0 right-[-36px] min-w-[274px] bg-cover bg-top-left shadow-md group-hover:shadow-none transition-all duration-300"
        />
      </div>
    </PageLink>
  );
}
