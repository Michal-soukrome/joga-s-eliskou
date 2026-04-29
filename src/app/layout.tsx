import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReservationProvider } from "@/context/ReservationContext";
import ReservationModal from "@/components/ReservationModal";
import CookieConsentBanner from "@/components/CookieConsentBanner";

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
      <head />
      <body className="bg-sky-50 font-poppins">
        <ReservationProvider>
          {children}
          <ReservationModal />
          <CookieConsentBanner />
        </ReservationProvider>
      </body>
    </html>
  );
}
