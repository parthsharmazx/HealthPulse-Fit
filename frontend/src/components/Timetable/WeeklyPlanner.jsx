import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Plus,
  Dumbbell,
  Salad,
  Clock,
  Sparkles,
  Trophy,
  Flame,
  Check
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const WeeklyPlanner = () => {
  const { timetable, toggleWorkout, toggleNutrition, addExerciseToSchedule, addMealToSchedule } = useFitness();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newExercise, setNewExercise] = useState('');
  const [newMeal, setNewMeal] = useState('');

  // Weekly Completion Statistics
  const totalWorkouts = timetable.length;
  const completedWorkouts = timetable.filter(t => t.workout?.completed).length;
  const totalNutrition = timetable.length;
  const completedNutrition = timetable.filter(t => t.nutrition?.completed).length;

  const totalTasks = totalWorkouts + totalNutrition;
  const completedTasks = completedWorkouts + completedNutrition;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

  const activeDaySchedule = timetable.find(t => t.day.toLowerCase() === selectedDay.toLowerCase()) || timetable[0];

  const handleAddCustomExercise = (e) => {
    e.preventDefault();
    if (!newExercise.trim()) return;
    addExerciseToSchedule(selectedDay, newExercise.trim());
    setNewExercise('');
  };

  const handleAddCustomMeal = (e) => {
    e.preventDefault();
    if (!newMeal.trim()) return;
    addMealToSchedule(selectedDay, newMeal.trim());
    setNewMeal('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>7-Day Protocol & Consistency Matrix</span>
            </div>
            <h2 className="text-2xl font-black text-slate-dark tracking-tight">Weekly Timetable Planner</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Track your Monday to Sunday training split and nutritional targets. Check off completed sessions to maintain progressive momentum.
            </p>
          </div>

          {/* Weekly Progress Meter */}
          <div className="bg-forest-50 p-4 rounded-2xl border border-forest-100 min-w-[240px]">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-dark flex items-center space-x-1.5">
                <Trophy className="w-4 h-4 text-forest-700" />
                <span>Weekly Score</span>
              </span>
              <span className="text-forest-800 bg-white px-2 py-0.5 rounded-full border border-forest-200">
                {completionPercentage}% Done
              </span>
            </div>
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden p-0.5 border border-forest-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-forest-700 to-sage-400 transition-all duration-500 shadow-sm"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 mt-2">
              <span>{completedWorkouts}/7 Workouts</span>
              <span>{completedNutrition}/7 Diet Targets</span>
            </div>
          </div>
        </div>

        {/* Monday – Sunday Interactive Day Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-8 pt-6 border-t border-forest-50">
          {timetable.map((item) => {
            const isSelected = selectedDay.toLowerCase() === item.day.toLowerCase();
            const isAllDone = item.workout?.completed && item.nutrition?.completed;
            const isPartiallyDone = item.workout?.completed || item.nutrition?.completed;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-forest-900 text-white border-forest-950 shadow-md ring-2 ring-forest-800/20'
                    : 'bg-white hover:bg-forest-50/60 border-forest-100 text-slate-dark'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-[11px] font-extrabold uppercase ${isSelected ? 'text-sage-300' : 'text-forest-700'}`}>
                    {item.dayShort}
                  </span>
                  {isAllDone ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400" title="All goals complete" />
                  ) : isPartiallyDone ? (
                    <span className="w-2 h-2 rounded-full bg-amber-400" title="Partially complete" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-gray-200" />
                  )}
                </div>

                <div className="mt-3">
                  <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-dark'}`}>
                    {item.day}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-forest-200' : 'text-gray-400'}`}>
                    {item.workout?.completed ? '✓ Workout Done' : 'Pending'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Workout Plan Card for Selected Day */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-forest-100 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-forest-50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-forest-50 text-forest-800 border border-forest-100">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700">
                  {activeDaySchedule.day} Training Protocol
                </span>
                <h3 className="font-extrabold text-slate-dark text-base">
                  {activeDaySchedule.workout?.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => toggleWorkout(activeDaySchedule.day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
                activeDaySchedule.workout?.completed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-forest-100 hover:bg-forest-200 text-forest-900'
              }`}
            >
              {activeDaySchedule.workout?.completed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark Done</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <Clock className="w-4 h-4 text-forest-700" />
            <span>Estimated Duration: <strong>{activeDaySchedule.workout?.duration}</strong></span>
          </div>

          {/* Scheduled Exercises Checklist */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-dark block">
              Prescribed Exercises ({activeDaySchedule.workout?.exercises?.length || 0})
            </span>
            <div className="space-y-2">
              {activeDaySchedule.workout?.exercises?.map((exercise, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition flex items-center justify-between ${
                    activeDaySchedule.workout?.completed
                      ? 'bg-forest-50/40 border-forest-100 text-gray-500 line-through'
                      : 'bg-white border-forest-100/80 text-slate-dark hover:border-forest-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-forest-100 text-forest-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold">{exercise}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Add Custom Exercise to this Day */}
          <form onSubmit={handleAddCustomExercise} className="pt-2 border-t border-forest-50 flex items-center space-x-2">
            <input
              type="text"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              placeholder="Add exercise to this day (e.g. Incline DB Press 3x10)..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-dark outline-none focus:border-forest-600 transition"
            />
            <button
              type="submit"
              disabled={!newExercise.trim()}
              className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white text-xs font-bold transition flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Nutrition Plan Card for Selected Day */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-forest-100 shadow-soft space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-forest-50">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                <Salad className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {activeDaySchedule.day} Dietary Target
                </span>
                <h3 className="font-extrabold text-slate-dark text-base">
                  {activeDaySchedule.nutrition?.focus}
                </h3>
              </div>
            </div>

            <button
              onClick={() => toggleNutrition(activeDaySchedule.day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-sm ${
                activeDaySchedule.nutrition?.completed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
              }`}
            >
              {activeDaySchedule.nutrition?.completed ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Met</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark Met</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/70 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Caloric Target:</span>
              <strong className="font-extrabold text-emerald-900">{activeDaySchedule.nutrition?.caloriesTarget} kcal</strong>
            </div>
            <div className="pt-2 border-t border-emerald-100/50">
              <span className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Highlight Meal</span>
              <h4 className="text-xs font-extrabold text-slate-dark">
                {activeDaySchedule.nutrition?.highlightMeal}
              </h4>
            </div>
          </div>

          {/* Quick Meal Override */}
          <form onSubmit={handleAddCustomMeal} className="pt-2 border-t border-forest-50 flex items-center space-x-2">
            <input
              type="text"
              value={newMeal}
              onChange={(e) => setNewMeal(e.target.value)}
              placeholder="Override highlight meal for this day..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-slate-dark outline-none focus:border-forest-600 transition"
            />
            <button
              type="submit"
              disabled={!newMeal.trim()}
              className="px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-white text-xs font-bold transition flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Update</span>
            </button>
          </form>

          {/* Motivational Tip */}
          <div className="p-3.5 rounded-2xl bg-forest-50/60 border border-forest-100/80 text-[11px] text-gray-600 leading-relaxed flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-forest-700 shrink-0 mt-0.5" />
            <span>
              <strong>Tip:</strong> Completing your weekly nutrition target prevents metabolic slowdown and supports muscular protein synthesis during deep sleep.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanner;
