import "./globals.css";
import SiteFooter from "../components/SiteFooter";
import CookieConsent from "../components/CookieConsent";

const SITE_URL = "https://www.chalets-tykoad.fr";

export const metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Chalets Ty-Koad — Spa privatif en Bretagne",
    template: "%s | Chalets Ty-Koad",
  },

  description:
    "Deux chalets tout confort à Laz avec spa privatif et jardin, pour un séjour détente au cœur du Finistère.",

  openGraph: {
    title: "Chalets Ty-Koad — Spa privatif en Bretagne",
    description:
      "Séjournez dans nos chalets avec spa privatif et jardin à Laz, entre confort moderne et nature bretonne.",
    siteName: "Chalets Ty-Koad",
    images: [
      {
        url: "/images/og-tykoad.png",
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
    <html lang="fr">
      <body>
        <div className="pt-[76px] md:pt-[78px]">
          {children}
        </div>

        <SiteFooter />

        <CookieConsent />
      </body>
    </html>
  );
}
