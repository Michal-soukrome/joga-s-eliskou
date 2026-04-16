const serviceNumbers = ["01", "02", "03", "04", "05", "06"];

const services = [
  {
    id: 1,
    title: "Power Jóga",
    description:
      "Dynamická jóga pro začátečníky i mírně pokročilé. Posílení a elasticita v rytmu dechu.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    pose: "warrior",
  },
  {
    id: 2,
    title: "Protažení a Flexibilita",
    description: "Hlubší strečink ke zlepšení flexibility a prevenci zranění",
    image:
      "https://images.unsplash.com/photo-1502633256149-91d931cbb231?w=400&h=300&fit=crop",
    pose: "triangle",
  },
  {
    id: 3,
    title: "Dechové Techniky",
    description: "Pranájáma - ovládání dechu pro lepší energii a relaxaci",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    pose: "lotus",
  },
  {
    id: 4,
    title: "Relaxace a Zotavení",
    description: "Jemné strečování a relaxační techniky pro zotavení",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
    pose: "child",
  },
  {
    id: 5,
    title: "Posílení Jádra",
    description:
      "Cvičení zaměřená na posílení středu těla a zlepšení stability",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop",
    pose: "downward",
  },
  {
    id: 6,
    title: "Osobní Vedení",
    description: "Individuální konzultace a přizpůsobený plán pro vaše potřeby",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=400&h=300&fit=crop",
    pose: "tree",
  },
];

import SectionTitle from "@/components/SectionTitle";

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6 bg-stone-950"
    >
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Lekce & Programy"
          subtitle="Power jóga pro začátečníky i mírně pokročilé v Berouně"
          accentColor="emerald"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-800">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="bg-stone-950 group cursor-pointer overflow-hidden relative"
            >
              {/* Image */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
                {/* Number badge */}
                <div className="absolute top-4 left-4 text-xs font-mono text-amber-400/60 tracking-widest">
                  {serviceNumbers[index]}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 border-t border-stone-800 group-hover:border-amber-400/30 transition-colors duration-300">
                <h3 className="text-lg font-bold text-white font-playfair mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
