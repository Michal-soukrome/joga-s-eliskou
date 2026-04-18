"use client";

import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";

const contactItems = [
  {
    label: "Email",
    value: "eliska@yogaway.cz",
    href: "mailto:eliska@yogaway.cz",
  },
  {
    label: "Telefon",
    value: "+420 XXX XXX XXX",
    href: "tel:+420000000000",
  },
  {
    label: "Adresa",
    value: "Na Parkáně 367, Beroun 1\nStudio Yogaway",
    href: null,
  },
  {
    label: "Rozvrh lekce",
    value: "Středa 19:45 – 20:45",
    href: null,
  },
  {
    label: "IČO",
    value: "24528480",
    href: null,
  },
];

export default function Contact() {
  const { openModal } = useReservation();
  return (
    <section
      id="contact"
      className="scroll-mt-20 py-24 px-6 bg-gradient-to-bl from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Kontakt"
          subtitle="Chcete začít svou jógovou cestu? Spojte se se mnou."
          accentColor="rose"
          isDark={true}
        />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: contact grid */}
          <div className="grid grid-cols-2 gap-8">
            {contactItems.map((item) => (
              <div
                key={item.label}
                className="border-l-2 border-sky-300 pl-5 hover:border-sky-500 hover:pl-6 transition-all duration-200 group"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-sky-500 mb-2 group-hover:text-sky-700 transition-colors duration-200 font-semibold">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sky-700 hover:text-sky-900 transition-all duration-200 text-base leading-relaxed whitespace-pre-line font-medium"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sky-700 text-base leading-relaxed whitespace-pre-line font-medium">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 rounded-lg p-10 shadow-lg hover:shadow-xl hover:shadow-sky-200/40 transition-all duration-300">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500 font-semibold mb-3">
              Online rezervace
            </p>
            <h3 className="text-2xl font-bold text-sky-900 font-poppins mb-4 leading-snug">
              Rezervujte si místo
              <br />
              na nejbližší lekci
            </h3>
            <p className="text-sky-600 text-base leading-relaxed mb-8">
              Rezervace probíhá přes platformu Reservio. Stačí vybrat datum a
              zarezervovat si místo jednoduše online.
            </p>
            <button onClick={openModal} className="inline-block btn-primary">
              Rezervovat přes Reservio
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
