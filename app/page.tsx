'use client';

import { Stethoscope, DollarSign, Zap, Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600">
          <div 
            className="absolute inset-0 bg-cover bg-center brightness-50"
            style={{ backgroundImage: "url('/hero-doctor.jpg')" }}
          ></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black leading-tight">
              Fill <span className="text-blue-400">Any Shift</span> in <span className="text-red-400">&lt;24 Hours</span>
            </h1>
            <p className="text-xl text-gray-200 mt-4 max-w-2xl">
              1,000+ verified MDs, NPs, PAs, CRNAs — Texas & nationwide
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/facility" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition">
                <Stethoscope className="w-5 h-5" /> Need Staff?
              </Link>
              <Link href="/provider" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition">
                <DollarSign className="w-5 h-5" /> Want Shifts?
              </Link>
            </div>
          </motion.div>

          {/* TRUST METRICS */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center border border-white/20">
              <Zap className="w-10 h-10 text-blue-400 mx-auto mb-3" />
              <h3 className="font-bold text-xl text-white">AI Matching</h3>
              <p className="text-gray-200">Perfect fit in 60 seconds</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center border border-white/20">
              <Clock className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <h3 className="font-bold text-xl text-white">48hr Credentialing</h3>
              <p className="text-gray-200">License → DEA → Malpractice verified</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-lg text-center border border-white/20">
              <div className="text-4xl font-black text-green-400 mb-1">98%</div>
              <h3 className="font-bold text-xl text-white">Fill Rate</h3>
              <p className="text-gray-200">Never cancel a shift again</p>
            </motion.div>
          </div>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg border border-white/20">
              <span className="text-white font-semibold text-sm">NALTO Member</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg border border-white/20">
              <span className="text-white font-semibold text-sm">HIPAA Compliant</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-6 py-3 rounded-lg border border-white/20">
              <span className="text-white font-semibold text-sm">Joint Commission</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE TICKER */}
      <div className="bg-slate-900 text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm">
          <span className="mx-6">Dr. Kim accepted $3,200/day ER shift in Houston</span>
          <span className="mx-6">Psych NP placed in 47 mins in Dallas</span>
          <span className="mx-6">CRNA shift filled at $4,100/day in Austin</span>
        </div>
      </div>
    </>
  );
}

