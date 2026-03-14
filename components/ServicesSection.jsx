
"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  MoveRight,
  MapPin,
  Globe,
  RotateCcw,
  PlaneTakeoff,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    title: "Oneway Trips",
    desc: "Only pay for the distance you travel. Our dedicated drop taxi service eliminates the burden of return fares.",
    icon: <MapPin size={24} />,
    tag: "Most Popular",
  },
  {
    title: "Outstation Trips",
    desc: "Seamless intercity travel for business or vacations. Comfortable long-distance journeys across South India.",
    icon: <Globe size={24} />,
    tag: "Intercity",
  },
  {
    title: "Round Trip",
    desc: "Need to come back? Enjoy a hassle-free return journey with transparent multi-day pricing models.",
    icon: <RotateCcw size={24} />,
    tag: "Best Value",
  },
  {
    title: "Airport Taxi",
    desc: "Punctual pickups and drops. We track your flight to ensure you're never late for your departure or arrival.",
    icon: <PlaneTakeoff size={24} />,
    tag: "24/7 Service",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between  mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-[#489cc2] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 block"
            >
              Our Services
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black text-slate-900 leading-[0.95] uppercase tracking-tighter"
            >
              Tailored <br />
              <span className="text-[#489cc2]">Travel Solutions</span>
            </motion.h2>
          </div>
          <p className="text-slate-500 font-medium max-w-xs text-sm md:text-base">
            We provide clean vehicles, experienced drivers, and transparent pricing with no hidden charges. Customer satisfaction and safety are our top priorities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 transition-all duration-500 hover:bg-black hover:border-[#489cc2]/50 "
            >
              <div className="absolute top-6 right-8">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-[#489cc2]">
                  {service.tag}
                </span>
              </div>

              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#22C55E] mb-6 md:mb-8 group-hover:bg-[#489cc2] group-hover:text-white transition-all duration-500 shadow-inner">
                {service.icon}
              </div>

              <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase italic tracking-tighter mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-8 group-hover:text-slate-400">
                {service.desc}
              </p>

              <div className="flex items-center justify-between border-t border-slate-50 pt-6 group-hover:border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#489cc2]">
                  Book Now
                </span>
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#489cc2] group-hover:bg-[#489cc2] transition-all duration-500">
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner with /family.png */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-8 md:mt-12 bg-black rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 shadow-2xl min-h-[100px] md:min-h-[300px]"
        >
          {/* BACKGROUND IMAGE LAYER */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/family.png" // Direct path is more reliable in Next.js public folder
              alt="Happy Family Trip"
              fill
              className="object-cover object-center md:object-right opacity-60"
              priority
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 md:via-black/60 to-transparent z-10" />
          </div>

          {/* CONTENT LAYER */}
          <div className="relative z-20 text-center md:text-left max-w-md">
            <h4 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              Planning a <br className="hidden md:block" /> long trip?
            </h4>
            <p className="text-slate-300 font-medium text-sm md:text-base">
              Get a custom quote for corporate or multi-day travel with our premium fleet.
            </p>
          </div>

          <div className="relative z-20 w-full md:w-auto">
            <button 
              onClick={() => window.open('https://wa.me/918760212345?text=Hi STAXI, I want to plan a long trip.', '_blank')}
              className="bg-[#489cc2] text-white px-8 md:px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 w-full md:w-auto "
            >
              Contact Support <MoveRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
