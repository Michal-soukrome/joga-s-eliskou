import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const benefits = [
  {
    icon: "strength",
    title: "Zvýšená síla",
    description: "Posílení celého těla s důrazem na core, nohy a paže",
  },
  {
    icon: "flexibility",
    title: "Flexibilita",
    description: "Postupné zlepšení pohyblivosti a rozprostření svalstva",
  },
  {
    icon: "breath",
    title: "Lepší dech",
    description: "Kontrola dechu pro zvýšenou energii a klid mysli",
  },
  {
    icon: "peace",
    title: "Nižší stres",
    description: "Uvolnění napětí a zlepšení emoční rovnováhy",
  },
  {
    icon: "sleep",
    title: "Lepší spánek",
    description: "Hlubší relaxace a regenerace těla přes noc",
  },
  {
    icon: "energy",
    title: "Více energie",
    description: "Přirozený nárůst vitality a fyzické odolnosti",
  },
];

const IconComponent = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    strength: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 11h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z" />
      </svg>
    ),
    flexibility: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
      </svg>
    ),
    breath: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 4h3v2H6V4zm3 14h-3v2h3v-2zm10-14h3v2h-3V4zm3 14h-3v2h3v-2zm-6 0h3v2h-3v-2zM9 9h3v6H9V9zm6 0h3v6h-3V9z" />
      </svg>
    ),
    peace: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
      </svg>
    ),
    sleep: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M9.5 2c-1.82 0-3.53.5-5 1.35C7.33 5.5 9.68 8.5 9.68 12s-2.35 6.5-5.18 8.65C5.97 21.5 7.68 22 9.5 22c6.63 0 12-5.37 12-12S16.13 2 9.5 2z" />
      </svg>
    ),
    energy: (
      <svg
        className="w-8 h-8 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  };

  return (
    <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200">
      {icons[type]}
    </div>
  );
};

export default function Benefits() {
  return (
    <section
      id="benefits"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-tl from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle
          title="Výhody"
          subtitle="Co se změní během prvních týdnů práce s power jógou"
        />

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative bg-gradient-to-br from-sky-100/75 to-white border border-sky-100 rounded-xl p-8 hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-200/40 transition-all duration-300"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-sky-200 rounded-full -z-10 opacity-0 group-hover:opacity-20 transition-all duration-500 blur-3xl"></div>

              <div className="!hidden mb-4 transform group-hover:scale-105 transition-all duration-300">
                <IconComponent type={benefit.icon} />
              </div>
              <h3 className="text-lg font-bold text-sky-900 font-poppins mb-3 group-hover:text-sky-700 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-sky-700 text-base leading-relaxed group-hover:text-sky-800 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
