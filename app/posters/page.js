"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import collectionImage from "@/public/Collection.svg";
import PageTorn from "@/public/home/pageTorn2.webp";
import gsap from "gsap";
import { createPortal } from "react-dom";
import ModalSlider2 from "@/components/ModalSlider2";
import { LoaderCircle } from "lucide-react";

export default function PostersPage() {
  const posterCard = useRef(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("All");
  const [posters, setPosters] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 8;
  const [totalCount, setTotalCount] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFetchingRef = useRef(false);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Figma", "Photoshop"];

  const fetchPosters = async (reset = false) => {
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

      const res = await fetch(`/api/posters?${query}`);

      const data = await res.json();

      if (res.ok) {
        setTotalCount(data.totalCount);
        setPosters((prev) =>
          reset ? data.posters : [...prev, ...data.posters]
        );
        setHasMore(data.posters.length === limit);
        setSkip((prev) =>
          reset ? data.posters.length : prev + data.posters.length
        );
      }
    } catch (err) {
      console.error("fetchPosters failed:", err);
    } finally {
      isFetchingRef.current = false;
      setFirstLoad(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchPosters(true);
  }, [selected]);

  const CardHoverEnter = (target) => {
    gsap.fromTo(
      target,
      {
        background:
          "radial-gradient(113.73% 100% at 50% 100%, #0F0F0F 36.04%, #111111 67.52%, #151515 100%)",
      },
      {
        background:
          "radial-gradient(113.73% 100% at 50% 100%, #FF3F2B 36.04%, #E00E15 67.52%, #750000 100%)",
        duration: 0.4,
        ease: "power4.inOut",
      }
    );
  };

  const CardHoverExit = (target) => {
    gsap.to(target, {
      background:
        "radial-gradient(113.73% 100% at 50% 100%, #0F0F0F 36.04%, #111111 67.52%, #151515 100%)",
      duration: 0.4,
      ease: "power4.inOut",
    });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  return (
    <main className="w-full min-h-screen bg-black relative">
      <section className="w-full px-6 pt-[136px] pb-[80px]">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between w-full">
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
                My
              </span>
              <span
                className="text-[#ffffff] font-kings font-normal text-[84px]"
                style={{
                  fontSize: "clamp(40px, 4.375vw, 84px)",
                  lineHeight: "clamp(50px, 5.2vw, 100px)",
                }}
              >
                Posters
              </span>
              <Image
                src={collectionImage}
                alt="collection"
                height={54}
                width="auto"
                className="w-auto aspect-auto"
                style={{
                  height: "clamp(24px, 2.81vw, 54px)",
                  marginTop: "clamp(8px, 0.83vw, 16px)",
                }}
              />
            </h1>
            <div style={{ marginTop: "clamp(0px, 0.2vw, 10px)" }}>
              <span
                className="font-oswald font-medium text-white"
                style={{ fontSize: "clamp(10px, 0.83vw, 16px)" }}
              >
                ({totalCount})
              </span>
            </div>
          </div>

          <p className="text-lg font-semibold font-archivo-narrow text-[#787878] transition-all duration-300">
            {filters.map((item, index) => (
              <span key={item}>
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelected(item);
                  }}
                  className={`${
                    selected === item
                      ? "text-[#ffffff]"
                      : "hover:text-[#ffffff]"
                  }`}
                >
                  {item}
                </Link>
                {index < filters.length - 1 && " / "}
              </span>
            ))}
          </p>
        </div>
      </section>
      {firstLoad ? (
        <div className="w-full px-6 pb-20 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-1">
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[640px]" />
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[640px]" />
          <div className="flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[640px]" />
          <div className="hidden xl:flex w-full animate-pulse cursor-none bg-[#121212] rounded-[5px] h-[640px]" />
        </div>
      ) : (
        <section className="w-full px-6 pb-20 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-0.5">
          {posters.map((card) => (
            <div key={card._id} className="flex w-full group">
              <div
                className="flex flex-col items-center justify-between bg-[radial-gradient(113.73%_100%_at_50%_100%,_#0F0F0F_36.04%,_#111111_67.52%,_#151515_100%)] w-full h-[640px] transition-all duration-300 rounded-[5px] cursor-pointer"
                ref={posterCard}
                onMouseEnter={(e) => CardHoverEnter(e.currentTarget)}
                onMouseLeave={(e) => CardHoverExit(e.currentTarget)}
                onClick={() => handleCardClick(card)}
              >
                <div
                  className="p-4 w-full font-oswald font-medium text-base uppercase text-[#ffffff] transition-all duration-300"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {card.posterName}
                </div>
                <div className="w-fit relative">
                  <Image
                    src={card.posterImage}
                    width={300}
                    height={425}
                    unoptimized
                    onLoad={() => setLoading(false)}
                    onError={() => setLoading(false)}
                    alt={card.posterName}
                    className={`w-[220px] aspect-auto group-hover:w-[300px] transition-all duration-300 group-hover:shadow-[0px_72px_56px_-40px_rgba(0,0,0,0.6)]  ${
                      loading ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {loading && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-fit flex flex-row gap-2 items-center">
                      <LoaderCircle className="w-5 h-5 text-[#fff]/40 animate-spin" />{" "}
                      <span className="font-archivo font-semibold text-base text-[#fff]/60">
                        Loading...
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-full flex justify-between items-center p-4">
                  <span
                    className="font-oswald font-normal text-base uppercase text-[#ffffff] transition-all duration-300"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    RP-{card.id}
                  </span>
                  <span className="font-kings font-normal text-base text-[#ffffff] transition-all duration-300">
                    Made in{" "}
                    <span
                      className="font-oswald font-medium text-sm uppercase"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {card.software}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {selectedCard &&
        createPortal(
          <ModalSlider2
            isOpen={isModalOpen}
            card={selectedCard}
            onClose={() => setIsModalOpen(false)}
          />,
          document.body
        )}

      {hasMore && !firstLoad && (
        <div className="w-full flex justify-center pb-16">
          <button
            onClick={() => fetchPosters(false)}
            disabled={loadingMore}
            className="px-6 py-3 bg-white text-[#242222] font-semibold cursor-pointer font-archivo rounded-lg disabled:opacity-50 outline-4 outline-transparent hover:bg-white/90 hover:outline-[#fff]/50 transition-all duration-300"
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {posters.length === 0 && !firstLoad && (
        <div className="w-full flex flex-col justify-center items-center px-5">
          <span className="font-archivo font-medium text-white text-base text-center">
            No posters found.
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
