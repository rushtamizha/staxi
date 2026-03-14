

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
    SEDAN: { base: 1700, minKm: 100, extra: 13, bata: 400, name: "Sedan" },
    MUV: { base: 2470, minKm: 100, extra: 19, bata: 400, name: "MUV" },
    SUV: { base: 2600, minKm: 100, extra: 20, bata: 400, name: "SUV" },
  },
  ROUND_TRIP: {
    SEDAN: { minKmPerDay: 250, extra: 12, bata: 400, name: "Sedan" },
    MUV: { minKmPerDay: 250, extra: 17, bata: 400, name: "MUV" },
    SUV: { minKmPerDay: 250, extra: 18, bata: 400, name: "SUV" },
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
  const [showReceipt, setShowReceipt] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const originRef = useRef();
  const destRef = useRef();

  /// 1. TIME VALIDATION & AUTO-SET
  useEffect(() => {
    const now = new Date();

    // Create a time string for 1 hour from now (e.g., "10:30")
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000 + 1);
    const hours = String(oneHourLater.getHours()).padStart(2, "0");
    const minutes = String(oneHourLater.getMinutes()).padStart(2, "0");
    const defaultTime = `${hours}:${minutes}`;

    // Set default date to today and time to +1hr on mount
    if (!formData.startDate) {
      setFormData((prev) => ({
        ...prev,
        startDate: now.toISOString().split("T")[0],
        time: defaultTime,
      }));
    }

    // Validate if selected time is at least 1 hour away for today
    if (formData.startDate && formData.time) {
      const selectedDateTime = new Date(
        `${formData.startDate}T${formData.time}`,
      );
      const bufferTime = new Date(now.getTime() + 60 * 60 * 1000);
      const isToday = now.toDateString() === selectedDateTime.toDateString();

      setTimeError(isToday && selectedDateTime < bufferTime);
    }
  }, [formData.startDate, formData.time]);
  // 2. DAY CALCULATION LOGIC
  useEffect(() => {
    if (
      formData.startDate &&
      formData.endDate &&
      formData.tripType === "ROUND_TRIP"
    ) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays > 0 ? diffDays : 1);
    } else {
      setDays(1);
    }
  }, [formData.startDate, formData.endDate, formData.tripType]);

  // 3. FARE CALCULATION ENGINE
  const config = PRICING_DATA[formData.tripType][formData.carType];
  let totalAmount = 0;
  let minKmApplied = 0;
  let extraKm = 0;
  let extraFare = 0;
  let totalBata = config.bata * days;

  if (formData.tripType === "ONE_WAY") {
    minKmApplied = config.minKm;
    extraKm = Math.max(0, distance - minKmApplied);
    extraFare = extraKm * config.extra;
    totalAmount = config.base + extraFare + totalBata;
  } else {
    const totalTravelDist = distance * 2;
    minKmApplied = days * config.minKmPerDay;
    extraKm = Math.max(0, totalTravelDist - minKmApplied);
    extraFare = extraKm * config.extra;
    const baseAmount = minKmApplied * config.extra;
    totalAmount = baseAmount + extraFare + totalBata;
  }

  const handleCalculate = () => {
    if (
      !originRef.current.value ||
      !destRef.current.value ||
      !formData.phone ||
      !formData.startDate ||
      !formData.time
    ) {
      alert("Please fill all details correctly.");
      return;
    }
    if (timeError) return;

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [originRef.current.value],
        destinations: [destRef.current.value],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          setDistance(
            Math.round(response.rows[0].elements[0].distance.value / 1000),
          );
          setShowReceipt(true);
        }
      },
    );
  };

  const sendWhatsApp = () => {
    const text = `*🚕 STAXI BOOKING REQUEST*%0A---%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Trip:* ${formData.tripType}%0A*Car:* ${config.name}%0A*From:* ${originRef.current.value}%0A*To:* ${destRef.current.value}%0A*Pickup:* ${formData.startDate} @ ${formData.time}%0A*Duration:* ${days} Day(s)%0A*Total Est. KM:* ${formData.tripType === "ROUND_TRIP" ? distance * 2 : distance}km%0A---%0A*TOTAL FARE: ₹${totalAmount}*`;
    window.open(`https://wa.me/918760212345?text=${text}`, "_blank");
  };

  if (!isLoaded)
    return (
      <div className="p-10 text-center font-black text-[#135984] tracking-tighter">
        BOOTING STAXI ENGINE...
      </div>
    );

  return (
    <div className="w-full max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-1 shadow-2xl border-b-[12px] border-[#135984] overflow-hidden"
      >
        <div className="p-6 md:p-8">
          {/* Trip Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            {["ONE_WAY", "ROUND_TRIP"].map((t) => (
              <button
                key={t}
                onClick={() => setFormData({ ...formData, tripType: t })}
                className={`flex-1 py-3.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${formData.tripType === t ? "bg-black text-[#135984] shadow-lg" : "text-slate-400"}`}
              >
                {t.replace("_", " ")}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {/* User Info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#135984] transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Name"
                  className="input-premium pl-20"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="relative group">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#135984] transition-colors"
                  size={16}
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="input-premium pl-12"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Locations */}
            <Autocomplete>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#135984]"
                  size={16}
                />
                <input
                  ref={originRef}
                  placeholder="Pickup City"
                  className="input-premium pl-22"
                />
              </div>
            </Autocomplete>
            <Autocomplete>
              <div className="relative">
                <Navigation
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500"
                  size={16}
                />
                <input
                  ref={destRef}
                  placeholder="Drop City"
                  className="input-premium pl-12"
                />
              </div>
            </Autocomplete>

            {/* Schedule */}
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="label-style">Pickup Date</span>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  className="input-date-premium"
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="relative">
                <span className="label-style">Pickup Time</span>
                <input
                  type="time"
                  value={formData.time}
                  className={`input-date-premium ${timeError ? "border-red-500 bg-red-50 text-red-600 animate-pulse" : ""}`}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
                {/* Helper text for user experience */}
                <p className="text-[7px] text-slate-400 mt-1 ml-2 uppercase font-bold tracking-tighter">
                  Earliest Booking:{" "}
                  {new Date(new Date().getTime() + 3600000).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </p>
              </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {timeError && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="flex items-center gap-2 bg-red-50 p-3 rounded-xl border border-red-100 text-red-600"
                >
                  <AlertTriangle size={14} />
                  <p className="text-[9px] font-black uppercase tracking-tight">
                    Requires 1 hour gap for driver assignment.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Round Trip End Date */}
            {formData.tripType === "ROUND_TRIP" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative"
              >
                <span className="label-style">Return Date</span>
                <input
                  type="date"
                  min={formData.startDate}
                  className="input-date-premium"
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </motion.div>
            )}

            {/* Car Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {["SEDAN", "MUV", "SUV"].map((c) => (
                <button
                  key={c}
                  onClick={() => setFormData({ ...formData, carType: c })}
                  className={`py-4 rounded-2xl border-2 flex flex-col items-center transition-all ${formData.carType === c ? "border-[#135984] bg-[#135984] " : "border-slate-100"}`}
                >
                  <span
                    className={`text-[11px] font-black ${formData.carType === c ? "text-black" : "text-slate-400"}`}
                  >
                    {c}
                  </span>
                  <span className="text-[8px] font-bold text-slate-400 mt-1">
                    ₹{PRICING_DATA[formData.tripType][c].extra}/KM
                  </span>
                </button>
              ))}
            </div>

            <button
              disabled={timeError}
              onClick={handleCalculate}
              className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 ${timeError ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-black text-[#135984] hover:bg-[#135984] hover:text-white  active:scale-95"}`}
            >
              {timeError ? "Invalid Time" : "Calculate Fare"}{" "}
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* RECEIPT MODAL */}
      <AnimatePresence>
        {showReceipt && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceipt(false)}
              className="absolute inset-0 bg-black/90"
            />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="relative bg-white w-full max-w-md rounded-[3rem] overflow-hidden shadow-2xl border-4 border-[#135984]"
            >
              <div className="bg-[#135984] p-8 text-black flex justify-between items-start">
                <div>
                  <div className="bg-black text-white px-2 py-1 rounded text-[8px] font-black uppercase mb-2 inline-block">
                    STAXI Estimate
                  </div>
                  <h4 className="text-4xl font-black italic tracking-tighter leading-tight">
                    BOOKING DETAILS
                  </h4>
                </div>
                <X
                  className="cursor-pointer hover:rotate-90 transition-transform"
                  onClick={() => setShowReceipt(false)}
                />
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-[2rem]">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Duration
                    </span>
                    <span className="text-sm font-black text-black">
                      {days} Day(s)
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Total Distance
                    </span>
                    <span className="text-sm font-black text-[#135984]">
                      {formData.tripType === "ROUND_TRIP"
                        ? distance * 2
                        : distance}{" "}
                      KM
                    </span>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex justify-between items-center group">
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-black transition-colors italic">
                      Base Fare ({minKmApplied}km)
                    </span>
                    <span className="text-sm font-black text-black tracking-tight">
                     ₹{formData.tripType === "ONE_WAY" ? config.base : minKmApplied * config.extra}
                    </span>
                  </div>
                  <div className="flex justify-between items-center group">
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-black transition-colors italic">
                      Extra Usage ({extraKm}km)
                    </span>
                    <span className="text-sm font-black text-black tracking-tight">
                      ₹{extraFare}
                    </span>
                  </div>
                  <div className="flex justify-between items-center group border-b border-slate-100 pb-4">
                    <span className="text-[10px] font-black uppercase text-slate-400 group-hover:text-black transition-colors italic">
                      Driver Bata ({days} Days)
                    </span>
                    <span className="text-sm font-black text-black tracking-tight">
                      ₹{totalBata}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-2xl font-black uppercase italic tracking-tighter text-black">
                      Total Fare
                    </span>
                    <span className="text-4xl font-black text-[#135984] tracking-tighter">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 bg-green-50 p-4 rounded-2xl border border-green-100">
                  <Info size={16} className="shrink-0 text-[#135984]" />
                  <p className="text-[8px] font-bold text-green-900 leading-relaxed uppercase tracking-wider">
                    Toll, Parking & State Permits are extra. Estimation based on
                    standard routes.
                  </p>
                </div>

                <button
                  onClick={sendWhatsApp}
                  className="w-full bg-[#135984] text-white py-5 rounded-[1.5rem] font-black text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-green-500/30 transition-all active:scale-95"
                >
                  <MessageCircle fill="white" size={24} /> BOOK ON WHATSAPP
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .input-premium {
          width: 100%;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          padding: 1rem 2.5rem;
          border-radius: 1.25rem;
          font-weight: 800;
          font-size: 0.85rem;
          outline: none;
          color: black;
          transition: all 0.3s ease;
        }
        .input-premium:focus {
          border-color: #22c55e;
          background: white;
          box-shadow: 0 10px 20px -10px rgba(34, 197, 94, 0.2);
        }
        .input-date-premium {
          width: 100%;
          background: #f8fafc;
          border: 2px solid #f1f5f9;
          padding: 1.4rem 0.8rem 0.6rem 0.8rem;
          border-radius: 1.25rem;
          font-weight: 800;
          font-size: 0.85rem;
          outline: none;
          color: black;
        }
        .label-style {
          position: absolute;
          left: 0.8rem;
          top: 0.4rem;
          font-size: 8px;
          font-weight: 900;
          text-transform: uppercase;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};

export default BookingForm;
