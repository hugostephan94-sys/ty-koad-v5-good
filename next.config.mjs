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

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.chalets-tykoad.fr",
          },
        ],
        destination: "https://chalets-tykoad.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
