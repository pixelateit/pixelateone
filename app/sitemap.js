import { getBlogs } from "@/lib/getBlogs";
import { getWorks } from "@/lib/getWorks";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = "https://pixelate.one";

  const blogs = await getBlogs();
  const works = await getWorks();

  // 🔹 Static routes
  const staticRoutes = [
    "",
    "/about",
    "/works",
    "/posters",
    "/profiles",
    "/miscs",
    "/blogs",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const blogUrls = blogs.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
  }));

  const workUrls = works.map((item) => ({
    url: `${baseUrl}/works/${item._id}`,
    lastModified: item.updatedAt || new Date(),
  }));

  return [...staticRoutes, ...blogUrls, ...workUrls];
}
