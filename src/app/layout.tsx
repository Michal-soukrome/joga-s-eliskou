import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReservationProvider } from "@/context/ReservationContext";
import ReservationModal from "@/components/ReservationModal";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Power Jóga s Eliškou",
  description:
    "Power jóga v Berouně pro začátečníky i mírně pokročilé. Síla, mobilita a dech v jednom pohybu. Rezervace online přes Reservio.",
  keywords:
    "jóga, power jóga, wellness, meditace, fitness, mindfulness, Beroun, Eliška Radová, Studio Yogaway",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${poppins.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M2GXC4N2');`,
          }}
        />
      </head>
      <body className="bg-sky-50 font-poppins">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M2GXC4N2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ReservationProvider>
          {children}
          <ReservationModal />
        </ReservationProvider>
      </body>
    </html>
  );
}
