"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Map, Smartphone, BadgePercent, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    title: "No Hidden Charges",
    desc: "What you see is what you pay. No extra tolls or surcharges hidden in fine print.",
    icon: <ShieldCheck className="text-[#489cc2]" size={32} />,
  },
  {
    title: "All Tamil Nadu Coverage",
    desc: "From Chennai to Kanyakumari, we cover every corner of the state with ease.",
    icon: <Map className="text-[#489cc2]" size={32} />,
  },
  {
    title: "Smart Booking Website",
    desc: "Dedicated apps for customers and drivers for real-time tracking and updates.",
    icon: <Smartphone className="text-[#489cc2]" size={32} />,
  },
  {
    title: "Budget-Friendly Fares",
    desc: "Save up to 40% on intercity travel with our dedicated one-way pricing model.",
    icon: <BadgePercent className="text-[#489cc2]" size={32} />,
  },
];

const WhyChooseUs = () => {
  return (
    <section id="whyus" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
      
      <div className="container mx-auto px-6 relative z-1">
        <div className="flex flex-col md:flex-row justify-between  mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#489cc2] font-black uppercase tracking-[0.2em] text-xs mb-4 block"
            >
              The Gold Standard of Travel
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-slate-900 leading-none uppercase tracking-tighter"
            >
              Why Choose <br />
              <span className="text-[#489cc2]">STAXI Oneway Taxi</span>
            </motion.h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm">
            Welcome to S One Way Drop Taxi, your trusted partner for safe and affordable intercity travel across Tamil Nadu. We specialize in one-way taxi services that help you travel comfortably without paying for a return fare.
Whether you are traveling for business, family trips, or airport transfers, our professional drivers and well-maintained vehicles ensure a smooth and comfortable journey every time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-black transition-all duration-500"
            >
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-400 transition-colors">
                {feature.desc}
              </p>

            </motion.div>
          ))}
        </div>

        {/* Action Callouts */}
        
      </div>
    </section>
  );
};

export default WhyChooseUs;
