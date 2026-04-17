"use client";

import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";

const pricingPlans = [
  {
    id: 1,
    name: "První lekce",
    price: "170",
    description: "Vyzkoušejte power jógu bez rizika",
    features: [
      "Individuální posouzení",
      "Přizpůsobená úroveň",
      "Konzultace po lekci",
    ],
    cta: "Zarezervovat",
    href: "#reservations",
  },
  {
    id: 2,
    name: "Permanentka 10×",
    price: "1800",
    description: "Nejlepší cena pro pravidelné cvičení",
    features: [
      "Neomezená doba platnosti",
      "Flexibilní rozvrh",
      "Sleva na skupinové lekce",
      "Přístup k tipy & trikům",
    ],
    cta: "Koupit permanentku",
    href: "#reservations",
    highlighted: true,
  },
  {
    id: 3,
    name: "Skupinová lekce",
    price: "Dle typu",
    description: "Cvičení s přáteli a motivací skupiny",
    features: [
      "Interakce s ostatními",
      "Větší motivace",
      "Komunitní pocit",
      "Speciální workshopy",
    ],
    cta: "Dozvědět se více",
    href: "#contact",
  },
];

export default function Pricing() {
  const { openModal } = useReservation();
  return (
    <section
      id="pricing"
      className="scroll-mt-20 py-24 px-6 bg-gradient-to-bl from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Ceník"
          subtitle="Dostupné lekce a tréninkové programy"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative transition-all duration-300 ${
                plan.highlighted
                  ? "md:scale-105 md:-translate-y-4"
                  : "flex flex-col"
              }`}
            >
              <div
                className={`border rounded-xl p-8 flex flex-col h-full transition-all duration-300 ${
                  plan.highlighted
                    ? "border-sky-300 bg-gradient-to-br from-sky-50 to-white shadow-2xl shadow-sky-200/50 hover:shadow-2xl hover:shadow-sky-300/60"
                    : "border-sky-100 bg-white hover:border-sky-300 shadow-md hover:shadow-lg hover:shadow-sky-200/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-sky-600 text-white text-xs uppercase tracking-widest font-semibold rounded-full">
                      Nejpopulárnější
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-sky-900 font-poppins mb-2">
                  {plan.name}
                </h3>
                <p className="text-sky-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-sky-900 font-poppins">
                      {plan.price}
                    </span>
                    {plan.price !== "Dle typu" && (
                      <span className="text-sky-600">Kč</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <span className="text-sky-500 font-bold mt-0.5">✓</span>
                      <span className="text-sky-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-8 border border-sky-200 shadow-md hover:shadow-lg transition-all duration-300">
          <h3 className="text-lg font-bold text-sky-900 mb-4">
            Máte další otázky?
          </h3>
          <p className="text-sky-700 mb-6">
            Všechny ceny jsou bez DPH. Individuální lekce a speciální programy
            na vyžádání. Spojte se se mnou pro více informací.
          </p>
          <a href="#contact" className="inline-block btn-primary">
            Napište mi zprávu
          </a>
        </div>
      </Container>
    </section>
  );
}
