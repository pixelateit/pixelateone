export function getPathFromUrl(url) {
  try {
    const decoded = decodeURIComponent(url);
    const u = new URL(
      decoded.startsWith("http") ? decoded : `https://${decoded}`
    );

    let path = "";

    if (u.hostname === "storage.googleapis.com") {
      const [, ...rest] = u.pathname.split("/").filter(Boolean);
      path = rest.join("/");
    } else {
      path = u.pathname
        .split("/")
        .filter(Boolean)
        .filter((p) => !p.includes("firebasestorage.app"))
        .join("/");
    }

    // 🔥 CRITICAL FIX — convert encoded filename to real Firebase object name
    return path.replace(/%20/g, " ");
  } catch (err) {
    console.error("Invalid Firebase URL:", url);
    return null;
  }
}
