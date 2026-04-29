"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtmLoaded?: boolean;
  }
}

const GTM_ID = "GTM-M2GXC4N2";
const CONSENT_KEY = "cookieConsent";

function loadGtm() {
  if (typeof window === "undefined" || window.gtmLoaded) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);

  window.gtmLoaded = true;
}

function storeConsent(value: "accepted" | "rejected") {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
    document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=${31536000}; samesite=lax`;
  } catch (error) {
    console.warn("Cookie consent storage failed", error);
  }
}

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      setConsent("accepted");
      loadGtm();
    } else if (stored === "rejected") {
      setConsent("rejected");
    }

    const onOpenBanner = () => setConsent(null);
    window.addEventListener("cookieConsent:open", onOpenBanner);

    return () => window.removeEventListener("cookieConsent:open", onOpenBanner);
  }, []);

  const handleAccept = () => {
    setConsent("accepted");
    storeConsent("accepted");
    loadGtm();
  };

  const handleReject = () => {
    setConsent("rejected");
    storeConsent("rejected");
  };

  if (consent !== null) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-sky-200 bg-white/95 p-5 shadow-2xl shadow-sky-200/40 backdrop-blur-md ring-1 ring-sky-100 sm:inset-x-8 lg:bottom-6 max-w-2xl">
      <div className="flex flex-col gap-4 ">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600 font-semibold font-poppins">
            Souhlas s cookies
          </p>
          <p className="mt-2 text-sm leading-6 text-sky-900">
            Odsouhlasením cookies mi dovolíš sledovat návštěvnost přes Google
            Analytics. Děkuji!
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleAccept}
            className="btn-secondary"
          >
            Povolit analytiku
          </button>
          <button type="button" onClick={handleReject} className="btn-outline">
            Pouze nezbytné
          </button>
        </div>
      </div>
    </div>
  );
}
