import React from 'react';
import {
  Scale,
  Calendar,
  CheckCircle2,
  Circle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Dumbbell,
  Salad,
  Flame,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';
import CalorieTracker from './CalorieTracker';
import QuickActions from './QuickActions';

const DashboardOverview = () => {
  const { user } = useAuth();
  const { timetable, toggleWorkout, toggleNutrition, setActiveTab } = useFitness();

  // Find today's day of week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todaySchedule = timetable.find(t => t.day.toLowerCase() === currentDayName.toLowerCase()) || timetable[0];

  // Completed workouts this week count
  const completedWorkoutsCount = timetable.filter(t => t.workout?.completed).length;
  const weeklyCompletionRate = Math.round((completedWorkoutsCount / timetable.length) * 100);

  // BMI classification badge color
  const getBmiBadge = (category) => {
    switch (category) {
      case 'Underweight':
        return { bg: 'bg-blue-50 text-blue-800 border-blue-200', label: 'Underweight' };
      case 'Normal Weight':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', label: 'Healthy & Normal' };
      case 'Overweight':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', label: 'Overweight' };
      default:
        return { bg: 'bg-red-50 text-red-800 border-red-200', label: 'Obese' };
    }
  };

  const bmiBadge = getBmiBadge(user?.bmiCategory || 'Normal Weight');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-forest-900 via-forest-800 to-forest-700 text-white p-6 sm:p-8 shadow-soft-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-700/60 border border-forest-600/50 text-xs font-semibold text-sage-200">
              <Sparkles className="w-3.5 h-3.5 text-sage-300" />
              <span>Daily Health & Performance Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name || 'Athlete'}!
            </h1>
            <p className="text-xs sm:text-sm text-forest-100/90 leading-relaxed">
              Your current focus is set to <strong className="text-white underline decoration-sage-400 underline-offset-2">{user?.goal}</strong>. You're on track for your weekly consistency target!
            </p>
          </div>

          {/* Weekly Consistency Metric */}
          <div className="bg-forest-950/40 backdrop-blur-md border border-forest-600/40 rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shrink-0">
            <div className="text-center border-r border-forest-700/60 pr-4">
              <div className="text-2xl sm:text-3xl font-black text-sage-300">{completedWorkoutsCount}/7</div>
              <div className="text-[10px] text-forest-200 uppercase tracking-wider font-bold">Sessions Done</div>
            </div>
            <div className="text-center pl-1">
              <div className="text-2xl sm:text-3xl font-black text-white">{weeklyCompletionRate}%</div>
              <div className="text-[10px] text-forest-200 uppercase tracking-wider font-bold">Consistency</div>
            </div>
          </div>
        </div>

        {/* Decorative SVG Wave/Grid */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none">
          <svg width="400" height="200" viewBox="0 0 400 200" fill="none">
            <circle cx="300" cy="100" r="120" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="300" cy="100" r="80" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <QuickActions />

      {/* At-a-Glance Summary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: BMI Status Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-forest-50">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-sage-50 text-forest-800 border border-sage-200">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-dark text-sm">Current BMI Status</h3>
                  <p className="text-[11px] text-gray-500">Body mass ratio baseline</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${bmiBadge.bg}`}>
                {bmiBadge.label}
              </span>
            </div>

            <div className="mt-5 flex items-baseline space-x-3">
              <span className="text-4xl font-black text-forest-900">{user?.bmi || 22.7}</span>
              <span className="text-xs text-gray-500 font-medium">kg/m²</span>
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-forest-50/50 border border-forest-100/60 space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Height:</span>
                <strong className="text-slate-dark">{user?.height || 178} cm</strong>
              </div>
              <div className="flex justify-between">
                <span>Current Weight:</span>
                <strong className="text-slate-dark">{user?.weight || 72} kg</strong>
              </div>
              <div className="flex justify-between">
                <span>Target Weight:</span>
                <strong className="text-slate-dark">{user?.targetWeight || 75} kg</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('bmi')}
            className="mt-5 w-full py-2.5 rounded-xl border border-forest-200 hover:bg-forest-50 text-forest-800 text-xs font-bold transition flex items-center justify-center space-x-1.5"
          >
            <span>Open Interactive BMI Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 2: Today's Weekly Schedule Snapshot */}
        <div className="bg-white rounded-3xl p-6 border border-forest-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-forest-50">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-forest-50 text-forest-800 border border-forest-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-dark text-sm">Today's Schedule</h3>
                  <p className="text-[11px] text-gray-500">{todaySchedule.day} Routine Snapshot</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-forest-100 text-forest-900">
                {todaySchedule.dayShort}
              </span>
            </div>

            {/* Today's Workout Item */}
            <div className="mt-4 p-3.5 rounded-2xl border border-forest-100 bg-forest-50/30">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <button
                    onClick={() => toggleWorkout(todaySchedule.day)}
                    className="mt-0.5 text-forest-700 hover:scale-110 transition"
                  >
                    {todaySchedule.workout?.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-forest-700 fill-forest-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-forest-700">Workout</span>
                    <h4 className={`text-xs font-bold mt-0.5 ${todaySchedule.workout?.completed ? 'line-through text-gray-400' : 'text-slate-dark'}`}>
                      {todaySchedule.workout?.title}
                    </h4>
                    <span className="text-[11px] text-gray-500 flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span>{todaySchedule.workout?.duration}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Highlight Meal */}
            <div className="mt-3 p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/20">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2.5">
                  <button
                    onClick={() => toggleNutrition(todaySchedule.day)}
                    className="mt-0.5 text-emerald-700 hover:scale-110 transition"
                  >
                    {todaySchedule.nutrition?.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Nutrition Focus</span>
                    <h4 className={`text-xs font-bold mt-0.5 ${todaySchedule.nutrition?.completed ? 'line-through text-gray-400' : 'text-slate-dark'}`}>
                      {todaySchedule.nutrition?.highlightMeal}
                    </h4>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Target: {todaySchedule.nutrition?.caloriesTarget} kcal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('timetable')}
            className="mt-5 w-full py-2.5 rounded-xl border border-forest-200 hover:bg-forest-50 text-forest-800 text-xs font-bold transition flex items-center justify-center space-x-1.5"
          >
            <span>View Full 7-Day Timetable</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card 3: AI Assistant Quick Card */}
        <div className="bg-gradient-to-br from-forest-800 to-forest-900 rounded-3xl p-6 text-white shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-forest-700/60">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-forest-700 text-sage-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">PulseAI Advisor</h3>
                  <p className="text-[11px] text-forest-200">24/7 Intelligent Fitness Coach</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sage-400 text-forest-950">
                Online
              </span>
            </div>

            <p className="text-xs text-forest-100 mt-5 leading-relaxed">
              Ask PulseAI questions about compound lifting biomechanics, customized macro splits, or meal ideas matching your {user?.goal?.toLowerCase()} goals.
            </p>

            <div className="mt-4 space-y-2">
              <div className="text-[11px] p-2.5 rounded-xl bg-forest-700/50 border border-forest-600/50 text-forest-100">
                💬 "What is the optimal protein intake for hypertrophy?"
              </div>
              <div className="text-[11px] p-2.5 rounded-xl bg-forest-700/50 border border-forest-600/50 text-forest-100">
                💬 "15-min fat burn HIIT workout without weights"
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('chatbot')}
            className="mt-5 w-full py-3 rounded-xl bg-sage-400 hover:bg-sage-300 text-forest-950 text-xs font-extrabold shadow-md transition flex items-center justify-center space-x-1.5"
          >
            <span>Start AI Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Calorie Tracker Full Card */}
      <CalorieTracker />
    </div>
  );
};

export default DashboardOverview;
