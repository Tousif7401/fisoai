"use client";

import { PageLoader } from "@/components/PageLoader";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading screen disabled for now */}
      {/* {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />} */}
      {children}
    </>
  );
}
