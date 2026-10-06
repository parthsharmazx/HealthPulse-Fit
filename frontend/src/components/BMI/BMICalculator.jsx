import React, { useState } from 'react';
import { Scale, Check, Save, Info, RotateCcw, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';
import BMIGauge from './BMIGauge';

const BMICalculator = () => {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useFitness();

  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' (cm, kg) or 'imperial' (ft/in, lbs)
  const [heightCm, setHeightCm] = useState(user?.height || 178);
  const [weightKg, setWeightKg] = useState(user?.weight || 72);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [weightLbs, setWeightLbs] = useState(158);
  const [isSaved, setIsSaved] = useState(false);

  // Compute active height in cm and weight in kg
  const activeHeightCm = unitSystem === 'metric' ? heightCm : Math.round((feet * 12 + Number(inches)) * 2.54);
  const activeWeightKg = unitSystem === 'metric' ? weightKg : Math.round(weightLbs * 0.453592);

  // Real-time BMI calculation
  const heightM = activeHeightCm / 100;
  const bmiVal = activeHeightCm > 0 ? parseFloat((activeWeightKg / (heightM * heightM)).toFixed(1)) : 22.0;

  let bmiCategory = 'Normal Weight';
  if (bmiVal < 18.5) bmiCategory = 'Underweight';
  else if (bmiVal < 25) bmiCategory = 'Normal Weight';
  else if (bmiVal < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  const handleSaveToProfile = async () => {
    setIsSaved(true);
    await updateProfile({
      height: activeHeightCm,
      weight: activeWeightKg,
      bmi: bmiVal,
      bmiCategory
    });
    addNotification({
      title: 'Biometrics Synced! ⚖️',
      message: `Updated profile metrics: ${activeHeightCm}cm, ${activeWeightKg}kg, BMI ${bmiVal} (${bmiCategory}).`,
      type: 'general'
    });
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Biometric Assessment Module</span>
          </div>
          <h2 className="text-2xl font-black text-slate-dark tracking-tight">Interactive BMI Calculator</h2>
          <p className="text-xs text-gray-500 mt-1 max-w-xl">
            Evaluate your Body Mass Index (BMI) using World Health Organization (WHO) standards. Adjust the sliders or inputs below for immediate recalibration.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="bg-forest-50 p-1 rounded-2xl flex border border-forest-100 self-start md:self-auto">
          <button
            onClick={() => setUnitSystem('metric')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              unitSystem === 'metric'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-gray-600 hover:text-forest-900'
            }`}
          >
            Metric (cm / kg)
          </button>
          <button
            onClick={() => setUnitSystem('imperial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              unitSystem === 'imperial'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-gray-600 hover:text-forest-900'
            }`}
          >
            Imperial (ft / lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-forest-100 shadow-soft space-y-6">
            <h3 className="font-bold text-slate-dark text-base pb-3 border-b border-forest-50">
              Biometric Adjustments
            </h3>

            {unitSystem === 'metric' ? (
              <>
                {/* Height (cm) Slider + Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-dark">Height (cm)</label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        min="120"
                        max="230"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-16 px-2 py-1 text-right font-extrabold text-forest-800 border border-forest-100 rounded-lg bg-forest-50/50 text-xs focus:outline-forest-600"
                      />
                      <span className="text-gray-400 font-medium">cm</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>120 cm</span>
                    <span>170 cm</span>
                    <span>220 cm</span>
                  </div>
                </div>

                {/* Weight (kg) Slider + Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-dark">Weight (kg)</label>
                    <div className="flex items-center space-x-1">
                      <input
                        type="number"
                        min="35"
                        max="180"
                        value={weightKg}
                        onChange={(e) => setWeightKg(Number(e.target.value))}
                        className="w-16 px-2 py-1 text-right font-extrabold text-forest-800 border border-forest-100 rounded-lg bg-forest-50/50 text-xs focus:outline-forest-600"
                      />
                      <span className="text-gray-400 font-medium">kg</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>35 kg</span>
                    <span>105 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Feet & Inches */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-dark">Height (Feet & Inches)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Feet</span>
                      <input
                        type="number"
                        min="3"
                        max="7"
                        value={feet}
                        onChange={(e) => setFeet(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-slate-dark focus:border-forest-600"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block mb-1">Inches</span>
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={inches}
                        onChange={(e) => setInches(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs font-bold text-slate-dark focus:border-forest-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Weight (lbs) */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-bold text-slate-dark">Weight (lbs)</label>
                    <span className="font-extrabold text-forest-800">{weightLbs} lbs</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="350"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full h-2 bg-forest-100 rounded-lg appearance-none cursor-pointer accent-forest-700"
                  />
                </div>
              </>
            )}

            {/* Calculated Result Card */}
            <div className="p-5 rounded-2xl bg-forest-900 text-white shadow-soft-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] text-forest-200 uppercase tracking-wider font-semibold">
                    Calculated Result
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-4xl font-black text-sage-300">{bmiVal}</span>
                    <span className="text-xs text-forest-200">BMI score</span>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-forest-800 text-sage-200 border border-forest-700">
                  {bmiCategory}
                </span>
              </div>

              <button
                onClick={handleSaveToProfile}
                className="w-full mt-2 py-3 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-bold transition flex items-center justify-center space-x-2 shadow-sm"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-sage-300" />
                    <span>Saved & Synchronized!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save to My Dashboard Profile</span>
                  </>
                )}
              </button>
            </div>

            {/* WHO Medical Info Callout */}
            <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-100/70 text-xs text-gray-600 flex items-start space-x-2.5">
              <Info className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Clinical Note:</strong> BMI is a general population screening index. Muscular athletes may have higher values without adverse metabolic risk.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Gauge & Tailored Plan Column */}
        <div className="lg:col-span-7">
          <BMIGauge
            bmi={bmiVal}
            category={bmiCategory}
            heightCm={activeHeightCm}
          />
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
