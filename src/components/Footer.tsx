export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-500 py-14 px-6 border-t border-stone-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-px h-7 bg-amber-400"></div>
              <span className="font-playfair text-xl font-bold text-white">
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
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-5">
              Navigace
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#services"
                  className="hover:text-amber-400 transition-colors"
                >
                  Lekce & Programy
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="hover:text-amber-400 transition-colors"
                >
                  Ohlasy
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-amber-400 transition-colors"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold mb-5">
              Sledujte
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-400 transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <p>&copy; {currentYear} Eliška Radová — Studio Yogaway, Beroun</p>
          <p>IČO: 24528480</p>
        </div>
      </div>
    </footer>
  );
}
