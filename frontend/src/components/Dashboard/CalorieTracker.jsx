import React, { useState } from 'react';
import { Flame, Droplets, Plus, Sparkles, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';

const CalorieTracker = () => {
  const { user, updateProfile } = useAuth();
  const { addNotification } = useFitness();

  const targetCalories = user?.dailyCalorieTarget || 2500;
  const [consumed, setConsumed] = useState(user?.caloriesConsumedToday || 1850);
  const [waterMl, setWaterMl] = useState(user?.waterIntakeMl || 2400);
  const waterTarget = user?.waterTargetMl || 3200;

  // Macros
  const macros = user?.macros || {
    protein: 155,
    targetProtein: 170,
    carbs: 210,
    targetCarbs: 280,
    fats: 58,
    targetFats: 70
  };

  const calPercentage = Math.min(100, Math.round((consumed / targetCalories) * 100));
  const waterPercentage = Math.min(100, Math.round((waterMl / waterTarget) * 100));
  const remaining = Math.max(0, targetCalories - consumed);

  const handleQuickAddCalories = async (amount, label) => {
    const nextVal = consumed + amount;
    setConsumed(nextVal);
    await updateProfile({ caloriesConsumedToday: nextVal });
    addNotification({
      title: 'Nutrition Logged',
      message: `Added +${amount} kcal (${label}). Daily total: ${nextVal} kcal.`,
      type: 'nutrition'
    });
  };

  const handleQuickAddWater = async (amount) => {
    const nextVal = waterMl + amount;
    setWaterMl(nextVal);
    await updateProfile({ waterIntakeMl: nextVal });
    addNotification({
      title: 'Hydration Logged',
      message: `Added +${amount}ml water! (${nextVal} / ${waterTarget}ml)`,
      type: 'hydration'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-forest-100 shadow-soft">
      {/* Top Title */}
      <div className="flex items-center justify-between pb-5 border-b border-forest-50">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-dark text-base">Daily Calorie & Macro Target</h3>
            <p className="text-xs text-gray-500">Real-time metabolic fuel breakdown</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-extrabold text-forest-900">{remaining}</span>
          <span className="text-xs text-gray-500 ml-1">kcal left</span>
        </div>
      </div>

      {/* Main Calorie Progress Bar */}
      <div className="mt-5 space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-dark">
            {consumed.toLocaleString()} <span className="font-normal text-gray-400">/ {targetCalories.toLocaleString()} kcal</span>
          </span>
          <span className="font-bold text-forest-700 bg-forest-50 px-2 py-0.5 rounded-full text-[11px]">
            {calPercentage}% of Goal
          </span>
        </div>

        <div className="w-full bg-forest-50 h-3.5 rounded-full overflow-hidden p-0.5 border border-forest-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forest-600 via-forest-500 to-sage-400 transition-all duration-500 shadow-sm"
            style={{ width: `${calPercentage}%` }}
          />
        </div>
      </div>

      {/* Macronutrient Split */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        {/* Protein */}
        <div className="p-3 rounded-2xl bg-forest-50/50 border border-forest-100/60">
          <div className="flex justify-between items-center text-[11px] mb-1">
            <span className="font-bold text-slate-dark">Protein</span>
            <span className="text-forest-800 font-bold">{macros.protein}g</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden">
            <div
              className="bg-forest-700 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((macros.protein / macros.targetProtein) * 100))}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-400 mt-1 text-right">Target: {macros.targetProtein}g</div>
        </div>

        {/* Carbs */}
        <div className="p-3 rounded-2xl bg-amber-50/50 border border-amber-100/60">
          <div className="flex justify-between items-center text-[11px] mb-1">
            <span className="font-bold text-slate-dark">Carbs</span>
            <span className="text-amber-800 font-bold">{macros.carbs}g</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((macros.carbs / macros.targetCarbs) * 100))}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-400 mt-1 text-right">Target: {macros.targetCarbs}g</div>
        </div>

        {/* Fats */}
        <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/60">
          <div className="flex justify-between items-center text-[11px] mb-1">
            <span className="font-bold text-slate-dark">Fats</span>
            <span className="text-emerald-800 font-bold">{macros.fats}g</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((macros.fats / macros.targetFats) * 100))}%` }}
            />
          </div>
          <div className="text-[10px] text-gray-400 mt-1 text-right">Target: {macros.targetFats}g</div>
        </div>
      </div>

      {/* Water Intake Section */}
      <div className="mt-6 pt-5 border-t border-forest-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-dark">Hydration Tracker</div>
            <div className="text-[11px] text-gray-500">{waterMl} / {waterTarget} ml ({waterPercentage}%)</div>
          </div>
        </div>

        <button
          onClick={() => handleQuickAddWater(250)}
          className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center space-x-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+250ml</span>
        </button>
      </div>

      {/* Quick Action Logs */}
      <div className="mt-4 flex flex-wrap gap-2 pt-2">
        <button
          onClick={() => handleQuickAddCalories(200, 'Protein Shake')}
          className="text-[11px] font-semibold text-forest-800 bg-forest-50 hover:bg-forest-100 px-3 py-1.5 rounded-xl border border-forest-100/80 transition flex items-center space-x-1"
        >
          <Plus className="w-3 h-3 text-forest-600" />
          <span>+200 kcal (Shake)</span>
        </button>
        <button
          onClick={() => handleQuickAddCalories(450, 'Nutritious Meal')}
          className="text-[11px] font-semibold text-forest-800 bg-forest-50 hover:bg-forest-100 px-3 py-1.5 rounded-xl border border-forest-100/80 transition flex items-center space-x-1"
        >
          <Plus className="w-3 h-3 text-forest-600" />
          <span>+450 kcal (Meal)</span>
        </button>
      </div>
    </div>
  );
};

export default CalorieTracker;
