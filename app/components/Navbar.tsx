'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="PulseShift.health" width={180} height={40} />
        </Link>
        <div className="hidden md:flex gap-6 font-medium">
          <Link href="/facility" className="hover:text-blue-600">For Hospitals</Link>
          <Link href="/provider" className="hover:text-blue-600">For Providers</Link>
          <Link href="/#contact" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Contact</Link>
        </div>
        <button 
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-6 py-4 flex flex-col gap-4">
            <Link href="/facility" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>For Hospitals</Link>
            <Link href="/provider" className="py-2 hover:text-blue-600" onClick={() => setMobileMenuOpen(false)}>For Providers</Link>
            <Link href="/#contact" className="py-2 text-blue-600 font-semibold" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

