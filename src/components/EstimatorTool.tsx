import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sliders, CheckCircle, HelpCircle, ArrowRight, Sparkles, Receipt } from 'lucide-react';

interface EstimatorProps {
  onOpenQuote: () => void;
}

export const EstimatorTool: React.FC<EstimatorProps> = ({ onOpenQuote }) => {
  const [lawnSize, setLawnSize] = useState(2500); // sq ft
  const [frequency, setFrequency] = useState<'weekly' | 'biweekly' | 'monthly' | 'oneoff'>('biweekly');
  
  // Extra services
  const [weedControl, setWeedControl] = useState(true);
  const [aeration, setAeration] = useState(false);
  const [overseeding, setOverseeding] = useState(false);
  const [trimming, setTrimming] = useState(false);
  const [soilFeed, setSoilFeed] = useState(true);

  const [estimate, setEstimate] = useState(0);

  // Recalculate price whenever inputs change (High-end architectural landscape formulas)
  useEffect(() => {
    // Premium materials and architectural base per sq ft
    const basePerSqFt = 0.45; 
    let basePrice = lawnSize * basePerSqFt;

    // Minimum premium project charge
    if (basePrice < 850) basePrice = 850;

    // Frequency multipliers (Curation discount programs)
    let freqMultiplier = 1.0;
    if (frequency === 'weekly') freqMultiplier = 0.85;
    if (frequency === 'biweekly') freqMultiplier = 1.0;
    if (frequency === 'monthly') freqMultiplier = 1.15;
    if (frequency === 'oneoff') freqMultiplier = 1.4;

    let finalPrice = basePrice * freqMultiplier;

    // Add high-end specialized artisanal programs
    if (weedControl) finalPrice += 150 + (lawnSize * 0.05); // Eco Weed Curation
    if (aeration) finalPrice += 350 + (lawnSize * 0.08);    // Deep Core Aeration
    if (overseeding) finalPrice += 400 + (lawnSize * 0.12); // Specimen Overseeding
    if (trimming) finalPrice += 250;                        // Topiary & Hedge Sculpting
    if (soilFeed) finalPrice += 180 + (lawnSize * 0.04);    // Organic Nutrient Matrix

    setEstimate(Math.round(finalPrice));
  }, [lawnSize, frequency, weedControl, aeration, overseeding, trimming, soilFeed]);

  const handleBook = () => {
    // Save estimate details to local storage so the quote drawer or other forms can read it!
    const estimateDetails = {
      lawnSize,
      frequency,
      extras: { weedControl, aeration, overseeding, trimming, soilFeed },
      calculatedPrice: estimate,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('verdara_active_estimate', JSON.stringify(estimateDetails));
    onOpenQuote();
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAF6F0] border-b border-[#E3DEC9]" id="estimator">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B6B3A] mb-4 block">Interactive Tool</span>
          <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] tracking-tight leading-[1.12]">
            Landscape & Hardscape <span className="text-[#0B6B3A] italic">Investment Planner.</span>
          </h2>
          <p className="text-sm text-[#6D7870] mt-4 leading-relaxed font-sans font-light">
            Receive an instant architectural investment projection based on your property dimensions and selection of bespoke garden curation programs.
          </p>
        </div>

        {/* Form Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls - Left */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#E3DEC9] shadow-sm flex flex-col justify-between">
            <div className="space-y-8">
              
              {/* Slider Size */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0F1A12] flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-[#0B6B3A]" />
                    Project Area Dimensions
                  </label>
                  <span className="text-xs font-bold text-[#0B6B3A] bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#E3DEC9]/30">
                    {lawnSize.toLocaleString()} sq. ft.
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={lawnSize}
                  onChange={(e) => setLawnSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#FAF6F0] rounded-lg appearance-none cursor-pointer accent-[#0B6B3A]"
                />
                <div className="flex justify-between text-[10px] text-[#6D7870] font-semibold">
                  <span>Urban Courtyard (500 sq ft)</span>
                  <span>Premium Private Estate (15,000+ sq ft)</span>
                </div>
              </div>

              {/* Service Frequency */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1A12] block">
                  Curation Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { key: 'weekly', label: 'Weekly', desc: 'Saves 15%' },
                    { key: 'biweekly', label: 'Bi-Weekly', desc: 'Ideal standard' },
                    { key: 'monthly', label: 'Monthly', desc: 'Intermittent' },
                    { key: 'oneoff', label: 'Bespoke', desc: 'As commissioned' }
                  ].map((freq) => (
                    <button
                      key={freq.key}
                      type="button"
                      onClick={() => setFrequency(freq.key as any)}
                      className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        frequency === freq.key
                          ? 'bg-[#0B6B3A] text-white border-transparent shadow-sm'
                          : 'bg-[#FCFCFA] text-[#0F1A12] border-[#E3DEC9] hover:border-[#0B6B3A]'
                      }`}
                    >
                      <p className="text-xs font-bold">{freq.label}</p>
                      <p className={`text-[9px] mt-0.5 ${frequency === freq.key ? 'text-[#BDD4A1]' : 'text-[#6D7870]'}`}>
                        {freq.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Addons Checklist */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#0F1A12] block">
                  Artisan Specialties & Protective Programs
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { state: weedControl, set: setWeedControl, label: 'Eco-Weed Curation', desc: 'Non-toxic, bio-organic controls' },
                    { state: soilFeed, set: setSoilFeed, label: 'Organic Nutrient Infusion', desc: 'Micronutrients & fungal matrices' },
                    { state: aeration, set: setAeration, label: 'Surgical Core Aeration', desc: 'Relieve deep soil compression' },
                    { state: overseeding, set: setOverseeding, label: 'Premium Specimen Seeding', desc: 'Bespoke hand-seeded grass blends' },
                    { state: trimming, set: setTrimming, label: 'Fine Topiary Sculpting', desc: 'Precision hedge & edge architectural lines' }
                  ].map((addon, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => addon.set(!addon.state)}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        addon.state
                          ? 'bg-[#F4EFEA] border-[#0B6B3A] text-[#0F1A12]'
                          : 'bg-[#FCFCFA] border-[#E3DEC9] text-[#6D7870] hover:border-[#0B6B3A]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${addon.state ? 'bg-[#0B6B3A] border-transparent text-white' : 'border-gray-300 bg-white'}`}>
                        {addon.state && <span className="text-[9px]">✓</span>}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0F1A12]">{addon.label}</p>
                        <p className="text-[10px] text-[#6D7870] mt-0.5">{addon.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Pricing Card Output - Right */}
          <div className="lg:col-span-5 bg-[#0F1A12] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border border-[#E3DEC9]/20">
            {/* Background design elements */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
            
            <div className="space-y-6 relative z-10">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#BDD4A1] font-bold flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-[#D1A153]" />
                Bespoke Investment Proposal
              </span>
              
              <h3 className="font-serif text-3xl font-bold leading-tight">
                Your Estimated <br /><span className="italic text-[#BDD4A1]">Project Curation.</span>
              </h3>
              
              <div className="h-px bg-white/10 my-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Project Area:</span>
                  <span className="font-bold text-white">{lawnSize.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Frequency Plan:</span>
                  <span className="font-bold text-white uppercase">{frequency === 'oneoff' ? 'bespoke' : frequency}</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Selected Programs:</span>
                  <span className="font-bold text-white">
                    {[weedControl, soilFeed, aeration, overseeding, trimming].filter(Boolean).length} Active
                  </span>
                </div>
              </div>

              <div className="h-px bg-white/10 my-4" />

              {/* Price output */}
              <div className="text-center py-5 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Estimated Investment Level</p>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-xl font-bold text-[#D1A153]">$</span>
                  <span className="text-5xl font-bold font-sans tracking-tight text-white">{estimate.toLocaleString()}</span>
                </div>
                <p className="text-[9px] text-white/40 mt-2 italic">Based on standard Cherry Creek estate variables</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 relative z-10">
              <button
                onClick={handleBook}
                className="w-full h-12 rounded-full bg-[#0B6B3A] hover:bg-[#0B512C] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
              >
                Apply Estimate & Request Site Visit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <p className="text-[9px] text-white/50 text-center leading-relaxed">
                *This is an automated structural projection. An on-site appraisal by our Lead Horticulturist is required to finalize contract scope.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
