import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Power Jóga s Eliškou - Studio Yogaway Beroun",
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
    <html lang="cs" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-sky-50 font-poppins">{children}</body>
    </html>
  );
}
