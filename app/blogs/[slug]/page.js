// app/blogs/[slug]/page.js

"use client";
import PageLink from "@/components/PageLink";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PageTorn from "@/public/home/pageTorn2.webp";
import { ScrollTrigger } from "@/lib/gsapConfig";
import { useGSAPAnimations } from "@/hooks/useGSAPAnimations";
import RecentBlogs from "@/components/RecentBlogs";
// import DOMPurify from "isomorphic-dompurify";

export default function BlogReadPage() {
  const { slug: blogSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [purify, setPurify] = useState(null);
  const containerWrapper = useRef(null);
  const pinElement = useRef(null);

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    tags: "",
    content: "",
    thumbnail: null,
    metaTitle: "",
    metaDescription: "",
    createdAt: new Date().toISOString().split("T")[0],
    author: "",
    readingTime: 0,
  });

  useEffect(() => {
    // This ensures DOMPurify is only imported and assigned on the client
    const loadDOMPurify = async () => {
      try {
        const DOMPurify = (await import("isomorphic-dompurify")).default;
        setPurify(() => DOMPurify);
      } catch (error) {
        console.error("Failed to load DOMPurify:", error);
      }
    };

    loadDOMPurify();
  }, []);

  useEffect(() => {
    // Fetch blog post data using the blogSlug if needed
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${blogSlug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch blog post");
        }
        const { blog } = await res.json();

        setFormData({
          id: blog._id || "",
          title: blog.title || "",
          tags: Array.isArray(blog.tags)
            ? blog.tags.join(", ")
            : blog.tags || "",
          content: blog.content || "",
          thumbnail: blog.thumbnail ? { preview: blog.thumbnail } : null,
          metaTitle: blog.metaTitle || "",
          metaDescription: blog.metaDescription || "",
          author: blog.author || "",
          createdAt: new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          readingTime: blog.readingTime || 0,
        });
      } catch (error) {
        console.error("❌ Error loading blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogSlug) fetchBlogPost();
  }, [blogSlug]);

  useGSAPAnimations({
    animations: [
      () => {
        if (loading) return;

        const container = containerWrapper.current;
        const pin = pinElement.current;

        if (!pin || !container) return;

        const pinTrigger = ScrollTrigger.create({
          trigger: ".stickyx",
          pin: true,
          start: "top 128px",
          end: () => `${container.offsetHeight - 2 * pin.offsetHeight} top`,
        });

        ScrollTrigger.refresh();

        return () => {
          pinTrigger.kill();
        };
      },
    ],
    dependencies: [loading],
  });

  if (loading || !purify) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <h1 className="w-fit flex flex-row gap-2 items-center">
          <LoaderCircle className="w-6 h-6 text-[#242222]/40 animate-spin" />{" "}
          <span className="font-archivo font-semibold text-2xl text-[#242222]/60">
            Loading...
          </span>
        </h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{formData.metaTitle}</title>
        <meta name="description" content={formData.metaDescription} />
        <meta property="og:title" content={formData.metaTitle} />
        <meta property="og:description" content={formData.metaDescription} />
        {formData.thumbnail?.preview && (
          <>
            <meta property="og:image" content={formData.thumbnail.preview} />
            <meta name="twitter:image" content={formData.thumbnail.preview} />
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <section className="w-full flex flex-col justify-center items-center px-5 py-32 relative">
        <div className="w-full flex flex-row max-w-[880px] items-center md:items-start lg:me-[200px]">
          <div className="w-[240px] hidden relative md:block">
            <div
              ref={pinElement}
              className="w-full flex flex-col py-2 gap-5 stickyx"
            >
              <div className="w-full flex flex-row items-center gap-1">
                <PageLink>
                  <ArrowLeft className="w-5 h-5 text-[#5f5f5f] transition-all duration-300 hover:text-[#A4A4A4]" />
                </PageLink>
                <span
                  className="font-archivo font-medium text-[#242222] text-base"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Blog
                </span>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="font-archivo font-medium text-[#242222]/70 text-sm">
                  Tags:
                </span>
                <div className="w-full flex flex-row flex-wrap gap-1">
                  {formData.tags.split(",").map((tag, index) => (
                    <span
                      key={index}
                      className="font-archivo text-sm font-medium text-[#242222]/70 bg-[#f2f2f2] px-1 py-0.5 rounded-sm uppercase"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span className="font-archivo font-medium text-[#242222]/70 text-sm">
                  Author:
                </span>
                <span
                  className="w-[240px] truncate font-archivo font-medium text-[#242222] text-base"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {formData.author}
                </span>
              </div>
            </div>
          </div>

          <div
            ref={containerWrapper}
            className="w-full md:max-w-[640px] flex flex-col gap-5"
          >
            <h1
              className="text-4xl font-medium text-[#242222] font-archivo"
              style={{ letterSpacing: "-0.02em" }}
            >
              {formData.title}
            </h1>

            <div className="w-full flex flex-row items-center px-3 py-2 border-t border-b border-[#E2E2E2] md:hidden gap-4">
              <span
                className="w-fit font-archivo font-medium text-[#242222] text-base"
                style={{ letterSpacing: "-0.02em" }}
              >
                {formData.author}
              </span>

              <div className="w-0.5 h-4 bg-[#E2E2E2] rounded-xs" />

              <div className="w-fit flex flex-row flex-nowrap gap-1">
                {formData.tags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="font-archivo text-sm font-medium text-[#242222]/70 bg-[#f2f2f2] px-1 py-0.5 rounded-sm uppercase"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-fit flex items-center gap-1">
              <span
                className="font-archivo text-sm font-medium text-[#242222]/70"
                style={{ letterSpacing: "-0.02em" }}
              >
                {formData.createdAt}
              </span>
              <div className="w-10 h-0.5 bg-[#FF3F2B]" />
              <span
                className="font-archivo text-sm font-medium text-[#242222]/70 uppercase"
                style={{ letterSpacing: "-0.02em" }}
              >
                {formData.readingTime} min read
              </span>
            </div>
            {formData.thumbnail && (
              <div className="flex w-full overflow-hidden">
                <Image
                  src={formData.thumbnail?.preview}
                  alt={formData.title}
                  width={640}
                  height={640}
                  className="w-full aspect-auto my-4"
                />
              </div>
            )}
            <div
              className="blogContent"
              dangerouslySetInnerHTML={{
                __html: purify.sanitize(formData.content),
              }}
            />
          </div>
        </div>
        <RecentBlogs id={formData.id} />
        <div
          className="w-full h-[50px] absolute bottom-0 left-0 z-10"
          style={{
            backgroundImage: `url(${PageTorn.src})`,
            backgroundRepeat: "repeat-x",
            transform: "translateY(30px)",
          }}
        />
      </section>
    </>
  );
}
