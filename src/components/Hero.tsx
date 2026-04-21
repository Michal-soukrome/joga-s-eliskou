"use client";

import Image from "next/image";
import { useReservation } from "@/context/ReservationContext";

export default function Hero() {
  const { openModal } = useReservation();

  return (
    <section className="relative h-[85dvh] md:h-[100dvh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/IMG_0002.webp"
          alt="Eliška Radová - Power Jóga"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Softer overlay */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-slate-900/90 via-transparent to-transparent -z-0" />
      {/* Mobile Softer overlay */}
      <div className="md:hidden absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-transparent -z-0" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 lg:-mt-12 pb-20">
        <div className="max-w-xl space-y-6">
          {/* Location */}
          <span className="hidden md:flex text-[11px] uppercase tracking-[0.35em] text-sky-200/80 font-semibold font-poppins">
            Power Jóga · Beroun
          </span>

          {/* Headline */}
          <h3 className="text-4xl md:text-6xl font-bold text-white leading-tight font-poppins">
            Síla, <span className="text-sky-300">mobilita</span>, dech.
          </h3>

          {/* Subtext */}
          <p className="text-white/75 leading-relaxed text-sm md:text-base font-poppins max-w-md">
            Certifikovaná lektorka jógy pro začátečníky a mírně pokročilé.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={openModal} className="btn-primary">
              Rezervovat lekci
            </button>

            <a href="#about" className="btn-secondary">
              Více informací
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
