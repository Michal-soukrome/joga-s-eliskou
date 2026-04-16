export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-sky-200 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-px h-7 bg-sky-500"></div>
          <span className="font-playfair text-xl font-bold text-sky-900 tracking-tight">
            Eliška <span className="text-sky-500">Radová</span>
          </span>
        </div>
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <a
              href="#services"
              className="text-sky-600 hover:text-sky-900 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              Lekce
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-sky-600 hover:text-sky-900 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              Ohlasy
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="px-5 py-2 bg-sky-600 text-white hover:bg-sky-700 transition-all text-xs uppercase tracking-[0.2em] font-medium"
            >
              Rezervovat
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
