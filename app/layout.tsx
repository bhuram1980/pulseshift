import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PulseShift.health — AI Locum Staffing in Texas | <24hr Fills',
  description: 'AI-powered locum tenens staffing for hospitals in Texas. Post a shift, get verified MDs, NPs, PAs in <24 hours. 98% fill rate.',
  keywords: 'locum tenens Texas, locum staffing, physician staffing, CRNA jobs, emergency physician Texas',
  openGraph: {
    title: 'PulseShift.health — Never Miss a Shift',
    description: 'AI matches verified locums to your open shifts in <24 hours.',
    url: 'https://pulseshift.health',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    "name": "PulseShift",
    "url": "https://pulseshift.com"
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

