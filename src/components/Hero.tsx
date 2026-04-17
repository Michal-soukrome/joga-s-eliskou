const credentials = ["Certifikovaná instruktorka"];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-100">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe_1px,transparent_1px)] bg-[size:80px_80px] opacity-60 z-0"></div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 right-0 w-[700px] h-[700px] bg-sky-300/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 -left-32 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center min-h-screen pt-20 py-24">
        {/* Left side */}
        <div className="space-y-8">
          {/* Location tag */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-sky-500"></div>
            <span className="text-xs uppercase tracking-[0.3em] text-sky-500 font-semibold">
              Power Jóga · Beroun
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold text-sky-900 leading-[1.05] font-playfair">
            Síla,
            <br />
            <span className="text-sky-500">plynulost</span>
            <br />a klid.
          </h1>

          <p className="text-sky-700 leading-relaxed max-w-lg text-lg">
            Plynulý pohyb, protažení a posílení celého těla v rytmu dechu. Lekce
            ti pomůže zpomalit, uvolnit napětí a zároveň nabrat energii.
          </p>

          {/* Credential badges */}
          <div className="flex flex-wrap gap-2">
            {credentials.map((badge) => (
              <span
                key={badge}
                className="px-3 py-1.5 border border-sky-200 text-sky-600 text-xs uppercase tracking-wider font-medium bg-white hover:border-sky-400 hover:text-sky-800 transition-colors"
              >
                ✓ {badge}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a href="#reservations" className="btn-primary text-center">
              Rezervujte si lekci
            </a>
            <a href="#services" className="btn-outline text-center">
              Více informací
            </a>
          </div>
        </div>

        {/* Right side — image with accent border */}
        <div className="relative hidden md:block">
          <div className="relative aspect-[4/5]">
            {/* Offset accent border with shadow */}
            <div className="absolute inset-0 border border-sky-200 -translate-x-4 translate-y-4 z-0 shadow-xl shadow-sky-500/20"></div>

            {/* Image */}
            <div className="absolute inset-0 overflow-hidden z-10 shadow-2xl shadow-sky-400/30">
              <img
                src="/assets/eliska.jpg"
                alt="Eliška Radová — Power Yoga"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-200/30 via-transparent to-transparent"></div>
            </div>

            {/* Floating schedule card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-sky-200 p-5 z-20 shadow-2xl shadow-sky-300/40">
              <p className="text-sky-500 text-xs uppercase tracking-widest mb-1 font-semibold">
                Každou středu
              </p>
              <p className="text-sky-900 font-semibold text-lg font-playfair">
                19:45 – 20:45
              </p>
              <p className="text-sky-500 text-sm">Studio Yogaway, Beroun</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
