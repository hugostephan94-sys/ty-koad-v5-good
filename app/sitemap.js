// app/sitemap.js
export default function sitemap() {
  const base = "https://www.chalets-tykoad.fr";
  const now = new Date();

  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/nuit`, lastModified: now },
    { url: `${base}/spa`, lastModified: now },
    { url: `${base}/autour`, lastModified: now },
    { url: `${base}/gourmets`, lastModified: now },
    { url: `${base}/infos-pratiques`, lastModified: now },
    { url: `${base}/cadeau`, lastModified: now },
    { url: `${base}/reserver`, lastModified: now },
    { url: `${base}/tarifs`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
  ];
}
