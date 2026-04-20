"use client";
import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";
import { useState, useEffect } from "react";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/YOUR_PAGE",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/YOUR_HANDLE",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Header() {
  const { openModal } = useReservation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full h-20 z-50 transition-all duration-300 border-b border-sky-100 shadow-sm shadow-sky-100/50 backdrop-blur-md ${
        scrolled ? "bg-white/50" : "bg-white/80"
      }`}
    >
      <nav className="px-6 h-full">
        <Container className="h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="h-full flex items-center gap-3">
            <div className="w-px h-7 bg-sky-500" />
            <span className="font-poppins text-xl font-bold text-sky-900 tracking-tight">
              Power jóga s <span className="text-sky-500">Eliškou</span>
            </span>
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-8">
            {[
              ["O mně", "#about"],
              ["Lekce", "#services"],
              ["Ceník", "#pricing"],
              ["Recenze", "#testimonials"],
              ["Galerie", "#gallery"],
              ["FAQ", "#faq"],
              ["Kontakt", "#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}

            <li>
              <button onClick={openModal} className="btn-primary !uppercase">
                Rezervovat
              </button>
            </li>

            {/* Divider */}
            <li aria-hidden className="w-px h-4 bg-sky-200 rounded-full" />
            {/* Social icons */}
            {socials.map(({ label, href, icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-sky-400 hover:text-sky-600 transition-colors duration-200"
                >
                  {icon}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded my-1 transition-all duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
            />
          </button>
        </Container>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-lg shadow-sky-100/40 transition-all duration-300 overflow-hidden ${
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-6 gap-6 text-start">
          {[
            ["O mně", "#about"],
            ["Lekce", "#services"],
            ["Ceník", "#pricing"],
            ["Recenze", "#testimonials"],
            ["Galerie", "#gallery"],
            ["FAQ", "#faq"],
            ["Kontakt", "#contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
              >
                {label}
              </a>
            </li>
          ))}

          {/* Social row */}
          <li>
            <div className="flex items-center gap-6 pt-6 border-t border-sky-100">
              {socials.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sky-400 hover:text-sky-600 transition-colors text-sm font-medium"
                >
                  {icon}
                  <span className="text-xs uppercase tracking-[0.15em]">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </li>

          <li>
            <button
              onClick={() => {
                openModal();
                setOpen(false);
              }}
              className="w-full py-3 bg-sky-600 text-white rounded-md text-sm uppercase tracking-[0.2em] font-medium hover:bg-sky-700 transition"
            >
              Rezervovat
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
