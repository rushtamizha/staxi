"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = "918281674180";
  const message = "Hi Aventura! I'm looking for a premium Kerala tour package. Can you help me?";

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex items-center justify-center">
      {/* Dynamic Pulse Effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-20 h-20 bg-emerald-500 rounded-full"
      />

      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
        }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl transition-all border-4 border-white/20 backdrop-blur-sm"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={32} fill="currentColor" className="drop-shadow-md" />
        
        {/* Tooltip Label */}
        <span className="absolute right-20 px-4 py-2 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
          Chat with us
        </span>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;
