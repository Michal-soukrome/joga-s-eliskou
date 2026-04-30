"use client";

import Container from "@/components/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-sky-50/50 via-white to-sky-100/50 text-sky-600 py-14 px-6 border-t border-sky-100">
      <Container>
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-px h-7 bg-sky-500"></div>
              <span className="font-poppins text-xl font-bold text-sky-900 tracking-tight">
                Power jóga s <span className="text-sky-500">Eliškou</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Certifikovaná instruktorka power jógy v Berouně. Lekce pro
              začátečníky i mírně pokročilé - síla, mobilita a dech v jednom
              pohybu.
            </p>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky-400 font-semibold mb-5">
              sociální sítě
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/e.radova99/"
                  className="hover:underline transition-all duration-200 hover:translate-x-1 flex items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="0.5"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61572048573388"
                  className="hover:underline transition-all duration-200 hover:translate-x-1 flex items-center gap-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                    fill="currentColor"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sky-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-sky-600">
          <p>&copy; {currentYear} Eliška Radová</p>
          <div className="flex items-center gap-4">
            <p>IČO: 24528480</p>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("cookieConsent:open"));
                }
              }}
              className="text-sky-600 hover:text-sky-900 underline transition-colors duration-200"
            >
              Nastavení cookies
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
