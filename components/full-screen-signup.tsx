"use client";

import { useState } from "react";
import { ArrowLeft, Github } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithOAuth } from "@/lib/supabase/auth";

export const FullScreenSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOAuthSignIn = async (provider: 'github' | 'google') => {
    setIsLoading(true);
    try {
      const { error } = await signInWithOAuth(provider);
      if (error) {
        console.error("OAuth error:", error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("OAuth error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden p-4 relative">
      <button
        onClick={() => router.push("/")}
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

      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row rounded-3xl backdrop-blur-xl border" style={{
        minHeight: "600px",
        background: "rgba(16, 16, 16, 0.6)",
        borderColor: "rgba(222, 219, 200, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(222, 219, 200, 0.05)"
      }}>
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[600px] overflow-hidden bg-[#212121]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => console.error('Video failed to load:', e)}
          >
            {/* Primary: CloudFront */}
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4"
              type="video/mp4"
            />
            {/* Fallback: Supabase */}
            <source
              src="https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/signup.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content overlay on video */}
          <div className="absolute top-0 left-0 right-0 p-8 md:p-12 z-10">
            <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight relative" style={{ color: '#E1E0CC', fontWeight: 400 }}>
              Your moment of calm begins now.
            </h1>
          </div>
        </div>

        <div className="p-8 md:p-12 md:w-1/2 flex flex-col bg-black relative">
          <div className="flex flex-col items-left mb-8">
            <div className="mb-4 flex items-center -space-x-3 -ml-[30px]">
              <div className="w-20 h-20">
                <svg
                  viewBox="0 0 300 300"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <g transform="translate(150,150)">
                    <g fill="none" stroke="#DEDBC8" strokeLinecap="round">
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
              </div>
              <h2 className="text-3xl font-medium leading-none tracking-tight" style={{ color: "#E1E0CC" }}>
                Welcome to Calmify AI
              </h2>
            </div>
            <p className="text-left opacity-80 -mt-4" style={{ color: "#DEDBC8" }}>
              Start your mental wellness journey today
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => handleOAuthSignIn("github")}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white text-sm font-medium transition-all hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#333" }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = "#444";
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = "#333";
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <button
              onClick={() => handleOAuthSignIn("google")}
              disabled={isLoading}
              className="group w-full flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white text-sm font-medium transition-all hover:gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#333" }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = "#444";
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = "#333";
              }}
            >
              <svg className="w-4 h-4" viewBox="00 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {isLoading ? "Redirecting..." : "Continue with Google"}
            </button>
          </div>

          {/* Simple footer message */}
          <div className="text-center text-sm" style={{ color: "rgba(222, 219, 200, 0.5)" }}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
};
