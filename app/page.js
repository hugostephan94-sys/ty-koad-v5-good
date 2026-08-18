import HomeClient from "../components/HomeClient";

export const metadata = {
  title: "Chalets avec spa privatif à Laz en Finistère",

  description:
    "Découvrez les Chalets Ty-Koad à Laz en Finistère : deux chalets tout confort avec jardin, dont un chalet avec spa privatif pour un séjour détente en Bretagne.",

  alternates: {
    canonical: "https://www.chalets-tykoad.fr/",
  },

  openGraph: {
    title: "Chalets Ty-Koad — Spa privatif en Bretagne",
    description:
      "Deux chalets tout confort à Laz avec jardin, dont un chalet avec spa privatif au cœur du Finistère.",
    url: "https://www.chalets-tykoad.fr/",
  },
};

export default function Page() {
  return <HomeClient />;
}
