"use client";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";

const pricingPlans = [
  {
    id: 1,
    name: "První lekce",
    price: "170",
    unit: "Kč",
    description: "Začni s námi za zvýhodněnou cenu.",
    features: [],
    cta: "Zarezervovat",
    href: "#reservations",
  },
  {
    id: 2,
    name: "Permanentka 10 vstupů",
    price: "1 800",
    unit: "Kč",
    description: "Výhodná varianta pro pravidelnou praxi.",
    features: ["Platnost 12 týdnů"],
    cta: "Koupit permanentku",
    href: "#reservations",
    highlighted: true,
  },
  {
    id: 3,
    name: "Jednorázový vstup",
    price: "220",
    unit: "Kč",
    description: "Ideální pro občasnou návštěvu bez závazků.",
    features: [],
    cta: "Dozvědět se více",
    href: "#contact",
  },
  {
    id: 4,
    name: "Individuální lekce",
    price: "1 000",
    unit: "Kč / 60 min",
    description: "Osobní přístup, přizpůsobení lekce tvému tělu i úrovni.",
    features: [],
    cta: "Dozvědět se více",
    href: "#contact",
  },
];

export default function Pricing() {
  const { openModal } = useReservation();

  return (
    <section
      id="pricing"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-tr from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Ceník"
          subtitle="Dostupné lekce a tréninkové programy"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-xl p-6 transition-all duration-300 group ${
                plan.highlighted
                  ? "border-2 border-sky-400 bg-sky-50 shadow-lg shadow-sky-100"
                  : "border border-sky-100 bg-white shadow-sm hover:border-sky-300 hover:shadow-md hover:shadow-sky-100"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-sky-600 text-white text-xs uppercase tracking-widest font-semibold rounded-full whitespace-nowrap">
                  Nejpopulárnější
                </span>
              )}

              {/* Name */}
              <p className="text-xs font-medium text-sky-500 uppercase tracking-wide mb-3">
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="text-3xl font-bold text-sky-900 font-poppins">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-sky-500">{plan.unit}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-sky-600 leading-relaxed flex-grow">
                {plan.description}
              </p>

              {/* Features */}
              {plan.features.length > 0 && (
                <div className="mt-4 space-y-1.5">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="text-sky-400 text-xs">✓</span>
                      <span className="text-xs text-sky-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Divider */}
              <div className="my-5 border-t border-sky-100" />

              {/* CTA */}
              <a
                href={plan.href}
                className={`text-sm font-medium transition-colors duration-200 group-hover:underline ${
                  plan.highlighted
                    ? "text-sky-700 hover:text-sky-900"
                    : "text-sky-500 hover:text-sky-700"
                }`}
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl px-6 py-5 bg-sky-50 border border-sky-100">
          <p className="text-sm text-sky-700">
            Všechny ceny jsou bez DPH. Individuální lekce a speciální programy
            na vyžádání.
          </p>
          <a href="#contact" className="inline-block btn-primary shrink-0">
            Napište mi zprávu
          </a>
        </div>
      </Container>
    </section>
  );
}
