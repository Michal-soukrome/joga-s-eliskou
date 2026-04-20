"use client";
import { useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const lessons = [
  {
    id: 1,
    number: "",
    title: "Power Jóga",
    subtitle: "Dynamická praxe v rytmu dechu",
    steps: [
      {
        n: 1,
        title: "Koncentrace",
        desc: "Začínáme zpomalením a naladěním na dech.",
      },
      {
        n: 2,
        title: "Mobilita",
        desc: "Pokračujeme rozehřátím a rozhýbáním celého těla.",
      },
      {
        n: 3,
        title: "Dynamika",
        desc: "Dynamická část ve stoje - pozdravy slunce a jejich variace.",
      },
      {
        n: 4,
        title: "Peak Pose",
        desc: "Práce se středem těla, rovnováha, záklony.",
      },
      {
        n: 5,
        title: "Závěrečné pozice",
        desc: "Plynulá sekvence na podložce v rytmu dechu.",
      },
      {
        n: 6,
        title: "Závěrečná relaxace",
        desc: "Šavásana - vedená relaxace s vonnou aromaterapií.",
      },
    ],
    note: "Jóga je pro každého! Vítám pokročilé jogíny i úplné začátečníky - vše ráda ukážu a vysvětlím.",
  },
  {
    id: 2,
    number: "",
    title: "Protažení & Flexibilita",
    subtitle: "Hlubší strečink pro tělo i mysl",
    steps: [
      {
        n: 1,
        title: "Rozehřátí",
        desc: "Jemné zahřátí svalů a kloubů před hlubším protažením.",
      },
      {
        n: 2,
        title: "Statický strečink",
        desc: "Vydržíme déle v pozicích pro maximální uvolnění.",
      },
      {
        n: 3,
        title: "Práce s dechem",
        desc: "Dech jako nástroj k prohloubení každé pozice.",
      },
      {
        n: 4,
        title: "Závěr",
        desc: "Relaxace a integrace - tělo vstřebá veškerou práci.",
      },
    ],
    note: "Vhodné pro prevenci zranění, sportovce i ty, kdo chtějí zlepšit celkovou pohyblivost.",
  },
];

export default function Lekce() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-br from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Lekce"
          subtitle="Kliknutím zobrazíš více informací"
          accentColor="emerald"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {lessons.map((lesson) => {
            const isOpen = openId === lesson.id;
            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer h-fit ${
                  isOpen
                    ? "border-sky-300 shadow-md shadow-sky-100"
                    : "border-sky-100 hover:border-sky-200"
                }`}
                onClick={() => setOpenId(isOpen ? null : lesson.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 p-6 group ">
                  <div>
                    <p className="text-xs font-mono tracking-widest text-sky-400 mb-1">
                      {lesson.number}
                    </p>
                    <h3 className="text-xl font-bold text-sky-900 font-poppins group-hover:underline">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-sky-500 mt-1">
                      {lesson.subtitle}
                    </p>
                  </div>
                  <div
                    className={`mt-1 shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "border-sky-400 bg-sky-50" : "border-sky-200"
                    }`}
                  >
                    <span
                      className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>
                </div>

                {/* Expandable body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px]" : "max-h-0"} overflow-hidden`}
                >
                  <div className="px-6 pb-6 border-t border-sky-100 pt-5">
                    <ul className="space-y-3">
                      {lesson.steps.map((step) => (
                        <li key={step.n} className="flex gap-3 items-start">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-sky-50 border border-sky-200 text-xs font-medium text-sky-500 flex items-center justify-center mt-0.5">
                            {step.n}
                          </span>
                          <div>
                            <span className="text-xs font-semibold tracking-wide text-sky-700 uppercase">
                              {step.title}
                            </span>
                            <p className="text-sm text-sky-600 leading-relaxed mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {lesson.note && (
                      <p className="mt-4 text-sm text-sky-500 italic bg-sky-50 rounded-lg px-4 py-3">
                        {lesson.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
