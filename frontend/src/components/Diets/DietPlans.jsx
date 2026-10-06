import React, { useState } from 'react';
import { Salad, Leaf, Beef, Search, Flame, PieChart, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import MealCard from './MealCard';

const DietPlans = () => {
  const { dietPlans } = useFitness();
  const [dietType, setDietType] = useState('Vegetarian'); // 'Vegetarian' or 'Non-Vegetarian'
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const mealTypes = ['All', 'Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const filteredMeals = dietPlans.filter((meal) => {
    const matchDiet = meal.dietType === dietType;
    const matchType = selectedMealType === 'All' || meal.mealType.toLowerCase() === selectedMealType.toLowerCase();
    const matchSearch =
      !searchQuery ||
      meal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDiet && matchType && matchSearch;
  });

  // Calculate daily totals for the currently selected diet plan
  const planMeals = dietPlans.filter(m => m.dietType === dietType);
  const totalCalories = planMeals.reduce((acc, m) => acc + m.calories, 0);
  const totalProtein = planMeals.reduce((acc, m) => acc + m.macros.protein, 0);
  const totalCarbs = planMeals.reduce((acc, m) => acc + m.macros.carbs, 0);
  const totalFats = planMeals.reduce((acc, m) => acc + m.macros.fats, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
              <Salad className="w-3.5 h-3.5" />
              <span>Scientific Nutritional Architecture</span>
            </div>
            <h2 className="text-2xl font-black text-slate-dark tracking-tight">Nutrition & Diet Plans</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Calibrated macronutrient ratios for muscle preservation, cellular recovery, and clean sustained energy. Filter by preference and add highlights to your weekly planner.
            </p>
          </div>

          {/* Veg vs Non-Veg Toggle */}
          <div className="bg-forest-50 p-1.5 rounded-2xl flex border border-forest-100 self-start md:self-auto">
            <button
              onClick={() => {
                setDietType('Vegetarian');
                setSelectedMealType('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                dietType === 'Vegetarian'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Vegetarian / Plant</span>
            </button>
            <button
              onClick={() => {
                setDietType('Non-Vegetarian');
                setSelectedMealType('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                dietType === 'Non-Vegetarian'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              <Beef className="w-4 h-4 text-amber-400" />
              <span>Non-Vegetarian</span>
            </button>
          </div>
        </div>

        {/* Daily Macros Snapshot Summary Bar */}
        <div className="mt-6 pt-6 border-t border-forest-50 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-forest-50/50 border border-forest-100/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Full Day Energy</span>
              <strong className="text-sm font-extrabold text-slate-dark">{totalCalories} kcal</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-forest-100 text-forest-700">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Protein</span>
              <strong className="text-sm font-extrabold text-forest-800">{totalProtein}g</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Carbs</span>
              <strong className="text-sm font-extrabold text-amber-800">{totalCarbs}g</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase block">Healthy Fats</span>
              <strong className="text-sm font-extrabold text-emerald-800">{totalFats}g</strong>
            </div>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-slate-dark focus:border-forest-600 focus:ring-2 focus:ring-forest-100 outline-none transition"
            />
          </div>

          {/* Meal Timing Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {mealTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMealType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedMealType === type
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-forest-50 text-gray-600 hover:bg-forest-100 hover:text-forest-900 border border-forest-100/60'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMeals.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-forest-100 p-8">
            <Salad className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-dark text-sm">No meal plans found</h3>
            <p className="text-xs text-gray-500 mt-1">Try resetting the meal type filter or search keyword.</p>
          </div>
        ) : (
          filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))
        )}
      </div>
    </div>
  );
};

export default DietPlans;
