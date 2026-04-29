'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const navLinks = [
    { href: '/', label: 'Case Studies' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-gray-100/80 shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-gray-900 font-semibold text-[15px] tracking-tight hover:opacity-60 transition-opacity duration-200"
        >
          Your Name
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors duration-200 ${
                pathname === href
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:hello@yourname.com"
            className="text-sm font-medium px-4 py-2 rounded-full bg-gray-950 text-white hover:bg-gray-700 transition-colors duration-200"
          >
            Say hello
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-3.5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 px-6 py-5 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:hello@yourname.com"
            className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
          >
            hello@yourname.com
          </a>
        </div>
      )}
    </header>
  );
}
