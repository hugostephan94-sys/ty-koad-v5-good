/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ["pdfkit"],
  },
};

export default nextConfig;
