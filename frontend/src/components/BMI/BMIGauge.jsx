import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck, Dumbbell, Apple, Droplets } from 'lucide-react';

const BMIGauge = ({ bmi, category, heightCm }) => {
  // Normalize BMI for meter pin position (clamped between 14 and 40)
  const minBmi = 14;
  const maxBmi = 40;
  const clampedBmi = Math.min(Math.max(bmi, minBmi), maxBmi);
  const percentage = ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;

  // Calculate ideal weight range for height (BMI 18.5 to 24.9)
  const heightM = heightCm / 100;
  const minIdealWeight = (18.5 * heightM * heightM).toFixed(1);
  const maxIdealWeight = (24.9 * heightM * heightM).toFixed(1);

  const getCategoryDetails = () => {
    switch (category) {
      case 'Underweight':
        return {
          title: 'Underweight Range (BMI < 18.5)',
          badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
          recommendations: [
            { icon: Apple, text: 'Increase daily caloric surplus (+300 to +500 kcal) with calorie-dense nutrient-rich foods (nuts, oats, whole milk, avocado).' },
            { icon: Dumbbell, text: 'Focus on progressive overload compound resistance training (Squats, Bench, Deadlifts) 3-4 days/week to build lean mass.' },
            { icon: Droplets, text: 'Ensure 1.8g to 2.2g of protein per kg of body weight to support muscle tissue accretion.' }
          ]
        };
      case 'Normal Weight':
        return {
          title: 'Healthy / Normal Range (BMI 18.5 – 24.9)',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          recommendations: [
            { icon: ShieldCheck, text: 'Optimal metabolic health! Focus on performance improvements, strength progression, and endurance capacity.' },
            { icon: Dumbbell, text: 'Balance heavy resistance training with 2 weekly sessions of zone-2 cardiovascular conditioning.' },
            { icon: Apple, text: 'Maintain isocaloric balance with high-fiber whole foods and 1.6g–2.0g protein/kg.' }
          ]
        };
      case 'Overweight':
        return {
          title: 'Overweight Range (BMI 25.0 – 29.9)',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
          recommendations: [
            { icon: Apple, text: 'Adopt a moderate calorie deficit (-300 to -500 kcal/day) targeting 0.5kg of steady, sustainable fat loss per week.' },
            { icon: Dumbbell, text: 'Incorporate HIIT and circuit training (Burpees, Kettlebell swings) alongside strength preservation lifts.' },
            { icon: Droplets, text: 'Drink 500ml water before main meals to increase satiety and elevate daily energy expenditure.' }
          ]
        };
      default:
        return {
          title: 'Obese Range (BMI ≥ 30.0)',
          badgeColor: 'bg-rose-100 text-rose-900 border-rose-200',
          recommendations: [
            { icon: AlertTriangle, text: 'Consult a medical physician for tailored clinical guidance and baseline blood work analysis.' },
            { icon: Dumbbell, text: 'Prioritize low-impact aerobic activity (swimming, brisk incline walking, rowing) to protect joint cartilage.' },
            { icon: Apple, text: 'Reduce refined sugars and processed carbohydrates, focusing on fibrous vegetables and lean proteins.' }
          ]
        };
    }
  };

  const details = getCategoryDetails();

  return (
    <div className="space-y-6">
      
      {/* Gauge Visualization Meter */}
      <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">BMI Scale Visualizer</h4>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${details.badgeColor}`}>
            {category}
          </span>
        </div>

        {/* Gradient Spectrum Bar */}
        <div className="relative pt-6 pb-2">
          {/* Needle / Marker */}
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 pointer-events-none"
            style={{ left: `${percentage}%` }}
          >
            <span className="bg-forest-900 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow-md mb-1 whitespace-nowrap">
              {bmi}
            </span>
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-forest-900" />
          </div>

          {/* Bar segments */}
          <div className="h-4 rounded-full overflow-hidden flex shadow-inner">
            <div className="w-[17%] bg-blue-400" title="Underweight (<18.5)" />
            <div className="w-[25%] bg-emerald-500" title="Normal (18.5-24.9)" />
            <div className="w-[19%] bg-amber-400" title="Overweight (25-29.9)" />
            <div className="w-[39%] bg-rose-500" title="Obese (≥30)" />
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-2 px-1">
            <span>14 (Low)</span>
            <span>18.5</span>
            <span>25.0</span>
            <span>30.0</span>
            <span>40+</span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-forest-50 text-[11px]">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            <span className="text-gray-600">&lt; 18.5 Underweight</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-gray-600">18.5 - 24.9 Normal</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-gray-600">25 - 29.9 Overweight</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-gray-600">30+ Obese</span>
          </div>
        </div>
      </div>

      {/* Tailored Recommendations Card */}
      <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-forest-50">
          <div>
            <h4 className="font-bold text-slate-dark text-sm">{details.title}</h4>
            <p className="text-xs text-gray-500">Tailored action steps based on your current biometrics</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">Ideal Weight Window</span>
            <span className="text-xs font-bold text-forest-800">{minIdealWeight} – {maxIdealWeight} kg</span>
          </div>
        </div>

        <div className="space-y-3">
          {details.recommendations.map((rec, idx) => {
            const Icon = rec.icon;
            return (
              <div key={idx} className="p-3.5 rounded-2xl bg-forest-50/50 border border-forest-100/70 flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-white text-forest-800 shadow-sm border border-forest-100 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-dark/90 leading-relaxed pt-0.5">
                  {rec.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BMIGauge;
