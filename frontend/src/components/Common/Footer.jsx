import React from 'react';
import { Activity, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const Footer = () => {
  const { setActiveTab } = useFitness();

  return (
    <footer className="bg-white border-t border-forest-100 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Disclaimers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10 border-b border-forest-100">
          
          {/* Medical Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start space-x-3.5">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Clinical & Medical Disclaimer
              </h4>
              <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                HealthPulse & Fit and PulseAI provide general fitness, training, and nutritional information for educational purposes only. Content should not be used as medical advice or clinical diagnosis. Always consult with a licensed healthcare physician before beginning any strenuous workout or nutrition program.
              </p>
            </div>
          </div>

          {/* Affiliate Disclosure Notice */}
          <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200/80 flex items-start space-x-3.5">
            <div className="p-2 bg-forest-100 text-forest-800 rounded-xl shrink-0 mt-0.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-forest-900 uppercase tracking-wider">
                Affiliate Disclosure & Transparency
              </h4>
              <p className="text-xs text-forest-800/90 mt-1 leading-relaxed">
                Some links in our Store tab are custom affiliate referral links. When you purchase recommended fitness gear, supplements, or literature through our partner links, HealthPulse & Fit may earn a small referral commission at zero additional cost to you. We only recommend rigorously tested products.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Brand Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-forest-800 flex items-center justify-center text-white">
              <Activity className="w-5 h-5 text-sage-300" />
            </div>
            <div>
              <span className="font-bold text-slate-dark text-base tracking-tight">HealthPulse & Fit</span>
              <p className="text-xs text-gray-500">MERN Healthcare & Fitness Architecture</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-gray-600">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-forest-800 transition">Dashboard</button>
            <button onClick={() => setActiveTab('bmi')} className="hover:text-forest-800 transition">BMI Calculator</button>
            <button onClick={() => setActiveTab('chatbot')} className="hover:text-forest-800 transition">PulseAI Advisor</button>
            <button onClick={() => setActiveTab('workouts')} className="hover:text-forest-800 transition">Exercise Library</button>
            <button onClick={() => setActiveTab('diets')} className="hover:text-forest-800 transition">Nutrition Plans</button>
            <button onClick={() => setActiveTab('timetable')} className="hover:text-forest-800 transition">Weekly Timetable</button>
            <button onClick={() => setActiveTab('affiliate')} className="hover:text-forest-800 transition">Gear Store</button>
          </div>

          <div className="text-xs text-gray-500 text-center md:text-right">
            <p>© 2026 HealthPulse & Fit. All rights reserved.</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Designed with Tailwind CSS & MERN Stack</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
