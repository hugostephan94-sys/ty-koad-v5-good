import "./globals.css";
import Script from "next/script";
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
    <html lang="fr">
      <body>
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '27812680245025705');
              fbq('track', 'PageView');
            `,
          }}
        />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=27812680245025705&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}

        <SiteFooter />
      </body>
    </html>
  );
}
