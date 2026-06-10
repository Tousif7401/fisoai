"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const FullScreenSignup = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    setSubmitted(true);

    if (valid) {
      // Submission logic goes here
      console.log("Form submitted!");
      console.log("Email:", email);
      alert(isLogin ? "Welcome back to Calmify AI!" : "Welcome to Calmify AI!");
      setEmail("");
      setPassword("");
      setSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden p-4 relative">
      {/* Back Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 group flex items-center gap-2 rounded-full px-4 py-2 text-black font-medium text-sm transition-all hover:gap-3 z-50"
        style={{ backgroundColor: '#FFFFFF' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#999';
          const arrowCircle = e.currentTarget.querySelector('span');
          if (arrowCircle) {
            arrowCircle.setAttribute('style', 'background-color: #E1E0CC');
          }
          const arrowIcon = e.currentTarget.querySelector('svg');
          if (arrowIcon) {
            arrowIcon.setAttribute('style', 'color: #000');
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFFFF';
          const arrowCircle = e.currentTarget.querySelector('span');
          if (arrowCircle) {
            arrowCircle.setAttribute('style', 'background-color: #000');
          }
          const arrowIcon = e.currentTarget.querySelector('svg');
          if (arrowIcon) {
            arrowIcon.setAttribute('style', 'color: #E1E0CC');
          }
        }}
      >
        <span className="bg-black rounded-full w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform">
          <ArrowLeft className="w-3 h-3 text-[#E1E0CC]" strokeWidth={2} />
        </span>
        Back
      </button>

      <div className="w-full relative max-w-5xl overflow-hidden flex flex-col md:flex-row rounded-3xl backdrop-blur-xl border" style={{
        minHeight: '600px',
        background: 'rgba(16, 16, 16, 0.6)',
        borderColor: 'rgba(222, 219, 200, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(222, 219, 200, 0.05)'
      }}>
        {/* Video Section */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[600px] overflow-hidden bg-[#212121]">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260520_133010_cb9c806d-bc9d-47f1-ac4c-b1759134ec8b.mp4"
            onError={(e) => console.error('Video failed to load:', e)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content overlay on video */}
          <div className="absolute top-0 left-0 right-0 p-8 md:p-12 z-10">
            <h1 className="text-2xl md:text-3xl font-medium leading-tight tracking-tight relative" style={{ color: '#E1E0CC', fontWeight: 400 }}>
              Your moment of calm begins now.
            </h1>
          </div>
        </div>

        {/* Form Section */}
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
              <h2 className="text-3xl font-medium leading-none tracking-tight" style={{ color: '#E1E0CC' }}>
                {isLogin ? 'Welcome back ' : 'Welcome to Calmify AI'}
              </h2>
            </div>
            <p className="text-left opacity-80 -mt-4" style={{ color: '#DEDBC8' }}>
              {isLogin ? 'Sign in to continue your journey' : 'Start your mental wellness journey today'}
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <label htmlFor="email" className="block text-sm mb-2" style={{ color: '#DEDBC8' }}>
                Your email
              </label>
              <input
                type="email"
                id="email"
                placeholder="hello@example.com"
                className={`text-sm w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-1 bg-[#212121] text-[#E1E0CC] focus:ring-[#DEDBC8] border transition-colors ${
                  emailError ? "border-red-500" : "border-[#333]"
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!emailError}
                aria-describedby="email-error"
                style={{ color: '#E1E0CC' }}
              />
              {emailError && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {emailError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm mb-2" style={{ color: '#DEDBC8' }}>
                {isLogin ? 'Password' : 'Create password'}
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={`text-sm w-full py-3 px-4 rounded-xl focus:outline-none focus:ring-1 bg-[#212121] text-[#E1E0CC] focus:ring-[#DEDBC8] border transition-colors ${
                  passwordError ? "border-red-500" : "border-[#333]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
                style={{ color: '#E1E0CC' }}
              />
              {passwordError && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {passwordError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full font-medium py-3 px-4 rounded-xl transition-all hover:opacity-90"
              style={{ backgroundColor: '#DEDBC8', color: '#000' }}
            >
              {isLogin ? 'Sign in' : 'Create account'}
            </button>

            <div className="text-center text-sm" style={{ color: '#999' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium underline bg-transparent border-0 cursor-pointer"
                style={{ color: '#E1E0CC' }}
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
