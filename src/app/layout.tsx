import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReservationProvider } from "@/context/ReservationContext";
import { AuthProvider } from "@/context/AuthContext";
import ReservationModal from "@/components/ReservationModal";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { RootLayoutClient } from "@/app/RootLayoutClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jóga s Eliškou",
  description:
    "Jóga pro začátečníky i pokročilé. Síla, mobilita a dech v jednom pohybu. Rezervace online.",
  keywords:
    "jóga, Jóga, wellness, meditace, fitness, mindfulness, Praha-Řepy, Eliška Radová, Studio Samadhi",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Jóga s Eliškou",
    title: "Jóga s Eliškou",
    description:
      "Jóga pro začátečníky i pokročilé. Síla, mobilita a dech v jednom pohybu.",
    images: ["/assets/eliska/eliska-cover.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jóga s Eliškou",
    description:
      "Jóga pro začátečníky i pokročilé. Síla, mobilita a dech v jednom pohybu.",
    images: ["/assets/eliska/eliska-cover.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={poppins.variable}>
      <body className="bg-sky-50 font-poppins">
        <AuthProvider>
          <ReservationProvider>
            <RootLayoutClient>{children}</RootLayoutClient>

            <ReservationModal />
            <CookieConsentBanner />
          </ReservationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
