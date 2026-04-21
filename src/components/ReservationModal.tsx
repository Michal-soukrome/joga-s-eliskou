"use client";
import { useReservation } from "@/context/ReservationContext";
import { useEffect } from "react";
import Container from "./Container";

export default function ReservationModal() {
  const { isOpen, closeModal } = useReservation();

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
      return;
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscapeKey, true);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey, true);
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center md:p-6"
      style={{ padding: "0", paddingTop: "0" }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md md:bg-black/60"
        onClick={closeModal}
        style={{ animation: "fadeIn 0.2s ease" }}
      />

      {/* Modal container */}
      <div
        className="relative z-10 w-full bg-white overflow-hidden flex flex-col md:rounded-2xl md:shadow-2xl"
        style={{
          maxWidth: "min(1100px, 98vw)",
          height: "100vh",
          maxHeight: "100vh",
          animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Header - responsive padding */}
        <div className="flex items-center justify-between px-6 border-b border-sky-100 bg-gradient-to-r from-sky-50 via-white to-sky-50 shrink-0 md:rounded-t-2xl h-20">
          <Container className="w-full h-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div>
                <span className="font-poppins text-xl font-bold text-sky-900 tracking-tight ">
                  Rezervace lekce
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
          </Container>
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
