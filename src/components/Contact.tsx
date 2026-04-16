"use client";

import SectionTitle from "@/components/SectionTitle";

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
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-white border-t border-sky-100"
    >
      <div className="max-w-7xl mx-auto">
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
                className="border-l-2 border-sky-200 pl-5 hover:border-sky-400 transition-colors group"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-sky-400 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sky-700 hover:text-sky-900 transition-colors text-sm leading-relaxed whitespace-pre-line"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sky-700 text-sm leading-relaxed whitespace-pre-line">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="bg-sky-50 border border-sky-200 p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-500 font-semibold mb-3">
              Online rezervace
            </p>
            <h3 className="text-2xl font-bold text-sky-900 font-playfair mb-4 leading-snug">
              Rezervujte si místo
              <br />
              na nejbližší lekci
            </h3>
            <p className="text-sky-600 text-sm leading-relaxed mb-8">
              Rezervace probíhá přes platformu Reservio. Stačí vybrat datum a
              zarezervovat si místo jednoduše online.
            </p>
            <a href="#reservations" className="inline-block btn-primary">
              Rezervovat přes Reservio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
