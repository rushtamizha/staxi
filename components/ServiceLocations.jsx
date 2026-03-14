export const ServiceLocations = () => {
  const airports = ["Chennai (MAA)", "Madurai (IXM)", "Coimbatore (CJB)", "Trichy (TRZ)"];
  const cities = ["Chennai", "Madurai", "Coimbatore", "Salem", "Trichy", "Erode", "Vellore", "Pondicherry"];

  return (
    <section className="py-10 bg-black text-white/50 text-[10px] font-bold uppercase tracking-widest border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-[#489cc2] mb-4">Airport Transfers Available At:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {airports.map(a => <span key={a} className="hover:text-white transition-colors">{a} Airport</span>)}
            </div>
          </div>
          <div>
            <p className="text-[#489cc2] mb-4">Primary Drop Zones:</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {cities.map(c => <span key={c} className="hover:text-white transition-colors">{c} to Anywhere</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
