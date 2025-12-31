"use client";

import { useEffect, useRef, useState } from "react";
import PageTorn from "@/public/home/pageTorn2.webp";
import gsap from "gsap";
import CustomCursor from "@/components/CustomCursor";
import ProfileCard from "@/components/ProfileCard";
import ModalSlider from "@/components/ModalSlider";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createPortal } from "react-dom";
import Link from "next/link";
gsap.registerPlugin(ScrollSmoother);

export default function Profiles() {
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hoveringCard, setHoveringCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState("All");
  const [totalCount, setTotalCount] = useState(0);
  const limit = 10;
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFetchingRef = useRef(false);

  const filters = ["All", "Figma", "Photoshop"];

  // 🔹 Fetch profiles with pagination
  const fetchProfiles = async (reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      if (reset) setFirstLoad(true);
      else setLoadingMore(true);
      const query = new URLSearchParams({
        limit,
        skip: reset ? 0 : skip,
        isActive: true,
        ...(selected !== "All" && { software: selected }),
      }).toString();

      const res = await fetch(`/api/profiles?${query}`);
      const data = await res.json();

      if (res.ok) {
        setTotalCount(data.totalCount);
        setProfiles((prev) =>
          reset ? data.profiles : [...prev, ...data.profiles]
        );
        setHasMore(data.profiles.length === limit);
        setSkip((prev) =>
          reset ? data.profiles.length : prev + data.profiles.length
        );
      }
    } catch (err) {
      console.error("fetchProfiles failed:", err);
    } finally {
      isFetchingRef.current = false;
      setFirstLoad(false);
      setLoadingMore(false);
    }
  };

  // 🔹 Initial load or when filter changes
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchProfiles(true);
  }, [selected]);

  useEffect(() => {
    if (isModalOpen) {
      ScrollSmoother.get().paused(true);
    } else {
      ScrollSmoother.get().paused(false);
    }
  }, [isModalOpen]);

  const CardHoverEnter = (target) => {
    const cardOverlay = target.querySelector(".hover-card");
    const cardDesc = target.querySelector(".hover-desc");
    const cardImg = target.querySelector(".hover-image");

    if (cardOverlay && cardDesc && cardImg) {
      gsap.killTweensOf([cardOverlay, cardDesc, cardImg]);
    }

    setHoveringCard(true);

    gsap.to(cardOverlay, {
      backdropFilter: "blur(20px)",
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(cardImg, {
      scale: 1.1,
      duration: 0.4,
      ease: "power4.inOut",
    });
    gsap.fromTo(
      cardDesc,
      { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 30, opacity: 0 },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 120%, 0 120%)",
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );
  };

  const CardHoverExit = (target) => {
    const cardOverlay = target.querySelector(".hover-card");
    const cardDesc = target.querySelector(".hover-desc");
    const cardImg = target.querySelector(".hover-image");

    if (cardOverlay && cardDesc && cardImg) {
      gsap.killTweensOf([cardOverlay, cardDesc, cardImg]);
    }

    setHoveringCard(false);

    gsap.to(cardDesc, {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      y: 30,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });
    gsap.to(cardImg, {
      scale: 1,
      duration: 0.4,
      ease: "power4.inOut",
    });
    gsap.to(cardOverlay, {
      backdropFilter: "blur(0px)",
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // console.log(profiles);

  return (
    <main
      className="w-full min-h-screen bg-black pt-20 relative"
      style={{ zIndex: 5 }}
    >
      <div className="w-full px-6 pt-[56px] pb-[80px] flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex w-fit">
          <h1
            className="font-bold flex flex-row"
            style={{ fontSize: "clamp(36px, 4.16vw, 80px)" }}
          >
            <span
              className="text-[#ffffff] font-bold font-archivo-narrow"
              style={{
                letterSpacing: "-0.05em",
                lineHeight: "clamp(36px, 4.16vw, 80px)",
              }}
            >
              Company
            </span>
            <span
              className="text-[#ffffff] font-kings font-normal text-[84px]"
              style={{
                fontSize: "clamp(40px, 4.375vw, 84px)",
                lineHeight: "clamp(50px, 5.2vw, 100px)",
              }}
            >
              Profiles
            </span>
          </h1>
          <div style={{ marginTop: "clamp(0px, 0.2vw, 10px)" }}>
            <span
              className="font-oswald font-medium uppercase text-[#FF3F2B]"
              style={{ fontSize: "clamp(10px, 0.83vw, 16px)" }}
            >
              ({totalCount})
            </span>
          </div>
        </div>

        <p className="text-lg font-semibold font-archivo-narrow text-[#787878] transition-all duration-300">
          {filters.map((item, i) => (
            <span key={item}>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(item);
                }}
                className={`${
                  selected === item ? "text-[#ffffff]" : "hover:text-[#ffffff]"
                }`}
              >
                {item}
              </Link>
              {i < filters.length - 1 && " / "}
            </span>
          ))}
        </p>
      </div>
      <CustomCursor state={hoveringCard ? "hover" : "idle"} text="View" />

      {/* Main content area for profiles or pitch decks */}
      {firstLoad ? (
        <div className="w-full px-6 pb-20 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row gap-1">
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[500px]" />
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[500px]" />
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[500px]" />
        </div>
      ) : (
        <ProfileCard
          cardData={profiles}
          loadingMore={loadingMore}
          onMouseEnter={(e) => CardHoverEnter(e.currentTarget)}
          onMouseLeave={(e) => CardHoverExit(e.currentTarget)}
          onClick={(card) => handleCardClick(card)}
        />
      )}
      {selectedCard &&
        createPortal(
          <ModalSlider
            isOpen={isModalOpen}
            card={selectedCard}
            onClose={() => setIsModalOpen(false)}
          />,
          document.body
        )}

      {hasMore && !firstLoad && (
        <div className="w-full flex justify-center pb-16">
          <button
            onClick={() => fetchProfiles(false)}
            disabled={loadingMore}
            className="px-6 py-3 bg-white text-[#242222] font-semibold cursor-pointer font-archivo rounded-lg transition disabled:opacity-50 outline-4 outline-transparent hover:outline-[#242222]/50"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
      {profiles.length === 0 && !firstLoad && (
        <div className="w-full flex flex-col justify-center items-center px-5">
          <span className="font-archivo font-medium text-white text-base text-center">
            No profiles found.
          </span>
        </div>
      )}

      <div
        className="w-full h-[50px] absolute bottom-0 left-0 z-10"
        style={{
          backgroundImage: `url(${PageTorn.src})`,
          backgroundRepeat: "repeat-x",
          transform: "translateY(30px)",
        }}
      />
    </main>
  );
}
