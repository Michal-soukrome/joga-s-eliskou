"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReservationContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined,
);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ReservationContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}
