"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentBlogs({ id }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 4;

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        limit,
        status: "published",
        fields: "_id,title,metaDescription,slug,createdAt,author,thumbnail",
      }).toString();

      const res = await fetch(`/api/blogs?${query}`);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} - ${text}`);
      }

      const data = await res.json();

      const blogList = data.blogs || [];
      // ✅ Ensure you set `data.blogs` if API responds { blogs: [...] }
      setBlogs(blogList);

      setLoading(false);
    } catch (err) {
      console.error("fetchBlogs failed:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => blog._id !== id); // remove the blog with id

  const recentBlogs = filteredBlogs.slice(0, 3);

  console.log(id);
  console.log(recentBlogs);
  return (
    <div className="w-full flex justify-center pt-16">
      <div className="w-full max-w-[1080px] flex flex-col items-center gap-6">
        <h2
          className="w-full font-bold flex flex-row"
          style={{ fontSize: "clamp(18px, 2.16vw, 40px)" }}
        >
          <span
            className="text-[#242222] font-bold font-archivo-narrow"
            style={{
              letterSpacing: "-0.05em",
              lineHeight: "clamp(18px, 2.16vw, 40px)",
            }}
          >
            Recent
          </span>
          <span
            className="text-[#242222] font-kings font-normal text-[84px]"
            style={{
              fontSize: "clamp(20px, 2.375vw, 42px)",
              lineHeight: "clamp(25px, 2.5vw, 50px)",
            }}
          >
            Blogs
          </span>
        </h2>

        {!loading && recentBlogs.length > 0 ? (
          <div className="w-full flex flex-col sm:flex-row gap-10 sm:gap-2">
            {recentBlogs.map((blog) => {
              return (
                <Link
                  href={`/blogs/${blog.slug}`}
                  key={blog._id}
                  className="w-full max-w-1/3 flex flex-col gap-3 group cursor-pointer"
                >
                  <div className="w-full min-h-32 overflow-hidden h-auto">
                    {blog.thumbnail && (
                      <Image
                        src={blog.thumbnail}
                        alt={blog.title}
                        width={440}
                        height={560}
                        className="w-full h-auto scale-125 aspect-auto group-hover:scale-100 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="w-full px-2 flex flex-col gap-1">
                    <span
                      className="w-full font-archivo font-semibold text-xl text-[#242222] "
                      style={{ lineHeight: "1.2em" }}
                    >
                      {blog.title}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-col sm:flex-row gap-10 sm:gap-2">
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[440px] bg-[#efefef] animate-pulse" />
              <div className="w-full flex flex-col gap-1">
                <h3 className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
                <div className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[320px] bg-[#efefef] animate-pulse" />
              <div className="w-full flex flex-col gap-1">
                <h3 className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
                <div className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
              </div>
            </div>
            <div className="w-full flex flex-col gap-3">
              <div className="w-full h-[400px] bg-[#efefef] animate-pulse" />
              <div className="w-full flex flex-col gap-1">
                <h3 className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
                <div className="w-full h-5 bg-[#efefef] animate-pulse rounded-sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
