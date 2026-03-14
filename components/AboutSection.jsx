"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Trophy, Users, Route, Calendar } from 'lucide-react';

const STATS = [
  { label: "Happy Customers", value: "1000+", icon: <Users size={20} /> },
  { label: "Successful Drops", value: "2600+", icon: <Route size={20} /> },
  { label: "Years Experience", value: "5+", icon: <Calendar size={20} /> },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image & Experience Badge */}
          <div className="relative">
            <div className="relative rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-2xl h-[500px] md:h-[600px]">
              {/* THE FAMILY IMAGE */}
              <Image 
                src="/family.png" 
                alt="Happy Family traveling with STAXI"
                fill
                className="object-cover"
                priority
              />
              
              {/* Branding Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute bottom-8 left-8 z-20">
                  <p className="text-[#135984] font-black text-5xl italic tracking-tighter leading-none">STAXI</p>
                  <p className="text-white font-bold uppercase tracking-widest text-xs mt-1">Premium Oneway Taxi</p>
              </div>
            </div>
            
            {/* Experience Floating Card */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-6 -right-4 md:-right-6 bg-[#135984] p-8 rounded-[2.5rem] text-white  z-30"
            >
              <Trophy size={32} className="mb-4 text-white/80" />
              <p className="text-4xl font-black leading-none">5+</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">Years of Excellence</p>
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[#135984] font-black uppercase tracking-[0.2em] text-xs mb-4 block"
              >
                About STAXI Oneway Taxi
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] uppercase tracking-tighter mb-6"
              >
                Hassle-Free Rides, <br />
                <span className="text-[#135984]">One Way</span> at a Time
              </motion.h2>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                At STAXI Oneway Taxi, we are dedicated to providing reliable, comfortable, and cost-effective one-way taxi services across Tamil Nadu. We ensure that you <strong>only pay for the distance you travel</strong>.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Transparency & No Hidden Charges",
                "Well-Maintained Premium Fleet",
                "Professional & Verified Drivers",
                "24/7 Customer Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-50 p-1.5 rounded-full">
                    <CheckCircle2 className="text-[#135984]" size={18} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 py-8 border-y border-slate-100">
              {STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[#135984]">{stat.icon}</span>
                    <span className="text-3xl font-black text-slate-900 italic">{stat.value}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</span>
                </div>
              ))}
            </div>

            <button className="bg-black hover:bg-[#135984] text-white py-5 px-10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10">
              Know More About Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
