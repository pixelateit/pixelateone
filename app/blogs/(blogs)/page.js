// app/blogs/(blogs)/page.js
"use client";

import Masonry from "react-masonry-css";
import TextAppear from "@/components/TextAppear";
import TextHighlight from "@/components/TextHighlight";
import Image from "next/image";
import PageTorn from "@/public/home/pageTorn2.webp";
import BrainImg from "@/public/BrainImg.png";
import BulbImg from "@/public/BulbImg.png";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 9;
  const [totalCount, setTotalCount] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const isFetchingRef = useRef(false);

  const fetchBlogs = async (reset = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      if (reset) setFirstLoad(true);
      else setLoadingMore(true);

      const query = new URLSearchParams({
        limit,
        skip: reset ? 0 : skip,
        status: "published",
        fields: "_id,title,metaDescription,slug,createdAt,author,thumbnail",
      }).toString();

      const res = await fetch(`/api/blogs?${query}`);

      const data = await res.json();

      const blogList = data.blogs;

      if (res.ok) {
        setTotalCount(data.total);
        setBlogs((prev) => (reset ? blogList : [...prev, ...blogList]));
        setHasMore(blogList.length === limit);
        setSkip((prev) => (reset ? blogList.length : prev + blogList.length));
      }
    } catch (err) {
      console.error("fetchBlogs failed:", err);
    } finally {
      isFetchingRef.current = false;
      setFirstLoad(false);
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchBlogs(true);
  }, []);

  console.log(totalCount);

  const breakpoints = {
    default: 3,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <section
      className="w-full flex items-center justify-center relative pt-[80px] pb-[60px] md:pt-[160px] md:pb-[120px]"
      style={{
        background:
          "radial-gradient(296.76% 100% at 50% 100%, #FA5332 9.95%, #FF4D11 24%, #FF3F2B 32%, #E33B2A 44%, #651D15 71.52%, #1A0404 100%)",
      }}
    >
      <div
        className="w-full absolute top-0 left-0"
        style={{
          background: "linear-gradient(0deg, #000000 0%, #1C0502 100%)",
          height: "clamp(280px, 31.25vw, 600px)",
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%,  80% 94%, 70% 76%, 50% 85%, 30% 76%, 20% 94%, 0 100%)",
        }}
      />
      <div className="w-full max-w-[1280px] flex flex-col gap-[80px] md:gap-[160px]">
        <div className="flex flex-col items-center gap-3 lg:gap-6  mt-8 lg:mt-16 z-10">
          <div className="w-fit flex flex-row gap-0">
            <h1
              className="flex font-normal flex-row text-white"
              style={{ fontSize: "clamp(24px, 2.5vw, 56px)" }}
            >
              <span
                className="text-white font-bold font-archivo-narrow"
                style={{
                  letterSpacing: "-0.05em",
                  lineHeight: "clamp(20px, 1.56vw, 40px)",
                }}
              >
                My
              </span>
              <span
                className="text-white font-kings"
                style={{ lineHeight: "clamp(24px, 1.875vw, 48px)" }}
              >
                Blogs
              </span>
            </h1>
            <div style={{ marginTop: "clamp(-4px, 0.2vw, -12px)" }}>
              <span
                className="font-oswald font-medium text-[#FF3F2B]"
                style={{ fontSize: "clamp(10px, 0.83vw, 14px)" }}
              >
                ({totalCount})
              </span>
            </div>
          </div>

          <div className="w-fit relative">
            <h2
              className="text-[#ffffff] w-fit flex flex-col font-oswald uppercase font-medium text-center relative"
              style={{
                fontSize: "clamp(32px, 4.16vw, 80px)",
                lineHeight: "clamp(30px, 3.75vw, 72px)",
                letterSpacing: "-0.05em",
                textAlign: "center",
                textTransparent: "true",
              }}
            >
              <Image
                src={BrainImg.src}
                alt="Brain"
                width={140}
                height={116}
                className="h-auto aspect-auto absolute z-10"
                style={{
                  width: "clamp(50px, 7.29vw, 140px)",
                  top: "calc(-1 * (clamp(16px, 2.08vw, 40px)))",
                  left: "clamp(40px, 6.67vw, 128px)",
                }}
              />
              <Image
                src={BulbImg.src}
                alt="Idea"
                width={110}
                height={104}
                className="h-auto aspect-auto absolute z-10"
                style={{
                  width: "clamp(40px, 5.2vw, 100px)",
                  top: "clamp(16px, 2.08vw, 40px)",
                  right: "clamp(60px, 7.29vw, 140px)",
                }}
              />
              <TextAppear scrub={false} delay={1} start="top 55%" end="top 5%">
                <span>Deep Thoughts, Ideas &</span>
                <br />
                <span>General Stupidity</span>
              </TextAppear>
            </h2>
          </div>
        </div>

        {firstLoad ? (
          <div className="w-full px-6 pb-20 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 grid-flow-row gap-1">
            <div className="flex w-full animate-pulse cursor-none bg-[#121212]/80 rounded-[5px] h-[360px]" />
            <div className="flex w-full animate-pulse cursor-none bg-[#121212]/80 rounded-[5px] h-[600px]" />
            <div className="flex w-full animate-pulse cursor-none bg-[#121212]/80 rounded-[5px] h-[280px]" />
          </div>
        ) : (
          <div className="w-full px-5 md:px-10 lg:px-0 z-10">
            <Masonry
              breakpointCols={breakpoints}
              className="flex gap-4"
              columnClassName="bg-clip-padding"
            >
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  className="w-full flex flex-col mb-6 group cursor-pointer"
                  href={`/blogs/${blog.slug}`}
                >
                  <div className="w-full min-h-32 overflow-hidden h-auto">
                    {blog.thumbnail && (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={400}
                        height={600}
                        className="w-full h-auto scale-125 aspect-auto group-hover:scale-100 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="py-2 px-2 flex flex-col gap-0.5">
                    <span
                      className="font-archivo font-semibold text-xl text-white group-hover:text-white/80 transition duration-500 w-full"
                      style={{ lineHeight: "1.2em" }}
                    >
                      {blog.title}
                    </span>
                  </div>
                </Link>
              ))}
            </Masonry>
          </div>
        )}

        {!firstLoad && hasMore && (
          <div className="w-full flex items-center justify-center mt-4">
            <button
              onClick={() => fetchBlogs()}
              disabled={loadingMore}
              className="px-6 py-3 bg-white text-[#242222] font-semibold cursor-pointer font-archivo rounded-lg transition disabled:opacity-50 outline-4 outline-transparent hover:outline-[#242222]/50"
            >
              {loadingMore ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {!firstLoad && !hasMore && blogs.length === 0 && (
          <div className="w-full flex items-center justify-center mt-4">
            <span className="text-white/70">No more blogs to load.</span>
          </div>
        )}
      </div>
      <div
        className="w-full h-[50px] absolute bottom-0 left-0 z-10"
        style={{
          backgroundImage: `url(${PageTorn.src})`,
          backgroundRepeat: "repeat-x",
          transform: "translateY(30px)",
        }}
      />
    </section>
  );
}
