import SectionTitle from "@/components/SectionTitle";

const faqs = [
  {
    question: "Je power jóga vhodná pro začátečníky?",
    answer:
      "Nabízím lekce pro všechny úrovně — začátečníky i pokročilé. Každá lekce je plně přizpůsobitelná tvé fyzické kondici.",
  },
  {
    question: "Jaké cvičební vybavení budu potřebovat?",
    answer:
      "Stačí pohodlné oblečení a láhev vody. Všechno ostatní je k dispozici ve studiu.",
  },
  {
    question: "Jak dlouho před zlepšením pocítím změny?",
    answer:
      "Většina studentů cítí první změny (lepší spánek, menší stres) již po 2-3 lekcích. Výrazné fyzické změny přicházejí po 4-6 týdnech pravidelného tréninku.",
  },
  {
    question: "Mohu přijít, pokud mám zranění nebo bolest?",
    answer:
      "Ano, ale informuj mě před lekcí. Nabídnu ti modifikace cvičení, aby byla lekce pro tebe bezpečná a prospěšná.",
  },
  {
    question: "Jak se dostanu do studia?",
    answer:
      "Studio Yogaway je v Berouně na adrese Na Parkáně 367. Je snadno dostupné autem a je zde parkoviště. Také jezdí autobusy z centra města.",
  },
  {
    question: "Mohu si koupit permanentku?",
    answer:
      "Ano! Permanentka 10× lekce se prodává za 1800 Kč. Je neomezené doby platnosti a můžeš si ji koupit kdykoliv během lekce nebo online.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          title="Často kladené otázky"
          subtitle="Najdi odpovědi na nejčastější otázky o power józe a lekcích"
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-sky-100 rounded-lg overflow-hidden hover:border-sky-300 transition-colors"
            >
              <summary className="cursor-pointer px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-colors">
                <h3 className="font-semibold text-sky-900 text-lg pr-4">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-sky-500 group-open:rotate-180 transition-transform text-xl">
                  ▼
                </span>
              </summary>
              <div className="px-6 py-4 text-sky-700 border-t border-sky-100 bg-sky-50/30">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold font-playfair mb-2">
            Máš další otázku?
          </h3>
          <p className="mb-6 opacity-90">
            Neváhej se ozvat! S radostí ti odpovím na cokoliv.
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg hover:bg-sky-50 transition-colors"
          >
            Kontaktuj mě
          </a>
        </div>
      </div>
    </section>
  );
}
