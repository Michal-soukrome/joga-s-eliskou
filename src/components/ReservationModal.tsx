"use client";

import { useReservation } from "@/context/ReservationContext";
import { useEffect } from "react";

export default function ReservationModal() {
  const { isOpen, closeModal } = useReservation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sky-100 bg-gradient-to-r from-sky-50 to-sky-100">
          <h2 className="text-2xl font-bold text-sky-900 font-poppins">
            Rezervace lekce
          </h2>
          <button
            onClick={closeModal}
            className="text-sky-600 hover:text-sky-900 transition-colors p-2 hover:bg-sky-200 rounded-lg"
          >
            <svg
              className="w-6 h-6"
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

        {/* Iframe container */}
        <div className="flex-1 overflow-auto">
          <iframe
            src="https://power-joga-s-eliskou.reservio.com"
            width="100%"
            height="100%"
            frameBorder="0"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
