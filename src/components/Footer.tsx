import Container from "@/components/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-tl from-sky-50/50 via-white to-sky-100/50 text-sky-600 py-14 px-6 border-t border-sky-100">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-px h-7 bg-amber-400"></div>
              <span className="font-playfair text-xl font-bold text-sky-800">
                Eliška <span className="text-amber-400">Radová</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Certifikovaná instruktorka power jógy v Berouně. Lekce pro
              začátečníky i mírně pokročilé — síla, plynulost a klid v jednom
              pohybu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-300 font-semibold mb-5">
              Navigace
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-sky-100 transition-all duration-200 hover:translate-x-1"
                >
                  Lekce & Programy
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-sky-100 transition-all duration-200 hover:translate-x-1"
                >
                  Ohlasy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-sky-100 transition-all duration-200 hover:translate-x-1"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-200 font-semibold mb-5">
              Sledujte
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-sky-100 transition-all duration-200 hover:translate-x-1"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-sky-100 transition-all duration-200 hover:translate-x-1"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-sky-600">
          <p>&copy; {currentYear} Eliška Radová — Studio Yogaway, Beroun</p>
          <p>IČO: 24528480</p>
        </div>
      </Container>
    </footer>
  );
}
