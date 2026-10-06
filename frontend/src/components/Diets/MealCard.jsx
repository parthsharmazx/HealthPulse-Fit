import React, { useState } from 'react';
import {
  Clock,
  Flame,
  Salad,
  ChevronDown,
  ChevronUp,
  CalendarPlus,
  CheckCircle2,
  Sparkles,
  Utensils
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const MealCard = ({ meal }) => {
  const { addMealToSchedule } = useFitness();
  const [showRecipe, setShowRecipe] = useState(false);
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [justAddedDay, setJustAddedDay] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddToDay = (day) => {
    addMealToSchedule(day, meal.title);
    setJustAddedDay(day);
    setShowScheduleDropdown(false);
    setTimeout(() => setJustAddedDay(null), 2500);
  };

  // Macro calculation percentages
  const totalMacroGrams = (meal.macros.protein + meal.macros.carbs + meal.macros.fats) || 1;
  const proteinPercent = Math.round((meal.macros.protein / totalMacroGrams) * 100);
  const carbsPercent = Math.round((meal.macros.carbs / totalMacroGrams) * 100);
  const fatsPercent = Math.round((meal.macros.fats / totalMacroGrams) * 100);

  return (
    <div className="bg-white rounded-3xl border border-forest-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Meal Image Header */}
        <div className="relative h-44 w-full overflow-hidden bg-forest-900">
          <img
            src={meal.imageUrl}
            alt={meal.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm border ${
              meal.dietType === 'Vegetarian'
                ? 'bg-emerald-600/90 text-white border-emerald-400/30'
                : 'bg-amber-600/90 text-white border-amber-400/30'
            }`}>
              {meal.dietType}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-dark backdrop-blur-md shadow-sm">
              {meal.mealType}
            </span>
          </div>

          {/* Time & Calories overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-white">
            <div className="flex items-center space-x-1.5 text-xs text-sage-200 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{meal.prepTime || '15 mins'}</span>
            </div>
            <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-black">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{meal.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <h3 className="font-extrabold text-slate-dark text-sm sm:text-base leading-snug">
            {meal.title}
          </h3>

          {/* Macro Breakdown Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-forest-800">P: {meal.macros.protein}g ({proteinPercent}%)</span>
              <span className="text-amber-700">C: {meal.macros.carbs}g ({carbsPercent}%)</span>
              <span className="text-emerald-700">F: {meal.macros.fats}g ({fatsPercent}%)</span>
            </div>

            {/* Segmented bar */}
            <div className="h-2 rounded-full overflow-hidden flex bg-gray-100">
              <div style={{ width: `${proteinPercent}%` }} className="bg-forest-700" title="Protein" />
              <div style={{ width: `${carbsPercent}%` }} className="bg-amber-500" title="Carbohydrates" />
              <div style={{ width: `${fatsPercent}%` }} className="bg-emerald-500" title="Healthy Fats" />
            </div>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {meal.description}
          </p>

          {/* Expandable Ingredients & Instructions */}
          {showRecipe && (
            <div className="p-3.5 rounded-2xl bg-forest-50/60 border border-forest-100 text-xs space-y-3 animate-in slide-in-from-top-2 duration-200">
              <div>
                <span className="font-bold text-slate-dark block mb-1 text-[11px] uppercase tracking-wider">
                  Key Ingredients
                </span>
                <div className="flex flex-wrap gap-1">
                  {meal.ingredients?.map((ing, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-forest-100 text-[10px] text-gray-700 font-medium">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-dark block mb-1 text-[11px] uppercase tracking-wider">
                  Preparation Instructions
                </span>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  {meal.instructions}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        <div className="flex items-center space-x-2 pt-3 border-t border-forest-50">
          <button
            onClick={() => setShowRecipe(!showRecipe)}
            className="flex-1 py-2 px-3 rounded-xl border border-forest-200 hover:bg-forest-50 text-forest-800 text-xs font-bold transition flex items-center justify-center space-x-1"
          >
            <span>{showRecipe ? 'Hide Details' : 'View Recipe'}</span>
            {showRecipe ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}
              className="py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Set Highlight</span>
            </button>

            {/* Day Selector Dropdown */}
            {showScheduleDropdown && (
              <div className="absolute right-0 bottom-10 w-44 bg-white rounded-2xl shadow-xl border border-forest-100 p-2 z-20 space-y-1 animate-in fade-in duration-150">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1 block">
                  Select Day
                </span>
                {days.map((day) => (
                  <button
                    key={day}
                    onClick={() => handleAddToDay(day)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-dark hover:bg-forest-50 hover:text-forest-900 transition flex items-center justify-between"
                  >
                    <span>{day}</span>
                    <Utensils className="w-3 h-3 text-forest-600" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {justAddedDay && (
          <div className="p-2 rounded-xl bg-forest-100 text-forest-900 text-[11px] font-bold flex items-center space-x-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest-800" />
            <span>Scheduled as {justAddedDay}'s highlight meal!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
