import React, { useState } from 'react';
import { Dumbbell, Search, Filter, Flame, Zap, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import ExerciseCard from './ExerciseCard';

const ExerciseLibrary = () => {
  const { exercises } = useFitness();
  const [activeCategory, setActiveCategory] = useState('Weight Gain'); // 'Weight Gain' or 'Weight Loss'
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const muscleGroups = ['All', 'Legs', 'Back', 'Chest', 'Shoulders', 'Core', 'Full Body'];

  const filteredExercises = exercises.filter((ex) => {
    const matchCategory = ex.category === activeCategory;
    const matchMuscle =
      selectedMuscle === 'All' ||
      ex.targetMuscle.toLowerCase().includes(selectedMuscle.toLowerCase()) ||
      (ex.secondaryMuscles && ex.secondaryMuscles.some(m => m.toLowerCase().includes(selectedMuscle.toLowerCase())));
    const matchSearch =
      !searchQuery ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.targetMuscle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchMuscle && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest-100 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 text-forest-800 text-xs font-bold mb-2">
              <Dumbbell className="w-3.5 h-3.5" />
              <span>Evidence-Based Movement Database</span>
            </div>
            <h2 className="text-2xl font-black text-slate-dark tracking-tight">Exercise Library</h2>
            <p className="text-xs text-gray-500 mt-1 max-w-xl">
              Targeted compound lifts for hypertrophy and explosive metabolic conditioning routines for fat loss. Add any exercise directly to your weekly schedule.
            </p>
          </div>

          {/* Goal Categorized Tabs */}
          <div className="bg-forest-50 p-1.5 rounded-2xl flex border border-forest-100 self-start md:self-auto">
            <button
              onClick={() => {
                setActiveCategory('Weight Gain');
                setSelectedMuscle('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                activeCategory === 'Weight Gain'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              <Zap className="w-4 h-4 text-sage-300" />
              <span>Weight Gain (Hypertrophy)</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('Weight Loss');
                setSelectedMuscle('All');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition ${
                activeCategory === 'Weight Loss'
                  ? 'bg-forest-800 text-white shadow-sm'
                  : 'text-gray-600 hover:text-forest-900'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Weight Loss (HIIT & Cardio)</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 pt-6 border-t border-forest-50 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exercise, muscle, equipment..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-slate-dark focus:border-forest-600 focus:ring-2 focus:ring-forest-100 outline-none transition"
            />
          </div>

          {/* Muscle Group Filter Chips */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedMuscle === muscle
                    ? 'bg-forest-800 text-white shadow-sm'
                    : 'bg-forest-50 text-gray-600 hover:bg-forest-100 hover:text-forest-900 border border-forest-100/60'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-forest-100 p-8">
            <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-dark text-sm">No exercises found</h3>
            <p className="text-xs text-gray-500 mt-1">Try clearing your search query or selecting "All" muscle groups.</p>
          </div>
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise._id} exercise={exercise} />
          ))
        )}
      </div>
    </div>
  );
};

export default ExerciseLibrary;
