import "./globals.css";
import SiteFooter from "../components/SiteFooter";
import CookieConsent from "../components/CookieConsent";

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
    <html lang="fr">
      <body>
        {/* 
          Le header du site est en position fixed.
          Cet espace évite que le haut des pages passe derrière le header.
        */}
        <div className="pt-[76px] md:pt-[78px]">
          {children}
        </div>

        <SiteFooter />

        <CookieConsent />
      </body>
    </html>
  );
}
