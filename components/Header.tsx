'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const RESUME_URL =
  'https://drive.google.com/file/d/1AQcIBOBFekYLvCIaES_BljntPMIeLQT3/view?usp=sharing';

const navLinks = [
  { href: '/about',        label: 'About' },
  { href: '/',             label: 'Work' },
  { href: '/experiments',  label: 'Experiments' },
  { href: 'mailto:faiz.zuberi@gmail.com', label: 'Contact', external: true },
  { href: RESUME_URL,      label: 'Resume', external: true },
];

export function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-[#e5e5e5] dark:border-runway-border'
          : 'bg-white dark:bg-black border-b border-[#e5e5e5] dark:border-runway-border'
      }`}
    >
      <nav className="max-w-content mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Profile — avatar + name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Avatar circle — swap src to /avatar.jpg once you add your photo */}
          <div className="w-9 h-9 rounded-full bg-[#d9d9d9] dark:bg-runway-surface overflow-hidden flex items-center justify-center flex-shrink-0">
            {/* Replace this div with <img src="/avatar.jpg" className="w-full h-full object-cover" alt="Faiz Zuberi" /> once you have a photo */}
            <span className="text-[11px] font-semibold text-[#525252] dark:text-runway-slate select-none">
              FZ
            </span>
          </div>
          <span className="text-[16px] font-semibold text-black dark:text-white tracking-tight group-hover:opacity-60 transition-opacity duration-200">
            Faiz Zuberi
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-7">
          {navLinks.map(({ href, label, external }) => {
            const isActive = !external && pathname === href;
            if (external) {
              return (
                <a
                  key={label}
                  href={href}
                  target={label === 'Resume' ? '_blank' : undefined}
                  rel={label === 'Resume' ? 'noopener noreferrer' : undefined}
                  className="text-[16px] text-[#525252] dark:text-runway-slate hover:text-black dark:hover:text-white transition-colors duration-200"
                >
                  {label}
                </a>
              );
            }
            return (
              <Link
                key={href}
                href={href}
                className={`text-[16px] transition-colors duration-200 ${
                  isActive
                    ? 'text-black dark:text-white font-medium'
                    : 'text-[#525252] dark:text-runway-slate hover:text-black dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-[#525252] dark:text-runway-slate hover:text-black dark:hover:text-white transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3.5 h-px bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-[#e5e5e5] dark:border-runway-border px-6 py-5 flex flex-col gap-4">
          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target={label === 'Resume' ? '_blank' : undefined}
                rel={label === 'Resume' ? 'noopener noreferrer' : undefined}
                className="text-sm text-[#525252] dark:text-runway-slate hover:text-black dark:hover:text-white transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="text-sm text-[#525252] dark:text-runway-slate hover:text-black dark:hover:text-white transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
