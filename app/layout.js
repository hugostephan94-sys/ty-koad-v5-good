import "./globals.css";

export const metadata = {
  title: "Ty-Koad — V5.x",
  description: "Paiement, caution, iCal, admin",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className="
          min-h-screen
          bg-gradient-to-br
          from-emerald-50
          via-sky-50
          to-rose-50
          text-stone-900
        "
      >
        {children}
      </body>
    </html>
  );
}
