export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800/60 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-px h-7 bg-amber-400"></div>
          <span className="font-playfair text-xl font-bold text-white tracking-tight">
            Eliška{" "}
            <span className="text-amber-400">Radová</span>
          </span>
        </div>
        <ul className="hidden md:flex items-center gap-10">
          <li>
            <a
              href="#services"
              className="text-stone-400 hover:text-amber-400 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              Lekce
            </a>
          </li>
          <li>
            <a
              href="#testimonials"
              className="text-stone-400 hover:text-amber-400 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
            >
              Ohlasy
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="px-5 py-2 border border-amber-400/60 text-amber-400 hover:bg-amber-400 hover:text-stone-950 transition-all text-xs uppercase tracking-[0.2em] font-medium"
            >
              Rezervovat
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
