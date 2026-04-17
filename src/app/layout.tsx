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
    "Power jóga v Berouně pro začátečníky i mírně pokročilé. Síla, plynulost a klid v jednom pohybu. Rezervace online přes Reservio.",
  keywords:
    "jóga, power jóga, wellness, meditace, fitness, mindfulness, Beroun, Eliška Radová, Studio Yogaway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${poppins.variable}`}>
      <body className="bg-sky-50 font-poppins">
        <ReservationProvider>
          {children}
          <ReservationModal />
        </ReservationProvider>
      </body>
    </html>
  );
}
