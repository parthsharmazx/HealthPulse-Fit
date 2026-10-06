import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  CalendarPlus,
  Check,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const ExerciseCard = ({ exercise }) => {
  const { addExerciseToSchedule } = useFitness();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
  const [justAddedDay, setJustAddedDay] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddToDay = (day) => {
    addExerciseToSchedule(day, exercise.name);
    setJustAddedDay(day);
    setShowScheduleDropdown(false);
    setTimeout(() => setJustAddedDay(null), 2500);
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Intermediate':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-purple-50 text-purple-800 border-purple-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-forest-100 shadow-soft hover:shadow-soft-lg transition-all duration-200 p-6 flex flex-col justify-between group">
      <div>
        {/* Visual Cue Banner / Demo Header */}
        <div className="relative h-32 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-950 p-4 text-white flex flex-col justify-between overflow-hidden mb-4">
          <div className="flex justify-between items-start z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
              {exercise.category}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${getDifficultyColor(exercise.difficulty)}`}>
              {exercise.difficulty}
            </span>
          </div>

          <div className="z-10 flex items-end justify-between">
            <div>
              <span className="text-[11px] text-sage-300 font-semibold block">{exercise.equipment}</span>
              <h3 className="text-base font-extrabold text-white leading-tight">{exercise.name}</h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-forest-700/80 backdrop-blur-md flex items-center justify-center text-sage-300">
              <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition transform" />
            </div>
          </div>

          {/* Background Decorative Rings */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border-4 border-white/10 pointer-events-none" />
          <div className="absolute -right-2 -bottom-2 w-20 h-20 rounded-full border-2 border-white/10 pointer-events-none" />
        </div>

        {/* Target Muscles */}
        <div className="space-y-1 mb-4">
          <div className="text-[10px] font-bold uppercase text-gray-400">Primary Target</div>
          <div className="text-xs font-bold text-forest-900">{exercise.targetMuscle}</div>
          {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {exercise.secondaryMuscles.map((sec, idx) => (
                <span key={idx} className="text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5 rounded-md font-medium">
                  {sec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stats Grid: Sets, Reps, Rest, Calories */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-forest-50/50 border border-forest-100/70 text-xs mb-4">
          <div>
            <span className="text-[10px] text-gray-400 block font-semibold">Volume</span>
            <span className="font-extrabold text-slate-dark">{exercise.sets} × {exercise.reps}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block font-semibold">Rest</span>
            <span className="font-bold text-slate-dark">{exercise.restTime || '60s'}</span>
          </div>
          <div className="col-span-2 pt-1 border-t border-forest-100/40 flex items-center justify-between text-[11px]">
            <span className="text-gray-500 flex items-center space-x-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Est. Burn:</span>
            </span>
            <span className="font-bold text-orange-700">{exercise.caloriesBurned}</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4">
          {exercise.description}
        </p>

        {/* Expandable Step-by-Step Form Instructions */}
        {showInstructions && (
          <div className="p-3.5 rounded-2xl bg-[#F4FAF5] border border-forest-200/80 mb-4 animate-in slide-in-from-top-2 duration-200 space-y-2">
            <div className="text-[11px] font-bold text-forest-950 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-forest-700" />
              <span>Form & Execution Guide</span>
            </div>
            <ol className="space-y-1.5 text-xs text-slate-dark/90 pl-4 list-decimal marker:text-forest-700 marker:font-bold">
              {exercise.instructions?.map((step, idx) => (
                <li key={idx} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Card Action Row */}
      <div className="space-y-2 pt-2 border-t border-forest-50">
        <div className="flex items-center space-x-2">
          {/* Instructions toggle */}
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex-1 py-2 px-3 rounded-xl border border-forest-200 hover:bg-forest-50 text-forest-800 text-xs font-bold transition flex items-center justify-center space-x-1"
          >
            <span>{showInstructions ? 'Hide Form' : 'Form Cues'}</span>
            {showInstructions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Schedule button */}
          <div className="relative">
            <button
              onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}
              className="py-2 px-3 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold transition flex items-center space-x-1.5 shadow-sm"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add to Plan</span>
            </button>

            {/* Day Selector Popup */}
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
                    <PlusIcon className="w-3 h-3 text-forest-600" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Banner */}
        {justAddedDay && (
          <div className="p-2 rounded-xl bg-forest-100 text-forest-900 text-[11px] font-bold flex items-center space-x-1.5 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest-800" />
            <span>Scheduled for {justAddedDay}!</span>
          </div>
        )}
      </div>
    </div>
  );
};

const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default ExerciseCard;
