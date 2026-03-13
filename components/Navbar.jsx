"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Car } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "Why Us", href: "#whyus" },
  { name: "Tariffs", href: "#tariffs" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map((link) => link.name.toLowerCase());
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 300) {
            setActiveSection(
              section.charAt(0).toUpperCase() + section.slice(1),
            );
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div
          className={`relative flex items-center justify-between transition-all duration-500 px-6 py-2 rounded-2xl border ${
            scrolled
              ? "bg-black/90 backdrop-blur-md border-white/10 shadow-2xl shadow-black/50"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo with Green Accent */}
          <div className="flex items-center gap-3 group cursor-pointer">
            {/* Logo Container with Premium Glow */}
            <div className="relative w-20 h-20  rounded-xl    group-hover:scale-105 transition-all duration-500 ">
              <Image
                src="/logo.jpg"
                alt="STAXI Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Typography with Emerald Accent */}
  
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative group py-2"
                onClick={() => setActiveSection(link.name)}
              >
                <span
                  className={`text-[11px] uppercase tracking-widest font-black transition-colors ${
                    activeSection === link.name
                      ? "text-[#22C55E]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </span>
                {activeSection === link.name && (
                  <motion.div
                    layoutId="nav-mover"
                    className="absolute -bottom-0.5 left-0 w-full h-1 bg-[#22C55E] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Call to Action - High Vis Green */}
          <div className="hidden md:block">
            <a
              href="tel:+918760212345"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-tighter bg-[#22C55E] text-white shadow-lg shadow-green-500/20 transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
            >
              <Phone size={14} fill="currentColor" /> Call Now
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-xl bg-[#22C55E] text-white shadow-lg shadow-green-500/30"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (Dark Theme) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 inset-x-6 bg-[#111] border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:hidden flex flex-col gap-2"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  setActiveSection(link.name);
                }}
                className={`text-sm font-black uppercase tracking-widest p-4 rounded-2xl transition-all ${
                  activeSection === link.name
                    ? "bg-[#22C55E] text-white"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="h-[1px] bg-white/10 my-2" />
            <a
              href="tel:+918760212345"
              className="w-full bg-[#22C55E] text-white text-center py-5 rounded-2xl font-black text-lg tracking-tighter shadow-lg shadow-green-500/20"
            >
              BOOK VIA CALL
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
