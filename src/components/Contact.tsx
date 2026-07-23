"use client";

import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";
import { useReservation } from "@/context/ReservationContext";

const contactItems = [
  {
    label: "Email",
    value: "e.radova99@gmail.com",
    href: "mailto:e.radova99@gmail.com",
  },
  {
    label: "Telefon",
    value: "+420 774 750 600",
    href: "tel:+420774750600",
  },
  {
    label: "Adresa",
    value:
      "Studio Samadhi - Obchodní centrum Řepy, Makovského 1392, 163 00, Praha-Řepy",
    href: "https://maps.app.goo.gl/YSMUTZJHQ4XWekiS8",
  },
  {
    label: "Rozvrh lekcí",
    value: "Neděle 18:00, 19:15\nPondělí 18:00, 19:15",
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
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Kontakt"
          subtitle="Chcete začít svou jógovou cestu? Spojte se se mnou."
          accentColor="rose"
          isDark={true}
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: contact grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {contactItems.map((item) => {
              const Wrapper = item.href ? "a" : "div";

              return (
                <Wrapper
                  key={item.label}
                  href={item.href || undefined}
                  target={item.href ? "_blank" : undefined}
                  className={
                    item.href
                      ? "group text-sky-700 hover:text-sky-900 transition-all duration-200"
                      : "group"
                  }
                >
                  <div className="border-l-2 border-sky-300 pl-5 hover:border-sky-500 hover:pl-6 transition-all duration-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-sky-500 mb-2 group-hover:text-sky-700 transition-colors duration-200 font-semibold">
                      {item.label}
                    </p>

                    <p
                      className={`text-sky-700 text-base leading-relaxed whitespace-pre-line font-medium ${
                        item.href ? "group-hover:underline" : ""
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
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
              Rezervace probíhá přes rezervační systém studia Samadhi. Stačí
              vybrat datum a zarezervovat si místo jednoduše online.
            </p>
            <a
              href="https://studiosamadhi.inrs.cz/rs/kal/14/skupinove-lekce-oc-repy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-block btn-primary">
                Rezervovat online
              </button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
