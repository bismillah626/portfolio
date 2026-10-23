"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="route-content">
      <span key={pathname} className="route-progress" aria-hidden="true" />
      {children}
    </div>
  );
}
