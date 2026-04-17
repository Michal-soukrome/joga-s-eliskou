import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const testimonials = [
  {
    id: 1,
    name: "Petra Novotná",
    role: "Podnikatelka",
    content:
      "Eliška změnila můj život svým osobním přístupem. Cítím se silnější, klidnější a více vyrovnaná než kdy dřív.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    name: "Tomáš Kovář",
    role: "Sportovec",
    content:
      "Józinské programy mi pomohly se zotavit rychleji a výrazně zlepšily mou flexibilitu. Velmi doporučuji!",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    name: "Jana Procházková",
    role: "Vedoucí projektů",
    content:
      "Konečně jsem našla praxi, která se hodí k mému rušnému životnímu stylu. Eliška je úžasná instruktořka.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 px-6 bg-gradient-to-bl from-sky-50 via-white to-sky-100"
    >
      <Container>
        <SectionTitle
          title="Ohlasy"
          subtitle="Skutečné zkušenosti od lidí, kteří transformovali svou praxi"
          accentColor="violet"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-sky-100 p-8 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-200/30 transition-all duration-300 group rounded-lg"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sky-700 mb-8 leading-relaxed text-sm group-hover:text-sky-800 transition-colors duration-300">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-sky-100 group-hover:border-sky-200 transition-colors">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-11 h-11 rounded-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div>
                  <p className="font-semibold text-sky-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-sky-500 mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
