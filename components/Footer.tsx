"use client";

import { Github, Twitter, Mail } from 'lucide-react';
import { TextHoverEffect, FooterBackgroundGradient } from './hover-footer';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.3 });
  const [currentYear, setCurrentYear] = useState(2025);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Articles', href: '/articles' },
    { label: 'Chat', href: '/chat' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Tousif7401', label: 'GitHub' },
    { icon: Twitter, href: 'https://x.com/mohammed_t41990', label: 'Twitter' },
    { icon: Mail, href: 'mailto:calmify.devteam@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-[#101010]/10 relative h-fit rounded-3xl overflow-hidden m-8">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand Column */}
          <div className="flex flex-col -space-y-2">
            <div className="flex items-center -space-x-4 -ml-6">
              <div className="w-20 h-20">
                <svg
                  viewBox="0 0 300 300"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
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
              </div>
              <h3 className="text-2xl font-medium leading-none" style={{ color: '#E1E0CC' }}>
                Calmify AI
              </h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#DEDBC8' }}>
              A free AI-powered mental health companion for developers, builders, and creators.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6" style={{ color: '#DEDBC8' }}>
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{ color: '#999' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6" style={{ color: '#DEDBC8' }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Mail size={18} style={{ color: '#DEDBC8' }} />
                <Link
                  href="mailto:calmify.devteam@gmail.com"
                  className="text-sm transition-colors"
                  style={{ color: '#999' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                >
                  calmify.devteam@gmail.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6" style={{ color: '#DEDBC8' }}>
              Connect
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                    style={{ backgroundColor: '#212121' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DEDBC8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#212121'}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: '#E1E0CC' }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as SVGElement;
                        target.setAttribute('style', 'color: #000');
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as SVGElement;
                        target.setAttribute('style', 'color: #E1E0CC');
                      }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="border-t my-4" style={{ borderColor: '#333' }} />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 mt-1">
          {/* Social icons - duplicate for bottom row */}
          <div className="flex space-x-6">
            {socialLinks.map(({ icon, label, href }) => {
              const Icon = icon;
              return (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors"
                  style={{ color: '#666' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#DEDBC8'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                >
                  <Icon size={20} />
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left" style={{ color: '#666' }}>
            &copy; {currentYear} Calmify. Made with care for developers everywhere.
          </p>

          {/* Crisis notice */}
          <p className="text-center md:text-right text-xs" style={{ color: '#666' }}>
            Not a clinical service. For crises, please seek professional help.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div ref={footerRef} className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        {isInView && <TextHoverEffect text="Calmify" className="z-50" />}
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}
