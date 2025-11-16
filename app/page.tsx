'use client';

import { Stethoscope, DollarSign, Zap, Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
              Fill <span className="text-blue-600">Any Shift</span><br />in <span className="text-red-600">&lt;24 Hours</span>
            </h1>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl">
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <Zap className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-xl">AI Matching</h3>
              <p className="text-gray-600">Perfect fit in 60 seconds</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <Clock className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-xl">48hr Credentialing</h3>
              <p className="text-gray-600">License → DEA → Malpractice verified</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="text-4xl font-black text-green-600 mb-1">98%</div>
              <h3 className="font-bold text-xl">Fill Rate</h3>
              <p className="text-gray-600">Never cancel a shift again</p>
            </motion.div>
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

