const credentials = [
  "Yoga Alliance 200h",
  "Power Yoga Diploma",
  "5+ let praxe",
  "Certifikovaná instruktorka",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-stone-950">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#292524_1px,transparent_1px),linear-gradient(to_bottom,#292524_1px,transparent_1px)] bg-[size:80px_80px] opacity-30 z-0"></div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-amber-500/4 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center min-h-screen pt-20 py-24">
        {/* Left side */}
        <div className="space-y-8">
          {/* Location tag */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-amber-400"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold">
              Power Jóga · Beroun
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-[1.05] font-playfair">
            Síla,
            <br />
            <span className="text-amber-400">plynulost</span>
            <br />a klid.
          </h1>

          <p className="text-stone-400 leading-relaxed max-w-lg text-lg">
            Plynulý pohyb, protažení a posílení celého těla v rytmu dechu.
            Lekce ti pomůže zpomalit, uvolnit napětí a zároveň nabrat energii.
          </p>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-2">
            {credentials.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 border border-stone-700 text-stone-400 text-xs uppercase tracking-wider font-medium hover:border-amber-400/50 hover:text-amber-400/80 transition-colors"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="https://power-joga-s-eliskou.reservio.com/booking"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-amber-400 text-stone-950 font-semibold hover:bg-amber-300 transition-all duration-200 text-center text-sm uppercase tracking-wide"
            >
              Rezervujte si lekci
            </a>
            <a
              href="#services"
              className="px-8 py-4 border border-stone-700 text-stone-300 hover:border-amber-400 hover:text-amber-400 transition-all font-semibold text-center text-sm uppercase tracking-wide"
            >
              Více informací
            </a>
          </div>

          {/* Pricing stats */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-stone-800">
            <div>
              <p className="text-3xl font-bold text-white font-playfair">
                170 Kč
              </p>
              <p className="text-stone-500 text-sm mt-1">První lekce</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-playfair">
                1800 Kč
              </p>
              <p className="text-stone-500 text-sm mt-1">Permanentka 10×</p>
            </div>
          </div>
        </div>

        {/* Right side — image with accent border */}
        <div className="relative hidden md:block">
          <div className="relative aspect-[4/5]">
            {/* Offset accent border */}
            <div className="absolute inset-0 border border-amber-400/20 -translate-x-4 translate-y-4 z-0"></div>

            {/* Image */}
            <div className="absolute inset-0 overflow-hidden z-10">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=750&fit=crop"
                alt="Eliška Radová — Power Yoga"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>
            </div>

            {/* Floating schedule card */}
            <div className="absolute -bottom-6 -left-6 bg-stone-900 border border-stone-800 p-5 z-20 shadow-2xl">
              <p className="text-amber-400 text-xs uppercase tracking-widest mb-1 font-semibold">
                Středa
              </p>
              <p className="text-white font-semibold text-lg font-playfair">
                19:45 – 20:45
              </p>
              <p className="text-stone-500 text-sm">Studio Yogaway, Beroun</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest text-stone-600">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-stone-600 to-transparent"></div>
      </div>
    </section>
  );
}
