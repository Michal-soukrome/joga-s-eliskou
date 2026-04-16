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
      className="py-24 px-6 bg-stone-950 border-t border-stone-800"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Kontakt"
          subtitle="Chcete začít svou jógovou cestu? Spojte se s Eliškou."
          accentColor="rose"
          isDark={true}
        />

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: contact grid */}
          <div className="grid grid-cols-2 gap-8">
            {contactItems.map((item) => (
              <div key={item.label} className="border-l-2 border-stone-800 pl-5 hover:border-amber-400/50 transition-colors group">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2 group-hover:text-amber-400/70 transition-colors">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-stone-300 hover:text-amber-400 transition-colors text-sm leading-relaxed whitespace-pre-line"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right: CTA card */}
          <div className="bg-stone-900 border border-stone-800 p-10">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-3">
              Online rezervace
            </p>
            <h3 className="text-2xl font-bold text-white font-playfair mb-4 leading-snug">
              Rezervujte si místo<br />na nejbližší lekci
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed mb-8">
              Rezervace probíhá přes platformu Reservio. Stačí vybrat datum
              a zarezervovat si místo jednoduše online.
            </p>
            <a
              href="https://power-joga-s-eliskou.reservio.com/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300 transition-all duration-200 text-sm uppercase tracking-wide"
            >
              Rezervovat přes Reservio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

