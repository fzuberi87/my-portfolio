import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio – UX Designer',
    template: '%s – Portfolio',
  },
  description:
    'Senior UX Designer crafting intuitive digital products and thoughtful user experiences.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'UX Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
