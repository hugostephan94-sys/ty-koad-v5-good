import "./globals.css";

export const metadata = {
  title: "Chalets Ty-Koad — Spa privatif en Bretagne",
  description:
    "Deux chalets tout confort à Laz avec spa privatif et jardin, pour un séjour détente au cœur du Finistère.",
  openGraph: {
    title: "Chalets Ty-Koad — Spa privatif en Bretagne",
    description:
      "Séjournez dans nos chalets avec spa privatif et jardin à Laz, entre confort moderne et nature bretonne.",
    url: "https://ty-koad-v5-site.vercel.app/", // tu changeras par ton .fr plus tard
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: "/images/og-tykoad.png", // ton image d’aperçu
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chalets Ty-Koad — Spa privatif en Bretagne",
    description:
      "Chalets avec spa privatif et jardin à Laz, pour un séjour détente en Bretagne.",
    images: ["/images/og-tykoad.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-emerald-50
          via-sky-50
          to-rose-50
          text-stone-900
          antialiased
          pt-16
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-4
            sm:py-6
          "
        >
          {children}
        </div>
      </body>
    </html>
  );
}
