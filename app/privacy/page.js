import LegalLayout from '@/components/LegalLayout';
import { ShieldCheck, Database, Map, Lock, Cpu } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="MARCH 2026" icon={<ShieldCheck size={24}/>}>
      
      <section id="collect" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Database size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">01. Information We Collect</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          At <span className="text-white italic">STAXI</span>, we maintain a zero-compromise policy on data. We collect essential identifiers—<span className="text-[#22C55E]">Full Name, Biometric Auth, and Contact Nodes</span>—strictly to facilitate ultra-secure intercity logistics and passenger verification.
        </p>
      </section>

      <section id="location" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Map size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">02. Use of Geo-Spatial Data</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          Real-time telemetry is broadcast via encrypted STAXI channels. This geospatial tracking is utilized for <span className="text-[#22C55E]">Route Optimization</span> and redundant safety monitoring, ensuring every kilometer is accounted for in our Tamil Nadu network.
        </p>
      </section>

      <section id="security" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">03. Encryption Standards</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          Data at rest and in transit is protected by <span className="text-white">AES-256 military-grade encryption</span>. Your behavioral patterns and travel history are siloed within our proprietary architecture and are never liquidated to third-party entities.
        </p>
      </section>

      <section id="cookies" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Cpu size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">04. Session Tracking</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          Our interface utilizes high-performance session cookies to cache user preferences and optimize the <span className="text-[#22C55E]">booking workflow</span>. These digital footprints are purged upon session termination or user request.
        </p>
      </section>

    </LegalLayout>
  );
}