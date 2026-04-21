import SectionTitle from "@/components/SectionTitle";
import Container from "@/components/Container";
import Image from "next/image";

const chapters = [
  {
    label: "Můj začátek",
    text: `Vystudovala jsem Vysokou školu chemicko-technologickou v Praze. Po škole jsem nastoupila do Všeobecné fakultní nemocnice, kde působím dodnes. Na VŠ jsem začala navštěvovat lekce jógy — ze začátku jen jako protažení těla, zklidnění mysli. Na lekci se mi líbilo, že věnujete čas sami sobě a zanechávalo to ve mně krásně hřejivý pocit.`,
  },
  {
    label: "Hledání stylu",
    text: `Vystřídala jsem hodně stylů - od zdravotních lekcí, přes hatha jógu, až po dynamické lekce jako vinyasa nebo power jóga. Postupem času jsem zjistila, že ač moje átman prahne po dynamice, ve spoustě případů nacházím útěchu právě v pomalé jemné flow.`,
  },
  {
    label: "Lektorský kurz",
    text: `Zvědavost a potřeba prohloubit znalosti mě přivedly k lektorskému kurzu s akreditací MŠMT, který jsem absolvovala v Domě jógy v Praze. Kromě nového přátelství jsem získala velmi cenné informace a zkušenosti, které se snažím aplikovat do svých lekcí.`,
  },
  {
    label: "Moje lekce",
    text: `Cílem mých hodin je najít si chvilku sám pro sebe, oprostit se od vnějšího světa a časem prohlubovat vlastní možnosti. Lekce má jasnou strukturu: začínáme naladěním na dech, pokračujeme rozehřátím, dynamickou částí ve stoje, prací se středem těla a rovnováhou. Uzavíráme šavásanou — hlubokou relaxací. Na závěr ráda pracuji s jemnou aromaterapií nebo zpívanými mantrami.`,
  },
];

const credentials = [
  { label: "Akreditace MŠMT", sub: "Dům jógy, Praha" },
  { label: "Power & Vinyasa", sub: "Specializace" },
  { label: "Aromaterapie", sub: "Součást praxe" },
  { label: "Pranajáma", sub: "Ukázka dechových technik" },
  {
    label: "Adjustmenty",
    sub: "Jemné vedení těla pro správné nastavení v ásanách.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 py-16 md:py-24 px-6 bg-gradient-to-tr from-sky-50/50 via-white to-sky-100/50"
    >
      <Container>
        <SectionTitle title="O mně" />
        <div className="mt-16 grid lg:grid-cols-[1fr_340px] gap-16 items-start">
          {/* ── Left: editorial prose with chapter markers ── */}
          <div className="space-y-0">
            <blockquote className="border-l-2 border-sky-300 pl-6 mb-12">
              <p className="text-sky-800 text-xl leading-relaxed font-poppins italic font-medium">
                „Jóga je pro mě cesta k sobě samé. Čas, kdy se můžu zastavit a
                být tady a teď.&quot;
              </p>
            </blockquote>

            <div className="space-y-10">
              {chapters.map((ch, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center pt-1 shrink-0">
                    <div className="w-7 h-7 rounded-full border border-sky-200 bg-sky-50 flex items-center justify-center text-sky-500 text-xs font-semibold font-poppins group-hover:bg-sky-100 group-hover:border-sky-300 transition-colors" />
                    {i < chapters.length - 1 && (
                      <div className="w-px flex-1 mt-2 bg-gradient-to-b from-sky-200 to-transparent" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-sky-400 font-semibold font-poppins mb-2">
                      {ch.label}
                    </p>
                    <p className="text-sky-700 leading-relaxed text-[15px]">
                      {ch.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pl-[52px] pt-2">
              <p className="text-sky-600 text-sm leading-relaxed">
                <span className="font-semibold text-sky-800">
                  Jóga je pro každého!
                </span>{" "}
                Vítám pokročilé jogíny i úplné začátečníky — vše ráda ukážu a
                vysvětlím. Po domluvě nabízím také individuální lekce.
              </p>
              <p className="mt-6 text-sky-800 font-semibold font-poppins">
                Těším se na Vás,{" "}
                <span className="text-amber-500">Namasté 🙏</span>
              </p>
            </div>
          </div>

          {/* ── Right: sticky sidebar ── */}
          <aside className="lg:sticky lg:top-28 space-y-4">
            {/* ── Trainer image ── */}
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-sky-50 border border-sky-100 shadow-sm shadow-sky-100/50">
              <Image
                src="/assets/IMG_0001.webp"
                alt="Eliška Radová - instruktorka jógy"
                fill
                className="object-cover object-top"
                sizes="340px"
                priority
              />

              {/* Subtle gradient overlay at bottom for name tag */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-sky-950/40 to-transparent rounded-b-2xl" />

              {/* Name tag */}
              <div className="absolute bottom-4 left-4 right-4">
                <h1 className="text-white font-semibold font-poppins text-sm leading-none">
                  Eliška Radová
                </h1>
                <p className="text-white/70 text-xs mt-1 font-poppins">
                  Certifikovaná instruktorka jógy
                </p>
              </div>
            </div>

            {/* ── Credential card ── */}
            <div className="bg-white border border-sky-100 rounded-2xl p-6 shadow-sm shadow-sky-100/50">
              <div className="space-y-2">
                {credentials.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/60 hover:bg-sky-50 transition-colors"
                  >
                    <span className="mt-0.5 text-sky-400 text-sm">✓</span>
                    <div>
                      <p className="text-sky-800 text-sm font-semibold font-poppins leading-none">
                        {c.label}
                      </p>
                      <p className="text-sky-400 text-xs mt-1 font-poppins">
                        {c.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
