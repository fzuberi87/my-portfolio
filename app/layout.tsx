import type { Metadata } from 'next';
import { Inter, EB_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  weight: ['400'],   // EB Garamond's lightest available — maps to Waldenburg 300
  style: ['normal', 'italic'],
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
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-el-canvas dark:bg-el-dark text-el-ink dark:text-el-on-dark transition-colors duration-200">
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
