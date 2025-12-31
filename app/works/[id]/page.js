"use client";
import Image from "next/image";
import { ArrowUpRight, LoaderCircle, X } from "lucide-react";
import PageTorn from "@/public/home/pageTorn2.webp";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ImageSlider from "@/components/ImageSlider";
import { gsap } from "@/lib/gsapConfig";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HoverButton from "@/components/HoverButton";
import PageLink from "@/components/PageLink";

export default function WorkPageScroll() {
  const { id: workId } = useParams();
  const contentBody = useRef(null);
  const tableOfContent = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    banner: "",
    logo: "",
    webLink: "",
    timeline: "",
    clientName: "",
    deliverables: "",
    description: "",
    projectDetails: "",
    teamMembers: "",
    logoDesign: "",
    logoDesignImg: "",
    typography: "",
    designProcess: "",
    designProcessImg: "",
    createdBy: "",
    slider1: [],
    slider2: [],
  });

  useEffect(() => {
    const fetchWorkData = async () => {
      try {
        const res = await fetch(`/api/work/${workId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch work data");
        }
        const { work } = await res.json();
        setFormData({
          title: work.title || "",
          banner: work.banner ? { preview: work.banner } : null,
          logo: work.logo ? { preview: work.logo } : null,
          webLink: work.weblink || "",
          timeline: work.timeline || "",
          clientName: work.clientName || "",
          deliverables: work.deliverables || "",
          description: work.description || "",
          projectDetails: work.projectDetails || "",
          teamMembers: work.teamMembers || "",
          logoDesign: work.logoDesign || "",
          logoDesignImg: work.logoDesignImg
            ? { preview: work.logoDesignImg }
            : null,
          typography: work.typography ? { preview: work.typography } : null,
          designProcess: work.designProcess || "",
          designProcessImg: work.designProcessImg
            ? { preview: work.designProcessImg }
            : null,
          createdBy: work.createdBy || "",
          slider1: (work.slider1 || []).map((url) => ({ preview: url })),
          slider2: (work.slider2 || []).map((url) => ({ preview: url })),
        });
      } catch (error) {
        console.error("❌ Error loading work:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workId) fetchWorkData();
  }, [workId]);

  // --- GSAP Scroll-to Handler ---
  const scrollToSection = (id) => {
    gsap.to(window, {
      duration: 1,

      scrollTo: { y: id, offsetY: 0 },
      ease: "power2",
    });
  };

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.fromTo(
        contentBody.current,
        {
          y: "100vh",
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          delay: 1,
          ease: "power3.out",
        }
      )
        .fromTo(
          contentBody.current,
          { y: "100vh" },
          { y: 0, duration: 1, ease: "power3.out" }
        )
        .fromTo(
          tableOfContent.current,
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.3"
        );
    }
  }, [loading]);

  const getImageUrl = (imageObject) => imageObject?.preview || "";

  const isContentPresent = (content) =>
    (typeof content === "string" && content.trim() !== "") ||
    (Array.isArray(content) && content.length > 0);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <h1 className="w-fit flex flex-row gap-2 items-center">
          <LoaderCircle className="w-6 h-6 text-[#fff]/60 animate-spin" />{" "}
          <span className="font-archivo font-semibold text-2xl text-[#fff]/60">
            Loading...
          </span>
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center relative bg-black">
      <div className="w-full max-w-[1000px] flex-row justify-start lg:flex hidden">
        <div
          ref={tableOfContent}
          className="w-[160px] flex flex-col gap-2 fixed top-[240px] z-20"
        >
          <span className="font-oswald font-medium text-base text-[#242222]/80 uppercase">
            Table of Content
          </span>
          <div className="w-full flex flex-col">
            <HoverButton
              text="Overview"
              onClickFn={() => scrollToSection("#overview")}
            />
            {isContentPresent(formData.projectDetails) && (
              <HoverButton
                text="Project Details"
                onClickFn={() => scrollToSection("#projectDetails")}
              />
            )}
            {isContentPresent(formData.teamMembers) && (
              <HoverButton
                text="Team Members"
                onClickFn={() => scrollToSection("#teamMembers")}
              />
            )}
            {(isContentPresent(formData.logoDesign) ||
              getImageUrl(formData.logoDesignImg)) && (
              <HoverButton
                text="Logo Design"
                onClickFn={() => scrollToSection("#logoDesign")}
              />
            )}
            {getImageUrl(formData.typography) && (
              <HoverButton
                text="Typography"
                onClickFn={() => scrollToSection("#typography")}
              />
            )}
            {(isContentPresent(formData.designProcess) ||
              getImageUrl(formData.designProcessImg)) && (
              <HoverButton
                text="Design Process"
                onClickFn={() => scrollToSection("#designProcess")}
              />
            )}
          </div>
        </div>
      </div>

      <div
        ref={contentBody}
        className="w-full mt-[120px] bg-white"
        style={{ zIndex: 5 }}
      >
        <div className="w-full flex flex-col items-center px-5 md:px-0 pb-24 gap-20 relative">
          <div
            className="w-full h-[50px] absolute top-0 left-0 z-0"
            style={{
              backgroundImage: `url(${PageTorn.src})`,
              backgroundRepeat: "repeat-x",
              transform: "translateY(-20px)",
              zIndex: 2,
            }}
          />
          <div
            className="w-full flex flex-row gap-2 items-center justify-center z-10"
            style={{ transform: "translateY(-28px)" }}
          >
            <PageLink className="border border-[#242222]/20 rounded-full bg-white p-4 group hover:bg-[#ECECEE] transition-all duration-300">
              <X className="w-6 h-6 text-[#5f5f5f] transition-all duration-300  group-hover:scale-80" />
            </PageLink>
          </div>

          <div className="w-full max-w-[1000px] flex flex-row justify-end ">
            <div className="w-full max-w-[840px] flex flex-row justify-end">
              <div className="w-full max-w-[640px] z-20">
                <div className="w-20 h-20 rounded-[18px] flex items-center justify-center bg-[#d7d7d7]/30 overflow-hidden mb-4">
                  <div className="w-[70px] h-[70px] overflow-hidden rounded-[14px] flex items-center justify-center bg-white shadow-[4px_9px_9px_rgba(0,0,0,0.12)]">
                    <Image
                      src={formData.logo?.preview}
                      alt={formData.title}
                      width={36}
                      height={36}
                      className="w-full h-full aspect-square"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between items-center mb-4">
                  <span
                    className="text-4xl font-bold font-archivo w-fit text-[#242222]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {formData.title}
                  </span>
                  {formData.webLink && (
                    <button
                      className="py-2 ps-4 pe-2 bg-white hover:bg-[#f5f5f5] cursor-pointer transition-all duration-300 flex flex-row items-center gap-1 rounded-full border border-[#DCDCDC]"
                      on={formData.webLink}
                      type="button"
                      onClick={() => {
                        const url = formData.webLink.startsWith("http")
                          ? formData.webLink
                          : `https://${formData.webLink}`;

                        window.open(url, "_blank");
                      }}
                    >
                      <span
                        className="text-[#242222] text-base font-archivo font-semibold"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        View Live
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-[#242222]" />
                    </button>
                  )}
                </div>

                <div className="w-full flex flex-row gap-2 mb-1">
                  <p
                    className="w-fit text-lg font-medium font-archivo text-[#242222]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {formData.clientName}
                  </p>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-sm bg-[#242222]" />
                  </div>
                  <p
                    className="w-fit text-lg font-medium font-archivo text-[#242222]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {formData.timeline}
                  </p>
                </div>
                <p
                  className="w-full text-lg font-normal font-archivo text-[#242222]/80"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {formData.deliverables}
                </p>
                <p
                  className="w-full text-lg font-normal font-archivo text-[#242222] mt-6"
                  style={{ letterSpacing: "-0.02em" }}
                  id="overview"
                >
                  {formData.description}
                </p>
              </div>
            </div>
          </div>

          {/*Banner*/}
          {formData.banner?.preview && (
            <Image
              src={formData.banner?.preview}
              alt="Banner Image"
              loading="lazy"
              width={1900}
              height={540}
              className="w-full object-cover aspect-auto min-h-[400px] rounded-[10px]"
            />
          )}

          <div className="w-full max-w-[1000px] flex flex-row justify-end">
            <div className="w-full max-w-[840px] flex flex-row justify-end">
              <div className="w-full ">
                {/*Project Details*/}
                <div
                  className="w-full flex flex-col lg:flex-row relative"
                  id="projectDetails"
                >
                  <span
                    className="w-[200px] text-sm font-semibold font-archivo text-[#242222] uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Project Details
                  </span>
                  <p
                    className="w-full max-w-[640px] text-lg font-normal font-archivo text-[#242222]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {formData.projectDetails}
                  </p>
                </div>

                {/*Team Members*/}
                <div
                  className="w-full flex flex-col lg:flex-row mt-14 relative"
                  id="teamMembers"
                >
                  <span
                    className="w-[200px] text-sm font-semibold font-archivo text-[#242222] uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Team Members
                  </span>
                  <p
                    className="w-full max-w-[640px] text-lg font-normal font-archivo text-[#242222]"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {formData.teamMembers}
                  </p>
                </div>

                {/*Logo Design*/}
                <div
                  className="w-full flex flex-col lg:flex-row mt-14 relative"
                  id="logoDesign"
                >
                  <span
                    className="w-[200px] text-sm font-semibold font-archivo text-[#242222] uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Logo Design
                  </span>
                  <div className="w-full max-w-[640px]">
                    <p
                      className="w-full text-lg font-normal font-archivo text-[#242222] mb-4"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {formData.logoDesign}
                    </p>
                    {formData.logoDesignImg?.preview && (
                      <Image
                        src={formData.logoDesignImg?.preview}
                        alt="Logo Design Image"
                        width={1900}
                        height={540}
                        className="w-full aspect-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Slider 1*/}
          {Array.isArray(formData.slider1) && formData.slider1.length > 0 && (
            <ImageSlider images={formData.slider1} />
          )}

          <div className="w-full max-w-[1000px] flex flex-row justify-end">
            <div className="w-full max-w-[840px] flex flex-row justify-end">
              <div className="w-full">
                {/*Typography*/}
                <div
                  className="w-full flex flex-col lg:flex-row relative"
                  id="typography"
                >
                  <span
                    className="w-[200px] text-sm font-semibold font-archivo text-[#242222] uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Topography
                  </span>
                  <div className="w-full max-w-[640px]">
                    {formData.typography?.preview && (
                      <Image
                        src={formData.typography?.preview}
                        alt="Banner Image"
                        width={1900}
                        height={540}
                        className="w-full aspect-auto"
                      />
                    )}
                  </div>
                </div>

                {/*Design Process*/}
                <div
                  className="w-full flex flex-col lg:flex-row mt-14 relative"
                  id="designProcess"
                >
                  <span
                    className="w-[200px] text-sm font-semibold font-archivo text-[#242222] uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Design Process
                  </span>
                  <div className="w-full max-w-[640px]">
                    <p
                      className="w-full text-lg font-normal font-archivo text-[#242222] mb-4"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {formData.designProcess}
                    </p>
                    {formData.designProcessImg?.preview && (
                      <Image
                        src={formData.designProcessImg?.preview}
                        alt="Design Process Image"
                        width={1900}
                        height={540}
                        className="w-full aspect-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Slider 2*/}
          {Array.isArray(formData.slider2) && formData.slider2.length > 0 && (
            <ImageSlider images={formData.slider2} />
          )}
        </div>
      </div>
    </div>
  );
}
