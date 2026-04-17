"use client";

import Image from "next/image";
import { useReservation } from "@/context/ReservationContext";

export default function Hero() {
  const { openModal } = useReservation();

  return (
    <section className="relative h-[100dvh] pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/assets/eliska.jpg"
          alt="Eliška Radová — Power Yoga"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Softer overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent -z-0" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 lg:-mt-12 pb-20">
        <div className="max-w-xl space-y-6">
          {/* Location */}
          <span className="hidden md:flex text-[11px] uppercase tracking-[0.35em] text-sky-200/80 font-semibold font-poppins">
            Power Jóga · Beroun
          </span>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight font-poppins">
            Síla, <span className="text-sky-300">plynulost</span>, klid.
          </h1>

          {/* Subtext */}
          <p className="text-white/75 leading-relaxed text-xs md:text-base font-poppins max-w-md">
            Plynulý pohyb, protažení a posílení celého těla v rytmu dechu. Lekce
            ti pomůže zpomalit, uvolnit napětí a zároveň nabrat energii.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={openModal} className="btn-primary">
              Rezervovat lekci
            </button>

            <a href="#services" className="btn-secondary">
              Více informací
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
