"use client";

import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";
import { useState } from "react";

export default function Header() {
  const { openModal } = useReservation();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full h-20 bg-white/95 backdrop-blur-sm border-b border-sky-100 z-50 shadow-sm shadow-sky-100/50">
      <nav className="px-6 h-full">
        <Container className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="h-full flex items-center gap-3">
            <div className="w-px h-7 bg-sky-500"></div>
            <span className="font-poppins text-xl font-bold text-sky-900 tracking-tight">
              Power jóga s <span className="text-sky-500">Eliškou</span>
            </span>
          </div>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-8">
            <li>
              <a
                href="#about"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                O mě
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                Lekce
              </a>
            </li>
            <li>
              <a
                href="#benefits"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                Benefity
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                Ceník
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                Recenze
              </a>
            </li>
            <li>
              <a
                href="#faq"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-sky-600 hover:text-sky-900 transition-all duration-200 text-xs uppercase tracking-[0.2em] font-medium hover:opacity-75"
              >
                Kontakt
              </a>
            </li>
            <li>
              <button onClick={openModal} className="btn-primary !uppercase">
                Rezervovat
              </button>
            </li>
          </ul>

          {/* Hamburger button */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
            onClick={() => setOpen(!open)}
          >
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded transition-all duration-300 ${
                open ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded my-1 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-sky-700 rounded transition-all duration-300 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </Container>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-lg shadow-sky-100/40 transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-6 gap-4 text-center">
          <li>
            <a
              href="#about"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              O mě
            </a>
          </li>
          <li>
            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              Lekce
            </a>
          </li>
          <li>
            <a
              href="#benefits"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              Benefity
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              Ceník
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              Recenze
            </a>
          </li>
          <li>
            <a
              href="#faq"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              FAQ
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-sky-700 text-sm uppercase tracking-[0.2em] font-medium hover:text-sky-900 transition"
            >
              Kontakt
            </a>
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
