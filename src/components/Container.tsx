import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  size?: "7xl" | "4xl" | "2xl" | "xl" | "sm" | "none";
  className?: string;
}

export default function Container({
  children,
  size = "7xl",
  className = "",
}: ContainerProps) {
  const sizeClasses = {
    "7xl": "max-w-7xl",
    "4xl": "max-w-4xl",
    "2xl": "max-w-2xl",
    xl: "max-w-lg",
    sm: "max-w-sm",
    none: "max-w-none",
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto ${className}`}>
      {children}
    </div>
  );
}
