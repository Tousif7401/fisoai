"use client";

import ArticleBentoGrid from "@/components/ui/bento-articles";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageLoader } from "@/components/PageLoader";
import { useState } from "react";

export default function ArticlesPage() {
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);

  const handleBack = () => {
    setShowLoader(true);
    // Navigate after a delay to let the loader animation be visible
    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  if (showLoader) {
    return <PageLoader onComplete={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-noise opacity-80 pointer-events-none"
        style={{ backgroundImage: 'url(/Article_BG.jpg)' }}
      />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 group flex items-center gap-2 rounded-full px-4 py-2 text-black font-medium text-sm transition-all hover:gap-3 z-50"
        style={{ backgroundColor: "#FFFFFF" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#999";
          const arrowCircle = e.currentTarget.querySelector("span");
          if (arrowCircle) {
            arrowCircle.setAttribute("style", "background-color: #E1E0CC");
          }
          const arrowIcon = e.currentTarget.querySelector("svg");
          if (arrowIcon) {
            arrowIcon.setAttribute("style", "color: #000");
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#FFFFFF";
          const arrowCircle = e.currentTarget.querySelector("span");
          if (arrowCircle) {
            arrowCircle.setAttribute("style", "background-color: #000");
          }
          const arrowIcon = e.currentTarget.querySelector("svg");
          if (arrowIcon) {
            arrowIcon.setAttribute("style", "color: #E1E0CC");
          }
        }}
      >
        <span className="bg-black rounded-full w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform">
          <ArrowLeft className="w-3 h-3 text-[#E1E0CC]" strokeWidth={2} />
        </span>
        Back
      </button>

      <ArticleBentoGrid />
    </div>
  );
}
