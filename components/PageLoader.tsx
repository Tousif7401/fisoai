"use client";

import { useEffect, useState } from "react";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 2500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-[2500ms] ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        {/* Spinning Logo */}
        <svg
          className="w-24 h-24"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: "spin 3s linear infinite",
            transformOrigin: "center",
          }}
        >
          <g transform="translate(150,150)">
            <g fill="none" stroke="#E1E0CC" strokeLinecap="round">
              <g transform="rotate(0)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(45)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(90)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(135)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(180)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(225)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(270)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
              <g transform="rotate(315)">
                <path d="M0,-50 C6,-46 10,-41 12,-35" strokeWidth="2.2" />
                <path d="M12,-35 C15,-29 14,-23 12,-18" strokeWidth="1.6" />
                <path d="M12,-35 C17,-32 20,-27 20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C-6,-46 -10,-41 -12,-35" strokeWidth="2.2" />
                <path d="M-12,-35 C-15,-29 -14,-23 -12,-18" strokeWidth="1.6" />
                <path d="M-12,-35 C-17,-32 -20,-27 -20,-21" strokeWidth="1.2" />
                <path d="M0,-50 C0,-44 0,-40 0,-34" strokeWidth="2.0" />
                <path d="M0,-34 C4,-30 6,-25 6,-19" strokeWidth="1.4" />
                <path d="M0,-34 C-4,-30 -6,-25 -6,-19" strokeWidth="1.4" />
              </g>
            </g>
          </g>
        </svg>

        {/* Bouncing dots */}
        <div className="flex gap-2">
          <div
            className="w-2 h-2 rounded-full bg-[#E1E0CC]"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: "0s",
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[#E1E0CC]"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: "0.2s",
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-[#E1E0CC]"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: "0.4s",
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "#DEDBC8", marginTop: '5px' }}
        >
          Loading…
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          40% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
