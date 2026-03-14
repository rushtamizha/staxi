"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, UserCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const REVIEWS = [
  {
    name: "Arjun Vidhu",
    role: "Business Traveler",
    text: "Best one-way service in Tamil Nadu. The driver was professional, and the Innova was spotless. No hidden charges as promised!",
    rating: 5
  },
  {
    name: "Priya Lakshmi",
    role: "Family Trip",
    text: "Booked a Sedan from Chennai to Madurai. Very affordable compared to other drop taxis. The app booking process was seamless.",
    rating: 5
  },
  {
    name: "Senthil Kumar",
    role: "Regular Client",
    text: "I use STAXI for all my intercity trips now. Their 24/7 support is actually helpful and the drivers are very punctual.",
    rating: 5
  },
  {
    name: "Rajesh Kannan",
    role: "Airport Drop",
    text: "Reliable and safe. I never have to worry about catching my flights. Highly recommended for long-distance travels.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between  mb-16 gap-6">
          <div className="max-w-xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#489cc2] font-black uppercase tracking-[0.3em] text-xs mb-4 block"
            >
              Voice of Our Clients
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-slate-900 leading-none uppercase tracking-tighter"
            >
              Real Stories <br />
              <span className="text-[#489cc2]">Real Comfort</span>
            </motion.h2>
          </div>
        </div>

        {/* Swiper Container */}
        <div className="relative pb-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonial-swiper !pb-16"
          >
            {REVIEWS.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="bg-black p-8 rounded-[2.5rem] h-full flex flex-col justify-between border border-white/5 relative group transition-all duration-500 hover:border-[#489cc2]/30">
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-8 right-8 text-[#489cc2]/10 group-hover:text-[#489cc2]/20 transition-colors">
                    <Quote size={60} fill="currentColor" />
                  </div>

                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-[#489cc2]" fill="#489cc2" />
                      ))}
                    </div>

                    <p className="text-slate-300 text-lg font-medium leading-relaxed italic mb-8 relative z-10">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="bg-[#489cc2] p-2 rounded-xl text-white">
                      <UserCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-black uppercase tracking-tighter italic">{review.name}</h4>
                      <p className="text-[#489cc2] text-[10px] font-black uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination-bullet {
          background: #489cc2;
          opacity: 1;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #489cc2 !important;
          width: 24px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
