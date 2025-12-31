"use client";

import { useEffect, useRef, useState } from "react";
import "material-symbols";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import Image from "next/image";
import PageTorn from "@/public/home/pageTorn2.webp";
import PaperTexture from "@/public/home/PaperTexture.webp";
import COLogo from "@/public/home/coachOptimaLogo.svg";
import Link from "next/link";
import StackedImageSlider from "./StackedImageSlider";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import PageLink from "./PageLink";

export default function WorkSections() {
  const triggerDiv = useRef(null);

  const [workData, setWorkData] = useState([]);

  const colors = {
    orange: "#FF3F2B",
    blue: "#1354D9",
    green: "#0C6C51",
    dark: "#000000",
    red: "#D70000",
    violet: "#7507DB",
  };
  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const response = await fetch("/api/featured-work?isfeatured=true");
        const data = await response.json();

        // handle both array and single response structures
        const works = Array.isArray(data)
          ? data
          : data.success && Array.isArray(data.featuredWorks)
          ? data.featuredWorks
          : [];

        const mappedWorks = works.map((item) => ({
          _id: item._id,
          featuredTitle: item.featuredTitle || "",
          industry: item.industry || "",
          bgColor: item.bgColor || "",
          logo: item.work?.logo || COLogo,
          weblink: item.work?.weblink || "",
          timeline: item.work?.timeline || "",
          deliverables: item.work?.deliverables || "",
          description: item.work?.description || "",
          clientName: item.work?.clientName || "",
          featuredImages: item.featuredImages || [],
          workId: item.work?._id || "",
        }));

        setWorkData(mappedWorks);
      } catch (error) {
        console.error("Error fetching featured work data:", error);
      }
    };
    fetchWorkData();
  }, []);

  useGSAPAnimations({
    animations: [
      () => {
        if (!triggerDiv.current) return;

        const projects = triggerDiv.current.querySelectorAll(".proj1");

        projects.forEach((proj, index) => {
          if (index !== 0) {
            gsap.set(proj, { yPercent: 100 });
          }
        });

        const scrollLength = (projects.length - 1) * 100;
        const tl = gsap.timeline();

        projects.forEach((proj, index) => {
          if (index < projects.length - 1) {
            tl.to(proj, {
              scale: 0.9,
              ease: "power1.inOut",
            });

            tl.to(
              projects[index + 1],
              {
                yPercent: 0,
                ease: "power1.inOut",
              },
              "<"
            );
          }
        });

        const st = ScrollTrigger.create({
          animation: tl,
          trigger: triggerDiv.current,
          start: "top top",
          end: `+=${scrollLength}%`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          markers: false,
        });

        ScrollTrigger.refresh();

        return () => {
          st.kill();
          tl.kill();
        };
      },
    ],
    dependencies: [workData], // runs once
  });

  return (
    <div
      className="w-full h-[400vh] overflow-hidden relative block"
      ref={triggerDiv}
    >
      {/* Project 1 */}
      {workData.map((work) => (
        <div
          key={work._id}
          className="proj1 w-full h-screen absolute flex flex-col items-center justify-center inset-0 pt-5"
        >
          <div
            className="w-full h-full relative flex flex-col items-center justify-center pt-5 pb-10 lg:pt-20 lg:pb-20"
            style={{
              background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 90%), radial-gradient(250% 100% at 50% 0%, #000000 0%, ${
                colors[`${work.bgColor}`]
              } 100%)`,
            }}
          >
            <div
              className="w-full h-[50px] absolute top-0 left-0"
              style={{
                backgroundImage: `url(${PageTorn.src})`,
                backgroundRepeat: "repeat-x",
                transform: "translateY(-15px)",
              }}
            ></div>
            <div
              className="w-full h-full absolute top-0 left-0 bottom-0 right-0 pointer-events-none -z-0"
              style={{
                backgroundImage: `url(${PaperTexture.src})`,
                mixBlendMode: "screen",
                backgroundSize: "cover",
                opacity: 0.08,
              }}
            ></div>

            <div className="flex w-full h-full max-h-[720px] md:max-h-[500px] lg:max-h-[640px] flex-col md:flex-row container max-w-7xl my-auto  gap-5 md:gap-10  lg:gap-20">
              <StackedImageSlider images={work.featuredImages} />

              <div className="flex flex-col w-full h-full justify-between px-5 lg:px-0 py-0 lg:py-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-row items-center lg:items-start lg:flex-col gap-4 lg:gap-2">
                    <div className="w-fit p-1 bg-white/50 rounded-2xl">
                      <div className="rounded-xl w-12 h-12 bg-white overflow-hidden">
                        <Image
                          loading="lazy"
                          src={work.logo || COLogo}
                          alt="CoachOptima Logo"
                          width={48}
                          height={48}
                          className="w-12 h-12 aspect-auto object-cover"
                        />
                      </div>
                    </div>
                    <h5 className="text-white font-semibold font-archivo text-2xl">
                      {work.featuredTitle}
                    </h5>
                  </div>
                  <div className="w-full flex flex-col gap-4 lg:gap-6">
                    {work.description &&
                      (() => {
                        const parts = work.description.split(/\. (.+)/);

                        return (
                          <>
                            <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                              {parts[0].trim()}.
                            </p>
                            {parts[1] && (
                              <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                                {parts[1].trim()}
                              </p>
                            )}
                          </>
                        );
                      })()}
                  </div>
                </div>

                <div className="w-full flex flex-col gap-4">
                  <div className="w-full py-3 lg:py-4 border-t border-b border-white/40 flex flex-col gap-4 lg:gap-8">
                    <div className="w-full flex flex-row gap-3">
                      <div className="w-full flex flex-col gap-0">
                        <p className="font-archivo-narrow font-medium  text-xs lg:text-sm text-white/50 uppercase">
                          Industry
                        </p>
                        <p className="font-archivo font-medium text-sm lg:text-lg text-white/80">
                          {work.industry}
                        </p>
                      </div>
                      <div className="w-full flex flex-col gap-0">
                        <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                          Deliverables
                        </p>
                        <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                          {work.deliverables}
                        </p>
                      </div>
                    </div>

                    <div className="w-full flex flex-row gap-3">
                      <div className="w-full flex flex-col gap-0">
                        <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase">
                          Client
                        </p>
                        <p className="font-archivo font-medium  text-sm lg:text-lg text-white/80">
                          {work.clientName}
                        </p>
                      </div>
                      <div className="w-full flex flex-col gap-0">
                        <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                          Timeline
                        </p>
                        <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                          {work.timeline}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex flex-row gap-2.5">
                    <PageLink
                      href={`/works/${work.workId}`}
                      className="w-full text-center bg-black/50 hover:bg-black/70 hover:text-white/90 transition-all duration-200 ease-out rounded-full px-6 py-3 text-white/80 font-archivo font-medium text-base"
                    >
                      View Project
                    </PageLink>
                    {work.weblink && (
                      <button
                        type="button"
                        onClick={() => {
                          const url = work.weblink.startsWith("http")
                            ? work.weblink
                            : `https://${work.weblink}`;

                          window.open(url, "_blank");
                        }}
                        className="w-fit flex gap-1 text-center bg-white hover:bg-white/70 hover:text-black/80 cursor-pointer transition-all duration-200 ease-out rounded-full p-3 text-black font-archivo font-medium text-base disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined">
                          north_east
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
{
  /* Project 2 */
}
{
  /* <div className="proj1 w-full h-screen absolute flex flex-col items-center justify-center inset-0 pt-5">
        <div
          className="w-full h-full relative flex flex-col items-center justify-center pt-5 pb-10 lg:pt-20 lg:pb-20"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 90%), radial-gradient(250% 100% at 50% 0%, #000000 0%, #FD2A11 100%)",
          }}
        >
          <div
            className="w-full h-[50px] absolute top-0 left-0"
            style={{
              backgroundImage: `url(${PageTorn.src})`,
              backgroundRepeat: "repeat-x",
              transform: "translateY(-15px)",
            }}
          ></div>

          <div
            className="w-full h-full absolute top-0 left-0 bottom-0 right-0 pointer-events-none -z-0"
            style={{
              backgroundImage: `url(${PaperTexture.src})`,
              mixBlendMode: "screen",
              backgroundSize: "cover",
              opacity: 0.08,
            }}
          ></div>

          <div className="flex w-full h-full max-h-[720px] md:max-h-[500px] lg:max-h-[640px] flex-col md:flex-row container max-w-7xl my-auto  gap-5 md:gap-10  lg:gap-20">
            <StackedImageSlider images={[WkCO01, WkCO01, WkCO02]} />

            <div className="flex flex-col w-full h-full justify-between px-5 lg:px-0 py-0 lg:py-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center lg:items-start lg:flex-col gap-4 lg:gap-2">
                  <div className=" w-fit p-1 bg-white/50 rounded-2xl">
                    <div className="p-2 rounded-xl bg-white">
                      <Image
                        loading="lazy"
                        src={COLogo}
                        alt="CoachOptima Logo"
                        width={28}
                        className="w-7 h-7 aspect-auto"
                      />
                    </div>
                  </div>
                  <h5 className="text-white font-semibold font-archivo text-2xl">
                    CoachOptima
                  </h5>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-6">
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    CoachOptima is a powerful Coaching Management Dashboard that
                    simplifies coaching practice management.
                  </p>
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    It enables coaches to schedule sessions, track client
                    progress, set goals, and communicate securely with clients.
                    The platform also provides data analytics for data-driven
                    decision-making.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full py-3 lg:py-4 border-t border-b border-white/40 flex flex-col gap-4 lg:gap-8">
                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium  text-xs lg:text-sm text-white/50 uppercase">
                        Industry
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80">
                        Coaching
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Deliverables
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        Web App, Website
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase">
                        Client
                      </p>
                      <p className="font-archivo font-medium  text-sm lg:text-lg text-white/80">
                        xMonks, Ommune
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Timeline
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        AUG ‘23 — AUG ‘24
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-row gap-2.5">
                  <Link
                    href="#"
                    className="w-full text-center bg-black/50 hover:bg-black/70 hover:text-white/90 transition-all duration-200 ease-out rounded-full px-6 py-3 text-white/80 font-archivo font-medium text-base"
                  >
                    View Project
                  </Link>
                  <Link
                    href="#"
                    className="w-fit flex gap-1 text-center bg-white hover:bg-white/70 hover:text-black/80 transition-all duration-200 ease-out rounded-full p-3 text-black font-archivo font-medium text-base disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined">
                      north_east
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
{
  /* Project 3 */
}
{
  /* <div className="proj1 w-full h-screen absolute flex flex-col items-center justify-center inset-0 pt-5">
        <div
          className="w-full h-full relative flex flex-col items-center justify-center pt-5 pb-10 lg:pt-20 lg:pb-20"
          style={{
            background:
              "linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 90%), radial-gradient(250% 100% at 50% 0%, #000000 0%, #003407 100%)",
          }}
        >
          <div
            className="w-full h-[50px] absolute top-0 left-0"
            style={{
              backgroundImage: `url(${PageTorn.src})`,
              backgroundRepeat: "repeat-x",
              transform: "translateY(-15px)",
            }}
          ></div>

          <div
            className="w-full h-full absolute top-0 left-0 bottom-0 right-0 pointer-events-none -z-0"
            style={{
              backgroundImage: `url(${PaperTexture.src})`,
              mixBlendMode: "screen",
              backgroundSize: "cover",
              opacity: 0.08,
            }}
          ></div>

          <div className="flex w-full h-full max-h-[720px] md:max-h-[500px] lg:max-h-[640px] flex-col md:flex-row container max-w-7xl my-auto  gap-5 md:gap-10  lg:gap-20">
            <StackedImageSlider images={[WkCO01, WkCO01, WkCO02]} />

            <div className="flex flex-col w-full h-full justify-between px-5 lg:px-0 py-0 lg:py-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center lg:items-start lg:flex-col gap-4 lg:gap-2">
                  <div className=" w-fit p-1 bg-white/50 rounded-2xl">
                    <div className="p-2 rounded-xl bg-white">
                      <Image
                        loading="lazy"
                        src={COLogo}
                        alt="CoachOptima Logo"
                        width={28}
                        className="w-7 h-7 aspect-auto"
                      />
                    </div>
                  </div>
                  <h5 className="text-white font-semibold font-archivo text-2xl">
                    CoachOptima
                  </h5>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-6">
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    CoachOptima is a powerful Coaching Management Dashboard that
                    simplifies coaching practice management.
                  </p>
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    It enables coaches to schedule sessions, track client
                    progress, set goals, and communicate securely with clients.
                    The platform also provides data analytics for data-driven
                    decision-making.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full py-3 lg:py-4 border-t border-b border-white/40 flex flex-col gap-4 lg:gap-8">
                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium  text-xs lg:text-sm text-white/50 uppercase">
                        Industry
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80">
                        Coaching
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Deliverables
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        Web App, Website
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase">
                        Client
                      </p>
                      <p className="font-archivo font-medium  text-sm lg:text-lg text-white/80">
                        xMonks, Ommune
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Timeline
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        AUG ‘23 — AUG ‘24
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-row gap-2.5">
                  <Link
                    href="#"
                    className="w-full text-center bg-black/50 hover:bg-black/70 hover:text-white/90 transition-all duration-200 ease-out rounded-full px-6 py-3 text-white/80 font-archivo font-medium text-base"
                  >
                    View Project
                  </Link>
                  <Link
                    href="#"
                    className="w-fit flex gap-1 text-center bg-white hover:bg-white/70 hover:text-black/80 transition-all duration-200 ease-out rounded-full p-3 text-black font-archivo font-medium text-base disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined">
                      north_east
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
{
  /* Project 4 */
}
{
  /* <div className="proj1 w-full h-screen absolute  flex flex-col items-center justify-center inset-0 pt-5">
        <div className="w-full h-full relative flex bg-black flex-col items-center justify-center pt-5 pb-10 lg:pt-20 lg:pb-20">
          <div
            className="w-full h-[50px] absolute top-0 left-0"
            style={{
              backgroundImage: `url(${PageTorn.src})`,
              backgroundRepeat: "repeat-x",
              transform: "translateY(-15px)",
            }}
          ></div>

          <div
            className="w-full h-full absolute top-0 left-0 bottom-0 right-0 pointer-events-none -z-0"
            style={{
              backgroundImage: `url(${PaperTexture.src})`,
              mixBlendMode: "screen",
              backgroundSize: "cover",
              opacity: 0.08,
            }}
          ></div>

          <div className="flex w-full h-full max-h-[720px] md:max-h-[500px] lg:max-h-[640px] flex-col md:flex-row container max-w-7xl my-auto  gap-5 md:gap-10  lg:gap-20">
            <StackedImageSlider images={[WkCO01, WkCO01, WkCO02]} />

            <div className="flex flex-col w-full h-full justify-between px-5 lg:px-0 py-0 lg:py-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center lg:items-start lg:flex-col gap-4 lg:gap-2">
                  <div className=" w-fit p-1 bg-white/50 rounded-2xl">
                    <div className="p-2 rounded-xl bg-white">
                      <Image
                        loading="lazy"
                        src={COLogo}
                        alt="CoachOptima Logo"
                        width={28}
                        className="w-7 h-7 aspect-auto"
                      />
                    </div>
                  </div>
                  <h5 className="text-white font-semibold font-archivo text-2xl">
                    CoachOptima
                  </h5>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-6">
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    CoachOptima is a powerful Coaching Management Dashboard that
                    simplifies coaching practice management.
                  </p>
                  <p className="text-white/80 font-normal font-archivo text-sm lg:text-base">
                    It enables coaches to schedule sessions, track client
                    progress, set goals, and communicate securely with clients.
                    The platform also provides data analytics for data-driven
                    decision-making.
                  </p>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <div className="w-full py-3 lg:py-4 border-t border-b border-white/40 flex flex-col gap-4 lg:gap-8">
                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium  text-xs lg:text-sm text-white/50 uppercase">
                        Industry
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80">
                        Coaching
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Deliverables
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        Web App, Website
                      </p>
                    </div>
                  </div>

                  <div className="w-full flex flex-row gap-3">
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase">
                        Client
                      </p>
                      <p className="font-archivo font-medium  text-sm lg:text-lg text-white/80">
                        xMonks, Ommune
                      </p>
                    </div>
                    <div className="w-full flex flex-col gap-0">
                      <p className="font-archivo-narrow font-medium text-xs lg:text-sm text-white/50 uppercase text-end">
                        Timeline
                      </p>
                      <p className="font-archivo font-medium text-sm lg:text-lg text-white/80 text-end">
                        AUG ‘23 — AUG ‘24
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-row gap-2.5">
                  <Link
                    href="#"
                    className="w-full text-center bg-white hover:bg-white/70 transition-all duration-200 ease-out rounded-full px-6 py-3 text-black font-archivo font-medium text-base"
                  >
                    View Project
                  </Link>
                  <Link
                    href="#"
                    className="w-fit flex gap-1 text-center bg-[#FF3F2B] hover:bg-[#FF3F2B]/70 transition-all duration-200 ease-out rounded-full p-3 text-white font-archivo font-medium text-base disabled:opacity-40"
                  >
                    <span className="material-symbols-outlined">
                      north_east
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
