
"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";
import heroBg from "@/public/bag.jpg";
import { 
  CheckCircle2
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-30 pb-16 overflow-hidden scroll-mt-20"
    >
      {/* High Contrast Background */}
      <div className="absolute inset-0">
        <Image
          src={heroBg}
          alt="Taxi Service Background"
          fill
          priority
          className="object-cover"
        />
        {/* Darker overlay to make green text pop */}
        <div className="absolute inset-0 bg-black/75 mix-blend-multiply" />
      </div>

      <div className="container mx-auto relative z-10 px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white"
          >
            {/* Green Badge */}
            <span className="inline-block px-4 py-1.5 rounded-lg bg-[#22C55E] text-white text-xs font-black uppercase tracking-tighter mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              🚕 Intercity Specialists
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-6 tracking-tighter uppercase">
              Premium <br />
              <span className="text-[#22C55E]">One Way</span> <br />
              Taxi Service
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-lg leading-relaxed mb-8 font-medium">
              Elite fleet at budget prices. Door-to-door pickup across South India with 100% transparent billing.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {["24/7 Service", "Zero Cancellation", "Verified Drivers", "Clean AC Cabs"].map(
                (tag) => (
                  <span key={tag} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#22C55E]/90">
                    <CheckCircle2 size={14} className="text-[#22C55E]" />
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <div className="flex justify-center lg:justify-end">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;