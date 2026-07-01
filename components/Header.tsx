"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleArticlesClick = () => {
    setMobileMenuOpen(false);

    if (pathname === '/') {
      // On home page, scroll to articles section
      const articlesSection = document.getElementById('articles');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages, navigate to articles page
      router.push('/articles');
    }
  };

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/articles', label: 'Articles', isScrollLink: true },
    { href: '/chat', label: 'Chat' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.svg" alt="Calmify AI" className="w-16 h-16 brightness-0 invert" />
            <span className="text-[#E1E0CC] font-medium -ml-3 pl-0">Calmify AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.isScrollLink ? (
                <button
                  key={item.href}
                  onClick={handleArticlesClick}
                  className="text-sm transition-colors text-gray-400 hover:text-[#DEDBC8] cursor-pointer bg-transparent border-0"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition-colors ${
                    pathname === item.href
                      ? 'text-[#E1E0CC]'
                      : 'text-gray-400 hover:text-[#DEDBC8]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#DEDBC8]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            {navItems.map((item) => (
              item.isScrollLink ? (
                <button
                  key={item.href}
                  onClick={handleArticlesClick}
                  className="block w-full text-left py-3 text-sm transition-colors text-gray-400 hover:text-[#DEDBC8] cursor-pointer bg-transparent border-0"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block py-3 text-sm transition-colors ${
                    pathname === item.href
                      ? 'text-[#E1E0CC]'
                      : 'text-gray-400 hover:text-[#DEDBC8]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
