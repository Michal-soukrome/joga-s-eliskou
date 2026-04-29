"use client";

import Image from "next/image";
import { useReservation } from "@/context/ReservationContext";

export default function Hero() {
  const { openModal } = useReservation();

  return (
    <section className="relative h-[90dvh] md:h-[100dvh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/eliska/eliska-cover.png"
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
      <div className="relative h-full flex flex-col justify-center md:justify-end items-center md:items-start px-8 md:px-16 xl:px-24 xl:-mt-12 pt-20 pb-0 md:pb-20">
        <div className="max-w-xl space-y-6">
          {/* Location */}
          <span className="hidden md:flex text-[11px] uppercase tracking-[0.35em] text-sky-200/80 font-semibold font-poppins">
            Power Jóga · Beroun
          </span>

          {/* Headline */}
          <h3 className="!-mt-6 md:!mt-6 text-4xl md:text-6xl font-bold text-white leading-tight font-poppins">
            Síla, <span className="text-sky-300">mobilita</span>, dech.
          </h3>

          {/* Subtext */}
          <p className="text-white/75 leading-relaxed text-sm md:text-base font-poppins max-w-lg">
            certifikovaná lektorka jógy
            <span className="mx-1">•</span>
            lekce pro začátečníky a mírně pokročilé
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
