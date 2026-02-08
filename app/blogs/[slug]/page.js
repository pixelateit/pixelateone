// app/blogs/[slug]/page.js

import BlogReadPage from "@/components/BlogReadPage";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/blogs/slug/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return {
      title: "Blog",
      description: "Blog post",
    };
  }

  const { blog } = await res.json();

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription,
    openGraph: {
      title: blog.metaTitle,
      description: blog.metaDescription,
      images: blog.thumbnail ? [blog.thumbnail] : [],
    },
  };
}

export default function BlogTextPage() {
  return <BlogReadPage />;
}
