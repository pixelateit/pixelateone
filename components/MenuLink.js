"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsapConfig";
import SlashImg from "@/public/redSlash.png";
import usePageTransition from "@/hooks/usePageTransition";

export default function MenuLink({
  label = "Home",
  href = process.env.NEXT_PUBLIC_WEBSITE_URL || "/",
  onHover,
  onLeave,
  menuClose,
}) {
  const slashRef = useRef(null);
  const containerRef = useRef(null);
  const hoverTimeline = useRef(null);
  const triggerTransition = usePageTransition();

  const handleEnter = () => {
    if (onHover) onHover();
    if (hoverTimeline.current) hoverTimeline.current.kill();

    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      background:
        "linear-gradient(90deg, rgba(0,0,0,1) 40%, #280500 60%, #FF1800 96%)",
      duration: 0.4,
      ease: "power4.out",
    });
    tl.to(
      slashRef.current,
      {
        clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
        autoAlpha: 1,
        duration: 0.2,
        ease: "power4.out",
        display: "block",
      },
      "-=0.2"
    );

    hoverTimeline.current = tl;
  };

  const handleLeave = () => {
    if (onLeave) onLeave();
    if (hoverTimeline.current) hoverTimeline.current.kill();

    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      background:
        "linear-gradient(90deg, #000000 40%, #000000 60%, #000000 96%)",
      duration: 0.4,
      ease: "power4.out",
    });
    tl.to(
      slashRef.current,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        autoAlpha: 0,
        duration: 0.2,
        ease: "power4.out",
        onComplete: () => {
          slashRef.current.style.display = "none";
        },
      },
      "-=0.2"
    );

    hoverTimeline.current = tl;
  };

  const handleClick = (e) => {
    e.preventDefault();
    menuClose?.(); // Close menu first
    setTimeout(() => {
      triggerTransition(href);
    }, 300); // Delay for menu close animation
  };

  return (
    <div
      ref={containerRef}
      className="group w-full flex flex-row py-1 border-b border-[#1c1c1c] cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      <div className="w-full flex">
        <div className="w-fit relative">
          <span
            className="font-oswald font-semibold uppercase text-transparent  bg-clip-text bg-gradient-to-r group-hover:from-[#151515] group-hover:to-[#303030] from-white to-gray-400"
            style={{
              fontSize: "clamp(40px, 4.16vw, 80px)",
              letterSpacing: "-0.05em",
              lineHeight: "1",
              display: "inline-block",
            }}
          >
            {label}
          </span>
          <div
            ref={slashRef}
            className="w-full h-5 absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-0"
            style={{
              backgroundImage: `url(${SlashImg.src})`,
              backgroundSize: "100% 100%",
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
