import LegalLayout from '@/components/LegalLayout';
import { FileText, CreditCard, ShieldAlert, Zap, Scale } from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="MARCH 2026" icon={<FileText size={24}/>}>
      
      <section id="billing" className="group">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">01. Billing & Tariff Protocol</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          STAXI operates on a <span className="text-[#22C55E]">Dynamic Oneway Pricing</span> model. Fares are calculated strictly from the point of origin to the designated destination. By initiating a booking, you agree to the fixed tariff which includes <span className="text-white">Tolls, Driver Bata, and Fuel Surcharges</span> as displayed in the digital invoice.
        </p>
      </section>

      <section id="logistics" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">02. Operational Dispatch</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          While we maintain a <span className="text-[#22C55E]">98% Punctuality Rate</span>, STAXI dispatch is subject to environmental variables. We are not liable for delays resulting from extreme meteorological events, state-mandated roadblocks, or systemic infrastructure failure within the Tamil Nadu transit grid.
        </p>
      </section>

      <section id="safety" className="group">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">03. Code of Conduct</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          The STAXI ecosystem is built on mutual respect. Any form of harassment, digital tampering with the booking interface, or physical damage to the <span className="text-white">Premium Fleet</span> will result in immediate account termination and legal escalation under state jurisdiction.
        </p>
      </section>

      <section id="liability" className="group">
        <div className="flex items-center gap-3 mb-6">
          <Scale size={16} className="text-[#22C55E]" />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">04. Legal Indemnity</h2>
        </div>
        <p className="text-slate-400 text-lg leading-relaxed font-medium">
          Users agree to indemnify STAXI against all claims arising from personal belongings left within the vehicle. We provide a <span className="text-[#22C55E]">Lost & Found Concierge</span> service, but the final responsibility of inventory remains with the passenger.
        </p>
      </section>

    </LegalLayout>
  );
}