"use client";

import Image from "next/image";
import TextAppear from "./TextAppear";
import TextHighlight from "./TextHighlight";
import { useRef, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import { usePathname } from "next/navigation";
import PageLink from "./PageLink";

export default function BlogSection() {
  const divBg = useRef(null);
  const blgs = useRef(null);
  const pathname = usePathname();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          limit,
          status: "published",
          fields: "_id,title,slug,thumbnail,metaDescription,author",
        }).toString();
        const res = await fetch(`/api/blogs?${query}`);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error: ${res.status} - ${text}`);
        }

        const data = await res.json();

        if (data.success && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("fetchBlogs failed:", err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [pathname]);

  // 🔹 Animate background color
  useGSAPAnimations({
    animations: [
      () => {
        if (!divBg.current) return;

        const tween = gsap.fromTo(
          "#bgColorCh",
          { background: "#ffffff" },
          {
            background: "#FE5B00",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: divBg.current,
              start: "15% 60%",
              end: "15% 10%",
              scrub: true,
              // markers: true,
            },
          }
        );

        return () => tween.kill();
      },
    ],
    dependencies: [],
  });

  // 🔹 Animate blog cards
  useGSAPAnimations({
    animations: [
      () => {
        if (!blgs.current) return;

        const tween = gsap.fromTo(
          blgs.current.children,
          { y: "240px", opacity: 0 },
          {
            y: "0px",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: blgs.current,
              start: "top 70%",
              end: "top 30%",
              scrub: true,
              markers: false,
            },
          }
        );

        return () => tween.kill();
      },
    ],
    dependencies: [],
  });

  // 🔹 Handle refresh on load + resize
  useEffect(() => {
    const handleLoad = () => ScrollTrigger.refresh();
    const handleResize = () => ScrollTrigger.refresh();

    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="flex w-full flex-col items-center py-20"
      ref={divBg}
      style={{
        background:
          "radial-gradient(240% 105% at 50% 100%, #B82500 5%, #FE5B00 35%, rgba(254, 91, 0, 0.4) 42%, rgba(254, 91, 0, 0) 50%)",
      }}
    >
      <div className="flex flex-col container w-full max-w-7xl  my-10 lg:my-20 px-5 md:px-0">
        <div className="flex w-full flex-col items-center">
          <div className="bg-[#c0c0c0] h-[220px] lg:h-[240px] w-[1px]"></div>
          <div className="bg-[#c0c0c0] h-[1px] w-[40px] lg:w-[60px]"></div>
        </div>

        <div className="flex flex-col items-center gap-3 lg:gap-6  mt-8 lg:mt-16">
          <TextHighlight opacity={0}>
            <h3
              id="myBlogs"
              className="flex flex-row"
              style={{ fontSize: "clamp(24px, 2.5vw, 48px)" }}
            >
              <span
                className="text-white font-bold font-archivo-narrow"
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "clamp(20px, 1.56vw, 30px)",
                }}
              >
                My
              </span>
              <span
                className="text-white font-kings"
                style={{ lineHeight: "clamp(24px, 1.875vw, 36px)" }}
              >
                Thoughts
              </span>
            </h3>
          </TextHighlight>

          <div className="w-full relative">
            <h2
              className="text-[#ffffff] w-full flex flex-col font-oswald uppercase font-semibold text-center"
              style={{
                fontSize: "clamp(32px, 4.16vw, 80px)",
                lineHeight: "clamp(30px, 3.75vw, 72px)",
                letterSpacing: "-0.05em",
                textAlign: "center",
                textTransparent: "true",
              }}
            >
              <TextAppear start="top 55%" end="top 5%">
                <span>Ideas, Experiments</span>
                <br />
                <span>& Deep Dives</span>
              </TextAppear>
            </h2>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-10 sm:gap-2 mt-8 lg:mt-16"
          ref={blgs}
        >
          {!blogs.length || loading ? (
            <div className="flex w-full flex-col sm:flex-row gap-10 sm:gap-2 mt-8 lg:mt-16">
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full h-[540px] bg-[#E5E5E5]/50 animate-pulse" />
                <div className="flex w-full flex-col gap-2 px-2 h-fit">
                  <div className="w-[200px] h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                  <div className="w-full h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full h-[320px] bg-[#E5E5E5]/50 animate-pulse" />
                <div className="flex w-full flex-col gap-2 px-2 h-fit">
                  <div className="w-[200px] h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                  <div className="w-full h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full h-[400px] bg-[#E5E5E5]/50 animate-pulse" />
                <div className="flex w-full flex-col gap-2 px-2 h-fit">
                  <div className="w-[200px] h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                  <div className="w-full h-5 bg-[#E5E5E5]/50 rounded-sm animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            blogs.map((blog) => (
              <PageLink
                href={`/blogs/${blog.slug}`}
                className="flex w-full max-w-[1/3] flex-col gap-4 h-fit"
                key={blog._id}
              >
                <div className="flex w-full overflow-hidden">
                  <Image
                    src={blog.thumbnail}
                    alt={blog.title}
                    width={419}
                    height={583}
                    className="w-full aspect-auto hover:scale-110 transition-all duration-250 ease-in-out"
                  />
                </div>
                <div className="flex w-full flex-col gap-2 px-2 h-fit">
                  <h5 className="font-archivo w-full font-semibold text-base uppercase text-white">
                    {blog.title}
                  </h5>
                </div>
              </PageLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
