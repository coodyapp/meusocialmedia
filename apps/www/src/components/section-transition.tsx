import type React from "react";

interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SectionTransition({ children, className = "" }: SectionTransitionProps) {
  return <div className={className}>{children}</div>;
}
