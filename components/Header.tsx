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
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-runway-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-[15px] font-medium tracking-tight hover:text-runway-muted transition-colors duration-200"
        >
          Your Name
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm transition-colors duration-200 ${
                pathname === href
                  ? 'text-white'
                  : 'text-runway-slate hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:hello@yourname.com"
            className="text-sm font-medium px-4 py-2 rounded bg-white text-black hover:bg-runway-muted transition-colors duration-200"
          >
            Say hello
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-2 text-runway-slate hover:text-white transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span className="block w-3.5 h-px bg-current" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-black/95 backdrop-blur-xl border-b border-runway-border px-6 py-5 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-runway-slate hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <a
            href="mailto:hello@yourname.com"
            className="text-sm text-white hover:text-runway-muted transition-colors"
          >
            hello@yourname.com
          </a>
        </div>
      )}
    </header>
  );
}
