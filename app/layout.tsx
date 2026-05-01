import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Faiz Zuberi — Product Designer',
    template: '%s — Faiz Zuberi',
  },
  description:
    'Product designer with 12+ years of experience across brand and product, from tech to ice cream.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Faiz Zuberi',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
