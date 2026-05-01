'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const RESUME_URL =
  'https://drive.google.com/file/d/1AQcIBOBFekYLvCIaES_BljntPMIeLQT3/view?usp=sharing';

const navLinks = [
  { href: '/about',       label: 'About' },
  { href: '/',            label: 'Work' },
  { href: '/experiments', label: 'Experiments' },
  { href: 'mailto:faiz.zuberi@gmail.com', label: 'Contact', external: true },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
          ? 'bg-el-canvas/90 dark:bg-el-dark/90 backdrop-blur-xl border-b border-el-hairline dark:border-el-hairline/20'
          : 'bg-el-canvas dark:bg-el-dark border-b border-el-hairline dark:border-el-hairline/20'
      }`}
    >
      <nav className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
        {/* Profile — avatar + name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-el-strong dark:bg-el-dark-elevated overflow-hidden flex items-center justify-center flex-shrink-0">
            {/* Replace with <img src="/avatar.jpg" className="w-full h-full object-cover" alt="Faiz Zuberi" /> */}
            <span className="text-[11px] font-semibold text-el-muted select-none">FZ</span>
          </div>
          <span className="text-[15px] font-semibold text-el-ink dark:text-el-on-dark tracking-tight group-hover:opacity-60 transition-opacity duration-200">
            Faiz Zuberi
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-7">
          {navLinks.map(({ href, label, external }) => {
            const isActive = !external && pathname === href;
            if (external) {
              return (
                <a key={label} href={href}
                  className="text-[15px] font-medium text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors duration-200">
                  {label}
                </a>
              );
            }
            return (
              <Link key={href} href={href}
                className={`text-[15px] font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-el-ink dark:text-el-on-dark'
                    : 'text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark'
                }`}>
                {label}
              </Link>
            );
          })}

          {/* Resume pill CTA */}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center h-10 px-5 rounded-pill bg-el-primary dark:bg-el-on-dark text-white dark:text-el-ink text-[15px] font-medium hover:bg-el-ink dark:hover:bg-el-strong transition-colors duration-200">
            Resume
          </a>

          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-el-muted hover:text-el-ink dark:hover:text-el-on-dark transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu">
            <span className="block w-5 h-px bg-current mb-1.5" />
            <span className="block w-3.5 h-px bg-current" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-el-canvas/95 dark:bg-el-dark/95 backdrop-blur-xl border-b border-el-hairline dark:border-el-hairline/20 px-6 py-5 flex flex-col gap-4">
          {navLinks.map(({ href, label, external }) =>
            external ? (
              <a key={label} href={href}
                className="text-[15px] font-medium text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors">
                {label}
              </a>
            ) : (
              <Link key={href} href={href}
                className="text-[15px] font-medium text-el-muted dark:text-el-on-dark-soft hover:text-el-ink dark:hover:text-el-on-dark transition-colors">
                {label}
              </Link>
            )
          )}
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex w-fit items-center h-10 px-5 rounded-pill bg-el-primary text-white text-[15px] font-medium">
            Resume
          </a>
        </div>
      )}
    </header>
  );
}
