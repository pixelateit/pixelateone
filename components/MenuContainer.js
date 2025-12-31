"use client";

import Image from "next/image";
import LogoLongWoB from "@/public/logoLongWoB.svg";
import PaperTexture from "@/public/home/PaperTexture.webp";
import TvStatic from "@/public/tvstatic.gif";
import { Posters } from "@/public/home/posters/index.js";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import MenuLink from "./MenuLink";
import { gsap } from "@/lib/gsapConfig";
import PageLink from "./PageLink";
import { trackClick } from "@/utils/analytics";

MenuContainer.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  menuClose: PropTypes.func.isRequired,
};

export default function MenuContainer({ menuOpen, menuClose }) {
  const [showMenu, setShowMenu] = useState(false);
  const cont1 = useRef(null);
  const cont2 = useRef(null);
  const router = useRouter();
  const [hoveredPosterIndex, setHoveredPosterIndex] = useState(null);

  useEffect(() => {
    const handleNavigate = (e) => {
      const href = e.detail;

      const el1 = cont1.current;
      const el2 = cont2.current;

      if (el1 && el2) {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.delayedCall(0.05, () => {
              setShowMenu(false);
              menuClose(); // using from prop
              router.push(href); // using from hook
            });
          },
        });

        tl.fromTo(
          [el2, el1],
          { clipPath: "circle(134.6% at 95% 5%)" },
          {
            clipPath: "circle(0% at 98% 4%)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      } else {
        menuClose();
        router.push(href);
      }
    };

    window.addEventListener("menuCloseAndNavigate", handleNavigate);
    return () =>
      window.removeEventListener("menuCloseAndNavigate", handleNavigate);
  }, [menuClose, router]); // ✅ include both

  // Step 1: Watch menuOpen and toggle visibility
  useEffect(() => {
    if (menuOpen) {
      setShowMenu(true); // Step 1: trigger re-render
    } else {
      if (cont1.current && cont2.current) {
        const tl = gsap.timeline();

        tl.fromTo(
          [cont2.current, cont1.current],
          { clipPath: "circle(134.6% at 95% 5%)" },
          {
            clipPath: "circle(0% at 98% 4%)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        ).fromTo(
          [cont2.current, cont1.current],
          { display: "flex" },
          {
            display: "none",
            duration: 0.6,
            onComplete: () => setShowMenu(false),
          }
        );
      } else {
        setShowMenu(false); // Fallback
      }
    }
  }, [menuOpen]);

  // Step 2: When visible, animate in
  useEffect(() => {
    if (showMenu && cont1.current && cont2.current) {
      requestAnimationFrame(() => {
        gsap.fromTo(
          [cont1.current, cont2.current],
          { clipPath: "circle(0% at 98% 4%)" },
          {
            clipPath: "circle(134.6% at 95% 5%)",
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      });
    }
  }, [showMenu]);

  // Step 3: Handle ESC key
  useEffect(() => {
    const el1 = cont1.current;
    const el2 = cont2.current;

    const handleKey = (e) => {
      if (e.key === "Escape" && menuOpen) {
        menuClose();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      // ✅ use the snapshotted refs
      gsap.killTweensOf([el1, el2]);
      window.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen, menuClose]);

  if (!showMenu) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full flex flex-col items-center h-screen transition-all duration-500 bg-[radial-gradient(113.73%_100%_at_50%_100%,_#FF3F2B_36.04%,_#E00E15_67.52%,_#750000_100%)]"
      style={{
        zIndex: 996,
        clipPath: "circle(0% at 98% 4%)",
      }}
      ref={cont1}
    >
      <div
        className="w-full flex flex-col items-center h-screen transition-all duration-500 bg-black"
        style={{ clipPath: "circle(0% at 98% 4%)" }}
        ref={cont2}
      >
        <Image
          src={PaperTexture}
          alt="overlay"
          width="100%"
          height="100%"
          className="w-full h-full absolute top-0 left-0 right-0 bottom-0 bg-cover object-cover pointer-events-none"
          style={{ mixBlendMode: "color-dodge", opacity: 0.1, zIndex: 1 }}
        />
        <div className="w-full p-5 flex flex-row items-center justify-between">
          <PageLink href="/">
            <Image
              src={LogoLongWoB}
              alt="Pixelateit Logo"
              width={"auto"}
              height={30}
              className="px-[5px] h-[30px] aspect-auto"
            />
          </PageLink>

          <button
            type="button"
            className="group"
            onClick={() => {
              menuClose();
              trackClick("menu_close_button");
            }}
          >
            <div className="py-2 px-2 cursor-pointer rounded-full duration-300 font-oswald font-medium uppercase text-base bg-[#FF3F2B] group-hover:bg-[#212121]">
              <div className="w-6 h-6 p-1 flex flex-col justify-between relative">
                <div className="h-0.5 w-full group-hover:w-2/3 bg-white duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center rotate-45"></div>
                <div className="h-0.5 w-full group-hover:w-2/3 bg-white duration-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center -rotate-45"></div>
              </div>
            </div>
          </button>
        </div>

        <div className="w-full h-full px-6 flex items-center justify-center">
          <div className="w-full flex flex-row gap-[80px]">
            <div className="w-full hidden md:flex lg flex-col gap-12 max-w-[320px] lg:max-w-[360px] xl:max-w-[480px]">
              <div className="w-full flex flex-row items-center justify-between py-2.5 border-b border-[#1c1c1c]">
                <span className="font-archivo font-semibold text-sm text-[#2C2C2C]">
                  VAULT
                </span>
                <span className="font-archivo font-semibold text-sm text-[#2C2C2C]">
                  P0-RTL
                </span>
              </div>

              <div className="w-full">
                {/*Monitor*/}
                <div className="w-full h-[240px] lg:h-[280px] xl:h-[340px] flex flex-col border border-[#1c1c1c] overflow-hidden rounded-[5px]">
                  <div className="w-full flex flex-row gap-[5px] px-3 py-2.5">
                    <div className="w-2.5 h-2.5 rounded-full border border-[#1c1c1c]"></div>
                    <div className="w-2.5 h-2.5 rounded-full border border-[#1c1c1c]"></div>
                  </div>
                  <div className="w-full h-full px-2 pb-2">
                    <div
                      className="w-full h-full relative border border-[#1c1c1c] rounded-xs overflow-hidden"
                      style={{
                        background: `url(${TvStatic.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      {hoveredPosterIndex !== null && (
                        <Image
                          src={Posters[hoveredPosterIndex]}
                          alt="Hover Preview"
                          width={464}
                          height={290}
                          className="w-full h-full object-cover absolute top-0 left-0 right-0 bottom-0 transition-opacity duration-300 opacity-100"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/*Menu Discription*/}
                <div className="w-full mt-6 px-2">
                  <div
                    className="max-w-[280px] w-full flex flex-col gap-5 font-archivo font-normal text-xs text-[#5C5C5C]"
                    style={{ fontSize: "clamp(10px, 0.83vw, 16px)" }}
                  >
                    <p>
                      Whether you are launching a blog, I am here to provide you
                      with the digital wizardry that makes your project shine
                      brighter than a supernova.
                    </p>

                    <p>
                      I am here to provide you with the digital shine brighter
                      than a supernova.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-12">
              <div className="w-full flex flex-row items-center justify-between py-2.5 border-b border-[#1c1c1c]">
                <span className="font-archivo font-semibold text-sm text-[#2C2C2C]">
                  MENU
                </span>
                <span className="font-archivo font-semibold text-sm text-[#2C2C2C]">
                  P4-G3S
                </span>
              </div>
              <div className="w-full flex flex-col">
                <MenuLink
                  label="About"
                  href="/about"
                  onHover={() => setHoveredPosterIndex(0)}
                  onLeave={() => setHoveredPosterIndex(null)}
                />
                <MenuLink
                  label="Works"
                  href="/works"
                  onHover={() => setHoveredPosterIndex(1)}
                  onLeave={() => setHoveredPosterIndex(null)}
                  menuClose={menuClose}
                />
                <MenuLink
                  label="Posters"
                  href="/posters"
                  onHover={() => setHoveredPosterIndex(2)}
                  onLeave={() => setHoveredPosterIndex(null)}
                  menuClose={menuClose}
                />
                <MenuLink
                  label="Company Profiles"
                  href="/profiles"
                  onHover={() => setHoveredPosterIndex(3)}
                  onLeave={() => setHoveredPosterIndex(null)}
                  menuClose={menuClose}
                />
                <MenuLink
                  label="Miscellaneous"
                  href="/miscs"
                  onHover={() => setHoveredPosterIndex(5)}
                  onLeave={() => setHoveredPosterIndex(null)}
                  menuClose={menuClose}
                />
                <MenuLink
                  label="Blogs"
                  href="/blogs"
                  onHover={() => setHoveredPosterIndex(4)}
                  onLeave={() => setHoveredPosterIndex(null)}
                  menuClose={menuClose}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-6 py-5 flex flex-row justify-between items-center">
          <span
            className="font-oswald text-[#5C5C5C] font-normal text-base uppercase"
            style={{ letterSpacing: "-0.02em" }}
          >
            AP-03
          </span>
          <span className="font-kings font-normal text-xl text-[#5C5C5C] transition-all duration-300">
            <span
              className="font-oswald text-base font-medium uppercase"
              style={{ letterSpacing: "-0.02em" }}
            >
              Tomorrow
            </span>
            Begins
            <span
              className="font-oswald text-base font-medium uppercase"
              style={{ letterSpacing: "-0.02em" }}
            >
              Today
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
