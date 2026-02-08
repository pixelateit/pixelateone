// app/blogs/[slug]/page.js

import BlogReadPage from "@/components/BlogReadPage";
import { getBlogBySlug } from "@/lib/getBlogBySlug";

export async function generateMetadata({ params }) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Blog",
      description: "Blog post",
    };
  }

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
