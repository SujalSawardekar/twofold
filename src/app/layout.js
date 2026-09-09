import { Playfair_Display, Inter } from 'next/font/google';
import SmoothScrollProvider from '@/providers/SmoothScrollProvider';
import SoundEffectsProvider from '@/providers/SoundEffectsProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SoundToggle from '@/components/common/SoundToggle';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-display-fallback',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body-fallback',
  display: 'swap',
});

export const metadata = {
  title: 'Twofold — Manufacturing Quality Paper Stationery for the World',
  description: 'Twofold is an Indian manufacturer and exporter of notebooks and paper stationery. A decade of manufacturing experience. Three decades of paper trade heritage. Your dependable partner for notebook sourcing.',
  keywords: 'notebook manufacturer, paper stationery, exercise books, spiral bound, exporter, B2B stationery, India manufacturer, JNPT export',
  openGraph: {
    title: 'Twofold — Manufacturing Quality Paper Stationery for the World',
    description: 'Indian manufacturer and exporter of notebooks and paper stationery for distributors, wholesalers, and stationery brands worldwide.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Twofold',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SoundEffectsProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <SoundToggle />
          </SmoothScrollProvider>
        </SoundEffectsProvider>
      </body>
    </html>
  );
}
