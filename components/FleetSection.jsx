"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Users, Gauge, Info } from 'lucide-react';
import Image from 'next/image';

const FLEET = [
  {
    name: "Sedan",
    models: "Wagon R , Swift, Dzire, Amaze",
    price: "13",
    bata: "400",
    seats: "4",
    image: "/seeden.png", // Replace with your image path
    color: "from-blue-500/10 to-transparent"
  },
  {
    name: "SUV",
    models: "Marazzo, Xylo",
    price: "19",
    bata: "400",
    seats: "6",
    image: "/suv.png", // Replace with your image path
    color: "from-blue-500/20 to-transparent"
  },
  {
    name: "MUV",
    models: "Innova Crysta",
    price: "20",
    bata: "400",
    seats: "7",
    image: "/muv.png", // Replace with your image path
    color: "from-blue-600/30 to-transparent"
  }
];

const FleetSection = () => {
  return (
    <section id="tariffs" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#489cc2] font-black uppercase tracking-[0.3em] text-xs"
          >
            Get the Best Offers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter mt-2"
          >
            Our <span className="text-[#489cc2]">Tariffs</span>
          </motion.h2>
        </div>

        {/* Fleet Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {FLEET.map((car, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              {/* Price Tag Overlay */}
              <div className="absolute top-6 right-6 z-2">
                <div className="bg-black text-white px-4 py-2 rounded-2xl flex flex-col items-center shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#489cc2]">Starting</span>
                  <span className="text-xl font-black italic">₹{car.price}<span className="text-xs">/km</span></span>
                </div>
              </div>

              {/* Image Area */}
              <div className={`relative h-64 bg-gradient-to-b ${car.color} flex items-center justify-center p-8`}>
                <div className="absolute inset-0 bg-[url('/seeden.png')] opacity-5" />
                {/* Car Image Placeholder */}
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2">
                   <div className="w-full h-full bg-slate-200/50 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
                      <p className="text-slate-400 font-bold text-xs">CAR IMAGE ({car.name})</p>
                   </div>
                   <Image src={car.image} alt={car.name} fill className="object-contain" /> 
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">{car.name}</h3>
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-wide">{car.models}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-[#489cc2] shadow-sm">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Capacity</p>
                      <p className="text-sm font-black text-slate-900">{car.seats} Seats</p>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg text-[#489cc2] shadow-sm">
                      <Gauge size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase">Driver Bata</p>
                      <p className="text-sm font-black text-slate-900">₹{car.bata}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <a 
                    href="tel:+918760212345"
                    className="flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#489cc2] transition-all active:scale-95 shadow-lg"
                  >
                    <Phone size={14} fill="currentColor" /> Phone
                  </a>
                  <a 
                    href="https://wa.me/918760212345"
                    className="flex items-center justify-center gap-2 bg-[#489cc2] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg"
                  >
                    <MessageCircle size={14} fill="currentColor" /> Whatsapp
                  </a>
                </div>

                <p className="mt-4 text-[10px] text-center text-slate-400 font-medium flex items-center justify-center gap-1">
                  <Info size={10} /> Minimum 100km / 250km per day logic applies.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSection;
