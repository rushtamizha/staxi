"use client";
import React, { useState, useRef, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  CalendarDays,
  Clock,
  MessageCircle,
  X,
  AlertTriangle,
  ChevronRight,
  Info,
  User,
  Phone,
} from "lucide-react";

const LIBRARIES = ["places"];

const PRICING_DATA = {
  ONE_WAY: {
    SEDAN: { slab1: 950, slab2: 16, slab3: 14, bata: 400, platform: 20, name: "Sedan" },
    MUV: { slab1: 1250, slab2: 22, slab3: 19, bata: 400, platform: 20, name: "MUV" },
    SUV: { slab1: 1300, slab2: 23, slab3: 20, bata: 400, platform: 20, name: "SUV" },
  },
  ROUND_TRIP: {
    SEDAN: { minKmPerDay: 250, extra: 13, bata: 400, platform: 0, name: "Sedan" },
    MUV: { minKmPerDay: 250, extra: 17, bata: 400, platform: 0, name: "MUV" },
    SUV: { minKmPerDay: 250, extra: 18, bata: 400, platform: 0, name: "SUV" },
  },
};

const BookingForm = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    time: "",
    tripType: "ONE_WAY",
    carType: "SEDAN",
  });

  const [distance, setDistance] = useState(0);
  const [days, setDays] = useState(1);
  const [timeError, setTimeError] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const originRef = useRef();
  const destRef = useRef();

  useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000 + 1);
    const hours = String(oneHourLater.getHours()).padStart(2, "0");
    const minutes = String(oneHourLater.getMinutes()).padStart(2, "0");
    const defaultTime = `${hours}:${minutes}`;

    if (!formData.startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: now.toISOString().split("T")[0],
        time: defaultTime,
      }));
    }

    if (formData.startDate && formData.time) {
      const selectedDateTime = new Date(`${formData.startDate}T${formData.time}`);
      const bufferTime = new Date(now.getTime() + 60 * 60 * 1000);
      const isToday = now.toDateString() === selectedDateTime.toDateString();
      setTimeError(isToday && selectedDateTime < bufferTime);
    }
  }, [formData.startDate, formData.time]);

  useEffect(() => {
    if (formData.startDate && formData.endDate && formData.tripType === "ROUND_TRIP") {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays > 0 ? diffDays : 1);
    } else {
      setDays(1);
    }
  }, [formData.startDate, formData.endDate, formData.tripType]);

  // --- CALCULATION ENGINE ---
  const config = PRICING_DATA[formData.tripType][formData.carType];
  let totalAmount = 0;
  let baseFare = 0;
  let extraFare = 0;
  let totalBata = config.bata * days;
  let platformFee = config.platform || 0;

  if (formData.tripType === "ONE_WAY") {
    if (distance <= 50) {
      baseFare = config.slab1;
    } else if (distance <= 100) {
      baseFare = distance * config.slab2;
    } else {
      baseFare = distance * config.slab3;
    }
    totalAmount = baseFare + totalBata + platformFee;
  } else {
    const totalTravelDist = distance * 2;
    const minKmApplied = days * config.minKmPerDay;
    const extraKm = Math.max(0, totalTravelDist - minKmApplied);
    baseFare = minKmApplied * config.extra;
    extraFare = extraKm * config.extra;
    totalAmount = baseFare + extraFare + totalBata;
  }

  const handleCalculate = () => {
    if (!originRef.current.value || !destRef.current.value || !formData.phone || !formData.startDate || !formData.time) {
      alert("Please fill all details correctly.");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [originRef.current.value],
        destinations: [destRef.current.value],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          setDistance(Math.round(response.rows[0].elements[0].distance.value / 1000));
          setShowReceipt(true);
        }
      }
    );
  };

  const sendWhatsApp = () => {
    const text = `*🚕 STAXI BOOKING REQUEST*%0A---%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Trip:* ${formData.tripType}%0A*Car:* ${config.name}%0A*From:* ${originRef.current.value}%0A*To:* ${destRef.current.value}%0A*Pickup:* ${formData.startDate} @ ${formData.time}%0A*Duration:* ${days} Day(s)%0A*Total Est. KM:* ${formData.tripType === "ROUND_TRIP" ? distance * 2 : distance}km%0A---%0A*TOTAL FARE: ₹${totalAmount}*`;
    window.open(`https://wa.me/918760212345?text=${text}`, "_blank");
  };

  if (!isLoaded) return <div className="p-10 text-center font-black text-[#135984] tracking-tighter">BOOTING STAXI ENGINE...</div>;

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2.5rem] p-1 shadow-2xl border-b-[12px] border-[#135984] overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            {["ONE_WAY", "ROUND_TRIP"].map((t) => (
              <button key={t} onClick={() => setFormData({ ...formData, tripType: t })} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${formData.tripType === t ? "bg-black text-[#489cc2] shadow-lg" : "text-slate-400"}`}>
                {t.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input type="text" placeholder="Name" className="input-premium pl-12" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input type="tel" placeholder="Phone" className="input-premium pl-12" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>

            <Autocomplete>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#489cc2]" size={16} />
                <input ref={originRef} placeholder="Pickup City" className="input-premium pl-12" />
              </div>
            </Autocomplete>
            <Autocomplete>
              <div className="relative">
                <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" size={16} />
                <input ref={destRef} placeholder="Drop City" className="input-premium pl-12" />
              </div>
            </Autocomplete>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="label-style">Pickup Date</span>
                <input type="date" min={new Date().toISOString().split("T")[0]} className="input-date-premium" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
              </div>
              <div className="relative">
                <span className="label-style">Pickup Time</span>
                <input type="time" value={formData.time} className={`input-date-premium ${timeError ? "border-red-500 bg-red-50 text-red-600 animate-pulse" : ""}`} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
              </div>
            </div>

            {formData.tripType === "ROUND_TRIP" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                <span className="label-style">Return Date</span>
                <input type="date" min={formData.startDate} className="input-date-premium" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3 pt-2">
              {["SEDAN", "MUV", "SUV"].map((c) => (
                <button key={c} onClick={() => setFormData({ ...formData, carType: c })} className={`py-4 rounded-2xl border-2 flex flex-col items-center transition-all ${formData.carType === c ? "border-[#489cc2] bg-[#489cc2] " : "border-slate-100"}`}>
                  <span className={`text-[11px] font-black ${formData.carType === c ? "text-black" : "text-slate-400"}`}>{c}</span>
                  <span className="text-[8px] font-bold text-white mt-1">
                    {formData.tripType === "ONE_WAY" ? "Best Slab" : `₹${PRICING_DATA.ROUND_TRIP[c].extra}/KM`}
                  </span>
                </button>
              ))}
            </div>

            <button onClick={handleCalculate} className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 bg-[#135984] text-white hover:bg-[#489cc2] active:scale-95">
              Calculate Fare <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 backdrop-blur-md">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReceipt(false)} className="absolute inset-0 bg-black/80" />
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative bg-white w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border-2 border-[#489cc2] flex flex-col max-h-[92vh]">
              <div className="bg-[#489cc2] px-5 py-3 text-black flex justify-between items-center">
                <div>
                  <div className="bg-black text-white px-1.5 py-0.5 rounded text-[7px] font-black uppercase mb-0.5 inline-block">STAXI Estimate</div>
                  <h4 className="text-lg font-black italic tracking-tighter leading-none">BOOKING DETAILS</h4>
                </div>
                <button onClick={() => setShowReceipt(false)} className="p-1 hover:bg-black/10 rounded-full"><X size={20} /></button>
              </div>

              <div className="p-5 space-y-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Duration</span>
                    <span className="text-xs font-black text-black">{days} Day(s)</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-black text-slate-400 uppercase">Total Dist.</span>
                    <span className="text-xs font-black text-[#489cc2]">{formData.tripType === "ROUND_TRIP" ? distance * 2 : distance} KM</span>
                  </div>
                </div>

                <div className="space-y-2.5 px-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold uppercase text-slate-500 italic">Base Fare</span>
                    <span className="font-black text-black">₹{baseFare}</span>
                  </div>
                  {extraFare > 0 && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold uppercase text-slate-500 italic">Extra Usage</span>
                      <span className="font-black text-black">₹{extraFare}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="font-bold uppercase text-slate-500 italic">Driver Bata</span>
                    <span className="font-black text-black">₹{totalBata}</span>
                  </div>
                  {platformFee > 0 && (
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-bold uppercase text-slate-500 italic">Platform Fee</span>
                      <span className="font-black text-black">₹{platformFee}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-black uppercase italic text-black">Total</span>
                    <span className="text-2xl font-black text-[#489cc2]">₹{totalAmount}</span>
                  </div>
                </div>

                <div className="flex gap-2 bg-red-50 p-3 rounded-xl border border-red-100">
                  <Info size={14} className="shrink-0 text-red-500" />
                  <p className="text-[9px] text-red-600 leading-tight font-bold uppercase">Toll, Parking & State Permits are extra.</p>
                </div>

                <div className="space-y-2">
                  <button onClick={sendWhatsApp} className="w-full bg-[#489cc2] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2"><MessageCircle fill="white" size={18} /> WHATSAPP BOOKING</button>
                  <a href="tel:+918760212345" className="w-full bg-[#48c256] text-white py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2"><Phone fill="white" size={18} /> CALL TO BOOK</a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input-premium { width: 100%; background: #f8fafc; border: 2px solid #f1f5f9; padding: 1rem 1rem 1rem 3rem; border-radius: 1.25rem; font-weight: 800; font-size: 0.85rem; outline: none; color: black; transition: all 0.3s ease; }
        .input-premium:focus { border-color: #489cc2; background: white; }
        .input-date-premium { width: 100%; background: #f8fafc; border: 2px solid #f1f5f9; padding: 1.4rem 0.8rem 0.6rem 0.8rem; border-radius: 1.25rem; font-weight: 800; font-size: 0.85rem; outline: none; color: black; }
        .label-style { position: absolute; left: 0.8rem; top: 0.4rem; font-size: 8px; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 0.05em; z-index: 10; }
      `}</style>
    </div>
  );
};

export default BookingForm;
