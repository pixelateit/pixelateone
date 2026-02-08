export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://pixelate.one/sitemap.xml",
    host: "https://pixelate.one",
  };
}
