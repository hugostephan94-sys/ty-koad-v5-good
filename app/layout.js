import "./globals.css";
import SiteFooter from "../components/SiteFooter";

const SITE_URL = "https://chalets-tykoad.fr";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: "Chalets Ty-Koad — Spa privatif en Bretagne",
  description:
    "Deux chalets tout confort à Laz avec spa privatif et jardin, pour un séjour détente au cœur du Finistère.",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "Chalets Ty-Koad — Spa privatif en Bretagne",
    description:
      "Séjournez dans nos chalets avec spa privatif et jardin à Laz, entre confort moderne et nature bretonne.",
    url: SITE_URL,
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: `${SITE_URL}/images/og-tykoad.png`,
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
    images: [`${SITE_URL}/images/og-tykoad.png`],
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
            min-h-[calc(100vh-4rem)]
            max-w-6xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-4
            sm:py-6
            flex
            flex-col
          "
        >
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
