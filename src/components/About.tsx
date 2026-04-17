import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";

const CredentialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    certification: (
      <svg
        className="w-6 h-6 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54-3.96 4.36-1.29-1.5c-.42-.49-1.14-.63-1.74-.35-.6.28-.87.95-.67 1.58l2.58 6.58c.19.52.71.86 1.3.86s1.1-.34 1.29-.86l5.34-6.78c.2-.63-.07-1.3-.67-1.58-.6-.28-1.32-.14-1.74.35z" />
      </svg>
    ),
    strength: (
      <svg
        className="w-6 h-6 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14 6l-3.5 5 2.5 3.5-2.5 3.5 3.5 5h4l3.5-5-2.5-3.5 2.5-3.5-3.5-5h-4z" />
      </svg>
    ),
    learning: (
      <svg
        className="w-6 h-6 text-sky-600"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200 mb-3">
      {icons[type]}
    </div>
  );
};

export default function About() {
  return (
    <section className="py-24 px-6 bg-gradient-to-tr from-sky-50 via-white to-sky-100">
      <Container>
        <SectionTitle
          title="O Elišce"
          subtitle="Cesta k autentičnosti, síle a vnitřnímu míru"
        />

        <div>
          {/* Left: Story */}
          <div className="space-y-6">
            <div className="prose prose-sky max-w-none">
              <h3 className="text-2xl font-bold text-sky-900 font-playfair mb-4">
                Proč power jóga?
              </h3>
              <p className="text-sky-700 leading-relaxed mb-4">
                Power józe se věnuji více než 5 let. Moje cesta začala osobním
                hledáním rovnováhy mezi náročným životem a vnitřním pokojem.
                Zjistila jsem, že power jóga není jen cvičení — je to
                transformativní práce s tělem, dechem a myslí.
              </p>
              <p className="text-sky-700 leading-relaxed mb-4">
                S diplomem z Yoga Alliance a pokročilým školením v power józe se
                věnuji tomu, aby každý student cítil sílu a flexibilitu, kterou
                v sobě má. Moje lekce jsou dynamické, personalizované a naplněné
                vědomím.
              </p>
              <p className="text-sky-700 leading-relaxed">
                Věřím, že jóga není o dokonalosti — je o cestě, akceptaci a
                sebeobjevování.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-sky-200">
              <div>
                <p className="text-3xl font-bold text-sky-600 font-playfair">
                  5+
                </p>
                <p className="text-sm text-sky-600">Let praxe</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-600 font-playfair">
                  200+
                </p>
                <p className="text-sm text-sky-600">Absolventů</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-600 font-playfair">
                  100%
                </p>
                <p className="text-sm text-sky-600">Spokojenosti</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
