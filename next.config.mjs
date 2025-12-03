/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["pdfkit"], // ⬅️ important pour la route PDF
  },
};

export default nextConfig;
