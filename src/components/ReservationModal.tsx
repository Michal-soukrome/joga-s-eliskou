"use client";
import { useReservation } from "@/context/ReservationContext";
import { useEffect } from "react";

export default function ReservationModal() {
  const { isOpen, closeModal } = useReservation();

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey, true);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey, true);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ padding: "clamp(8px, 2vw, 24px)" }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={closeModal}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Modal container */}
      <div
        className="relative z-10 w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{
          maxWidth: "min(1100px, 98vw)",
          height: "min(92vh, 900px)",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 shrink-0">
          <div className="flex items-center gap-3">
            <div>
              <h5
                className="text-xl font-bold text-sky-900 leading-tight "
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Rezervace lekce
              </h5>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in new tab */}
            <a
              href="https://power-joga-s-eliskou.reservio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sky-500 hover:text-sky-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Otevřít v nové záložce
            </a>

            <div className="w-px h-5 bg-sky-100" />

            {/* Close button */}
            <button
              onClick={closeModal}
              aria-label="Zavřít"
              className="flex items-center justify-center w-9 h-9 text-sky-400 hover:text-sky-800 hover:bg-sky-100 rounded-xl transition-all duration-150"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Iframe container */}
        <div className="flex-1 min-h-0 bg-gray-50">
          <iframe
            src="https://power-joga-s-eliskou.reservio.com"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full"
            title="Rezervace lekce"
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
