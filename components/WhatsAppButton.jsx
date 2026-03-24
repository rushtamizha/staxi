
"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber = "918760212345";
  const whatsappMessage = "Hi! I'd like to inquire about your services.";

  const actions = [
    {
      id: 'whatsapp',
      icon: <MessageCircle size={24} fill="currentColor" />,
      color: 'bg-[#25D366]',
      label: 'WhatsApp',
      onClick: () => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank'),
      delay: 0.1
    },
    {
      id: 'call',
      icon: <Phone size={24} fill="currentColor" />,
      color: 'bg-blue-500',
      label: 'Call Us',
      onClick: () => window.open(`tel:+${phoneNumber}`, '_self'),
      delay: 0.2
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-center">
      
      {/* Sub Buttons Area */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-4 mb-4">
            {actions.map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.5 }}
                transition={{ duration: 0.2, delay: action.delay }}
                className="relative flex items-center justify-center group"
              >
                {/* Side Label - Absolute positioned so it doesn't push the button */}
                <span className="absolute right-16 px-3 py-1 bg-white text-slate-800 text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-100 pointer-events-none">
                  {action.label}
                </span>
                
                {/* Action Button */}
                <button
                  onClick={action.onClick}
                  className={`${action.color} text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-110 active:scale-95 transition-transform border-2 border-white/20`}
                >
                  {action.icon}
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <div className="relative flex items-center justify-center">
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0, 0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute w-16 h-16 bg-emerald-400 rounded-full"
          />
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative z-10 w-16 h-16 flex items-center justify-center rounded-full shadow-2xl transition-colors duration-300 ${
            isOpen ? 'bg-slate-800' : 'bg-emerald-500'
          } text-white border-4 border-white/30`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default ContactButton;
