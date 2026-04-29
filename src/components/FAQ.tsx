import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const faqs = [
  {
    question: "Je power jóga vhodná pro začátečníky?",
    answer:
      "Nabízím lekce pro všechny úrovně - začátečníky i pokročilé. Každá lekce je plně přizpůsobitelná tvé fyzické kondici.",
  },
  {
    question: "Jaké cvičební vybavení budu potřebovat?",
    answer:
      "Stačí pohodlné oblečení. Podložky i pomůcky jsou ve studiu k dispozici zdarma.",
  },

  {
    question: "Mohu přijít, pokud mám zranění nebo bolest?",
    answer:
      "Každý cvičí podle svých možností. V případě zranění nebo zdravotních omezení mi to prosím dej před lekcí vědět, abych mohla cviky upravit. Lekce není vhodná při akutním onemocnění ani v těhotenství.",
  },
  {
    question: "Jak se dostanu do studia?",
    answer:
      "Studio Yogaway je v Berouně na adrese Na Parkáně 367/14, hned za autorizačním servisem vozů ŠKODA. Auto si můžete zaparkovat na nedalekém parkovišti (po 18.hod je bezplatné), nebo využít autobus (zastávka U černého koně vzdálená asi 600 m).",
  },
  {
    question: "Mohu si koupit permanentku?",
    answer:
      "Ano! Permanentka 10× lekce se prodává za 1800 Kč. Má platnost 12 týdnů a můžeš si ji koupit na každé lekci.",
  },
  {
    question: "Mohu platit hotově nebo kartou?",
    answer: "Na lekcích je možné platit hotově nebo převodem přes QR kód.",
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-bl from-sky-50/50 via-white to-sky-100/50"
    >
      <Container size="4xl">
        <SectionTitle
          title="Často kladené otázky"
          subtitle="Najdi odpovědi na nejčastější otázky o power józe a lekcích"
        />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-sky-100 rounded-lg overflow-hidden hover:border-sky-300 hover:shadow-md transition-all duration-300"
            >
              <summary className="cursor-pointer px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition-all duration-200">
                <h3 className="font-semibold text-sky-900 text-base pr-4 group-hover:text-sky-700 transition-colors">
                  {faq.question}
                </h3>
                <span className="flex-shrink-0 text-sky-500 group-open:rotate-180 transition-transform text-xl">
                  ▼
                </span>
              </summary>
              <div className="px-6 py-4 text-sky-700 border-t border-sky-100 bg-gradient-to-br from-sky-50 to-sky-100/50">
                <p className="text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 rounded-lg p-8 text-white text-center shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300">
          <h3 className="text-2xl font-bold font-poppins mb-3">
            Máte další otázku?
          </h3>
          <p className="mb-6 text-lg opacity-95">
            Neváhejte se ozvat! S radostí odpovím na cokoliv.
          </p>
          <a href="#contact" className="!w-fit !mx-auto btn-secondary">
            Spojte se se mnou
          </a>
        </div>
      </Container>
    </section>
  );
}
