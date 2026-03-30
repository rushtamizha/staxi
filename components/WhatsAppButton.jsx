
"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';

const ContactButton = () => {
  const phoneNumber = "918760212345";
  const whatsappMessage = "Hi! I'd like to inquire about your services.";

  const actions = [
    {
      id: 'whatsapp',
      icon: <MessageCircle size={24} fill="currentColor" />,
      color: 'bg-[#25D366]',
      label: 'WhatsApp',
      onClick: () => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank'),
    },
    {
      id: 'call',
      icon: <Phone size={24} fill="currentColor" />,
      color: 'bg-blue-500',
      label: 'Call Us',
      onClick: () => window.open(`tel:+${phoneNumber}`, '_self'),
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-3">
      {actions.map((action, index) => (
        <div key={action.id} className="relative flex items-center justify-center group">
          {/* Label on Hover */}
          <span className="absolute right-16 px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
            {action.label}
          </span>
          
          {/* Pulse Effect only for the bottom button (index 1) to grab attention */}
          {index === 1 && (
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute w-14 h-14 ${action.color} rounded-full -z-10`}
            />
          )}

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={action.onClick}
            className={`${action.color} text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl border-2 border-white/20`}
          >
            {action.icon}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default ContactButton;
