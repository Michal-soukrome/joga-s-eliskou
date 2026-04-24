"use client";

import { useState, useEffect, useCallback } from "react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const testimonials = [
  {
    id: 1,
    name: "Míša",
    role: "",
    content:
      "Eliška je skvělá lektorka, trpělivá, opraví, co je třeba a lekci vede profesionálně a je vidět, že si na nich dává záležet",
    rating: 5,
  },
  {
    id: 2,
    name: "Eva",
    role: "",
    content:
      "Lekce s Eliškou mě vždycky skvěle nastartují - fyzicky i psychicky!",
    rating: 5,
  },
  {
    id: 3,
    name: "Vašek",
    role: "",
    content:
      "Chodím už od začátku a jsem velmi spokojený s přístupem Elišky. Vždy se přizpůsobí přání skupiny, jestli lekci udělat náročnější nebo dopohody. Člověk se zapotí, ale zároveň odchází odpočatý a plný energie. Všem, kdo chtějí udělat něco pro své tělo a poznat fajn kolektiv, určitě neváhejte a Spojte se se mnou 😊",
    rating: 5,
  },
  {
    id: 4,
    name: "Denisa",
    role: "",
    content:
      "Absolutně nejlepší jóga v Berouně!😍 Power jóga je pro mě ideální volba. Na lekci u Elišky si zamakám, ale zároveň i zklidním svoji mysl.🙏🏻",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-5">
      {[...Array(count)].map((_, i) => (
        <span key={i} className="text-amber-400 text-base">
          ★
        </span>
      ))}
    </div>
  );
}

function getCardStyle(offset: number, total: number) {
  // offset: 0 = active, 1 = next, -1 = prev, etc.
  const abs = Math.abs(offset);
  if (abs > 2) return null; // don't render far-away cards

  const scale = offset === 0 ? 1 : offset === 1 ? 0.93 : 0.86;
  const translateX =
    offset === 0
      ? 0
      : offset === 1
        ? 62
        : offset === -1
          ? -62
          : offset === 2
            ? 110
            : -110;
  const translateY = abs === 0 ? 0 : abs === 1 ? 14 : 24;
  const zIndex = abs === 0 ? 30 : abs === 1 ? 20 : 10;
  const opacity = abs === 0 ? 1 : abs === 1 ? 0.7 : 0.4;

  return { scale, translateX, translateY, zIndex, opacity };
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setActive((a) => (a + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((a) => (a - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          setActive((value) => (value + 1) % total);
          return 0;
        }
        return current + 2.5;
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, [paused, total]);

  useEffect(() => {
    setProgress(0);
  }, [active]);

  return (
    <section
      id="testimonials"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-tr from-sky-50/50 via-white to-sky-100/50 overflow-hidden"
    >
      <Container>
        <SectionTitle
          title="Recenze"
          subtitle="Skutečné zkušenosti od lidí, kteří transformovali svou praxi"
          accentColor="violet"
        />

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 340 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => {
            const offset = (((i - active + total) % total) + total) % total;
            // Remap: 0=active, 1=right, 2=far-right, total-1=left, total-2=far-left
            const remapped = offset > total / 2 ? offset - total : offset;
            const style = getCardStyle(remapped, total);
            if (!style) return null;

            const { scale, translateX, translateY, zIndex, opacity } = style;

            return (
              <div
                key={t.id}
                onClick={() => remapped !== 0 && setActive(i)}
                className="absolute w-full max-w-md bg-white border border-sky-100 rounded-2xl p-8 shadow-sm"
                style={{
                  transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: remapped !== 0 ? "pointer" : "default",
                  willChange: "transform, opacity",
                }}
              >
                <StarRating count={t.rating} />
                <p className="text-sky-700 leading-relaxed text-base mb-6 line-clamp-4">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-sky-100">
                  <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center text-sky-400 text-xs font-semibold">
                    {t.name !== "-" ? t.name[0] : "★"}
                  </div>
                  <p className="font-semibold text-sky-900 text-base">
                    {t.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-6 overflow-hidden rounded-full bg-sky-100 h-2">
          <div
            className="h-2 rounded-full bg-sky-700 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-sky-200 text-sky-400 hover:border-sky-400 hover:text-sky-600 transition-colors flex items-center justify-center text-lg"
            aria-label="Předchozí"
          >
            ‹
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  background: i === active ? "#38bdf8" : "#bae6fd",
                }}
                aria-label={`Přejít na ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-sky-200 text-sky-400 hover:border-sky-400 hover:text-sky-600 transition-colors flex items-center justify-center text-lg"
            aria-label="Další"
          >
            ›
          </button>
        </div>
      </Container>
    </section>
  );
}
