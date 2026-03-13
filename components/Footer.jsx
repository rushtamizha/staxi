"use client";
import React from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Car,
  ArrowRight,
  ShieldCheck,
  Clock,
  Headphones,
  ExternalLink,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] pt-24 pb-12 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-white/5 mb-16">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-all">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-tighter italic">
                Safe Journeys
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Verified Drivers & GPS Tracking
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-all">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-tighter italic">
                24/7 Availability
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Book anytime, anywhere in TN
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white transition-all">
              <Headphones size={24} />
            </div>
            <div>
              <p className="text-white font-black uppercase tracking-tighter italic">
                Premium Support
              </p>
              <p className="text-slate-500 text-xs font-medium">
                Dedicated helpdesk for all rides
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="relative w-20 h-15  rounded-xl    group-hover:scale-105 transition-all duration-500 ">
                          <Image
                            src="/logo.jpg"
                            alt="STAXI Logo"
                            fill
                            className="object-cover"
                            priority
                          />
                        </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tamil Nadu's premier one-way taxi specialists. Dedicated to
              providing transparent, safe, and comfortable intercity travel
              solutions.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#22C55E] hover:text-white transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Home", "WhyUs", "Tariffs", "Services", "About"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-slate-500 text-sm font-bold hover:text-[#22C55E] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={12}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Contact Us
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="text-[#22C55E] shrink-0" size={18} />
                <span className="text-slate-400 text-sm font-medium">
                  Al Jami Groups
124 Mgr Bus Stand 
Mattuthavani Bus Stand 
<br />
                  Madurai - 625007
                </span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-[#22C55E] shrink-0" size={18} />
                <span className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                  <a href="tel:+91XXXXXXXXXX">+91 8760212345</a>
                </span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-[#22C55E] shrink-0" size={18} />
                <span className="text-slate-400 text-sm font-medium hover:text-white transition-colors">
                  <a href="mailto:support@staxi.com">staxi.madurai@gmail.com</a>
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: App CTA */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Mobile Experience
            </h4>
            <p className="text-slate-500 text-xs mb-6 font-medium leading-relaxed">
              Book your ride in under 60 seconds with our optimized customer
              app.
            </p>
            <button className="w-full bg-white/5 border border-white/10 text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all">
              App Store Soon
            </button>
            <button className="w-full mt-3 bg-[#22C55E] text-white p-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
              Play Store Soon
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              © {currentYear} STAXI ONEWAY TAXI. ALL RIGHTS RESERVED.
            </p>
            {/* Developer Credit */}
            <a
              href="https://wepzite.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#22C55E] transition-colors group"
            >
              Developed by{" "}
              <span className="text-yellow-300 group-hover:text-[#22C55E]">
                wepzite.in
              </span>
              <ExternalLink size={10} className="opacity-50" />
            </a>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
