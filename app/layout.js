import "./globals.css";

export const metadata = {
  title: "Ty-Koad — V5.x",
  description: "Paiement, caution, iCal, admin",
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
