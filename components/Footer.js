"use client";

import Image from "next/image";
import PixelFoot from "@/public/home/Footer-IMG.webp";
import PixelFoot2 from "@/public/home/Footer-IMG2M.webp";
import PaperTexture from "@/public/home/PaperTexture.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingw, setLoadingw] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setLoadingw(true);
        const res = await fetch("/api/work?fields=_id,title");

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();

        // ✅ Ensure you set `data.works` if API responds { works: [...] }
        setWorks(Array.isArray(data.works) ? data.works : data);
        setLoadingw(false);
      } catch (err) {
        console.error("fetchWorks failed:", err);
        setLoadingw(false);
      }
    };

    fetchWorks();
  }, [pathname]);

  return (
    <footer
      className="w-full h-screen bg-[#f2f2f2] relative"
      style={{ zIndex: 1 }}
    >
      <div className="relative  w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center sm:items-start container w-full z-10 mt-8 lg:mt-16">
          <div className="w-full flex max-w-[480px]">
            <div className="w-full flex flex-col gap-3 lg:gap-6">
              <h5
                className="text-[#2D0F09] font-archivo-narrow text-xl font-bold uppercase text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    Q
                  </span>
                  uick
                </span>{" "}
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    L
                  </span>
                  inks
                </span>
              </h5>
              <div className="w-full flex flex-col gap-2 items-center">
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Work
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Posters
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Pitch Deck
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 lg:gap-6">
              <h5
                className="text-[#2D0F09] font-archivo-narrow text-xl font-bold uppercase text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    M
                  </span>
                  edia
                </span>
              </h5>
              <div className="w-full flex flex-col gap-2 items-center">
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Instagram
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  Behance
                </Link>
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                >
                  LinkedIn
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 order-first sm:order-none">
            <h5
              className="text-[#AAAAAA] font-archivo-narrow text-2xl font-bold uppercase text-center"
              style={{ letterSpacing: "-0.02em" }}
            >
              <span>
                <span
                  className="font-kings font-normal text-[28px]"
                  style={{
                    letterSpacing: "0em",
                    lineHeight: "28px",
                  }}
                >
                  P
                </span>
                ixelate.
              </span>
              <span>
                <span
                  className="font-kings font-normal"
                  style={{
                    letterSpacing: "0em",
                    lineHeight: "28px",
                  }}
                >
                  O
                </span>
                ne
              </span>
            </h5>
          </div>

          <div className="w-full flex max-w-[480px]">
            <div className="w-full flex flex-col gap-3 lg:gap-6">
              <h5
                className="text-[#2D0F09] font-archivo-narrow text-xl font-bold uppercase text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    A
                  </span>
                  rticles
                </span>
              </h5>
              <div className="w-full flex flex-col gap-2 items-center">
                <Link
                  href="#"
                  className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center truncate flex"
                >
                  Miscellaneous
                </Link>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 lg:gap-6">
              <h5
                className="text-[#2D0F09] font-archivo-narrow text-xl font-bold uppercase text-center"
                style={{ letterSpacing: "-0.02em" }}
              >
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    W
                  </span>
                  eb
                </span>{" "}
                <span>
                  <span
                    className="font-kings font-normal text-[22px]"
                    style={{
                      letterSpacing: "0em",
                      lineHeight: "28px",
                    }}
                  >
                    D
                  </span>
                  esigns
                </span>
              </h5>
              <div className="w-full flex flex-col gap-2 items-center">
                {works?.length ? (
                  works.slice(0, 5).map((work) => (
                    <Link
                      key={work._id}
                      href={work._id ? `/works/${work._id}` : "#"}
                      className="text-[#6F6867] font-archivo-narrow text-base font-medium cursor-pointer hover:text-[#6f6867]/50 transition-all duration-300 w-fit uppercase hover:underline text-center"
                    >
                      {work.title}
                    </Link>
                  ))
                ) : loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>No articles found.</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full relative h-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-12 absolute bottom-[80px] lg:bottom-[120px]">
            <div
              className="flex flex-col items-center gap-3"
              style={{ zIndex: 2 }}
            >
              <h5
                className="text-white font-archivo-narrow text-base font-normal uppercase text-center flex flex-col items-center"
                style={{ letterSpacing: "-0.02em", lineHeight: "12px" }}
              >
                <span>
                  <span
                    className="font-kings font-normal text-[18px]"
                    style={{
                      letterSpacing: "0em",
                    }}
                  >
                    P
                  </span>
                  rakhar
                </span>
                <span>
                  <span
                    className="font-kings font-normal text-[18px]"
                    style={{
                      letterSpacing: "0em",
                    }}
                  >
                    S
                  </span>
                  rivastava
                </span>
              </h5>
              <span
                className="font-oswald text-base text-white"
                style={{ zIndex: 2 }}
              >
                ©2026
              </span>
            </div>

            <h3
              className="text-white font-kings text-[40px] leading-[36px] font-normal text-center  flex flex-col items-center"
              style={{ zIndex: 2 }}
            >
              <span>—If you do it right,</span>
              <span>it will last forever—</span>
            </h3>
          </div>
          <Image
            src={PixelFoot}
            alt="Pixelateit"
            width={1920}
            height={"auto"}
            className="w-full hidden xl:block aspect-auto absolute bottom-[-100px]  pointer-events-none"
            style={{ zIndex: 1 }}
          />

          <Image
            src={PixelFoot2}
            priority
            alt="PixelFoot2"
            width={800}
            height={"auto"}
            className="w-full block xl:hidden aspect-auto absolute bottom-0 sm:bottom-[-240px] md:bottom-[-340px]  pointer-events-none"
            style={{ zIndex: 1 }}
          />
        </div>

        <Image
          src={PaperTexture}
          alt="overlay"
          width="100%"
          height="100%"
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-cover object-cover pointer-events-none"
          style={{ mixBlendMode: "overlay", opacity: 0.5, zIndex: 0 }}
        />
      </div>
    </footer>
  );
}
