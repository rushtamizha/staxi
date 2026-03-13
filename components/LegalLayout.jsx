"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ShieldCheck, Fingerprint } from 'lucide-react';
import Link from 'next/link';

const LegalLayout = ({ title, lastUpdated, children, icon }) => {
  return (
    <main className="bg-[#050505] min-h-screen text-slate-300 selection:bg-[#22C55E] selection:text-black">
      {/* Hero Header */}
      <header className="relative pt-32 pb-20 border-b border-white/5">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #22C55E 1px, transparent 0)", backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-[#22C55E] font-black uppercase tracking-[0.3em] text-[10px] mb-12 hover:gap-4 transition-all duration-300">
            <ArrowLeft size={14} /> Back to Interface
          </Link>
          
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
               <div className="bg-[#22C55E]/10 p-3 rounded-2xl text-[#22C55E] border border-[#22C55E]/20 backdrop-blur-xl">
                  {icon}
               </div>
               <span className="text-[#22C55E] font-black uppercase tracking-[0.4em] text-[10px]">Security Protocols</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-8"
            >
              {title}
            </motion.h1>

            <div className="flex items-center gap-6 text-slate-500">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#22C55E]" />
                <span className="uppercase tracking-widest text-[9px] font-bold">Updated {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#22C55E]" />
                <span className="uppercase tracking-widest text-[9px] font-bold">Verified Document</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Table of Contents - Sticky Desktop Sidebar */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-32 space-y-4">
                <div className="h-[1px] w-12 bg-[#22C55E] mb-8" />
                <p className="text-white font-black uppercase tracking-widest text-xs italic mb-4">On this page</p>
                <nav className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                  <a href="#collect" className="text-[#22C55E] hover:text-white transition-colors">01. Data Collection</a>
                  <a href="#location" className="text-slate-600 hover:text-[#22C55E] transition-colors">02. Geo-Spatial Use</a>
                  <a href="#security" className="text-slate-600 hover:text-[#22C55E] transition-colors">03. Encryption Standards</a>
                  <a href="#cookies" className="text-slate-600 hover:text-[#22C55E] transition-colors">04. Session Tracking</a>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="space-y-20"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <div className="py-20 border-t border-white/5 text-center">
        <Fingerprint className="mx-auto text-[#22C55E]/20 mb-4" size={40} />
        <p className="text-slate-600 font-black uppercase tracking-[0.5em] text-[8px]">End of Document — STAXI Intelligence</p>
      </div>
    </main>
  );
};

export default LegalLayout;