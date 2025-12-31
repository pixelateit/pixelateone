/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // for Firebase Storage
      },
      {
        protocol: "https",
        hostname: "your-s3-bucket.s3.amazonaws.com", // replace with your S3 bucket domain
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
    unoptimized: true, // Disable built-in image optimization
  },
};

export default nextConfig;
