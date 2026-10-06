import React from 'react';
import { Bot, Dumbbell, Scale, Salad, CalendarCheck, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

const QuickActions = () => {
  const { setActiveTab } = useFitness();

  const actions = [
    {
      id: 'chatbot',
      title: 'Ask PulseAI',
      description: 'Get instant nutrition advice, workout tips & scientific form guidance.',
      icon: Bot,
      color: 'bg-forest-800 text-white',
      badge: 'AI Coach',
      hoverBorder: 'hover:border-forest-600'
    },
    {
      id: 'workouts',
      title: 'Log Workout',
      description: 'Browse Weight Gain & Fat Loss libraries with recommended sets & reps.',
      icon: Dumbbell,
      color: 'bg-forest-50 text-forest-800',
      badge: 'Library',
      hoverBorder: 'hover:border-forest-400'
    },
    {
      id: 'bmi',
      title: 'Calculate BMI',
      description: 'Check real-time body mass index and sync tailored calories to your profile.',
      icon: Scale,
      color: 'bg-sage-100 text-forest-900',
      badge: 'Biometrics',
      hoverBorder: 'hover:border-forest-400'
    },
    {
      id: 'diets',
      title: 'Nutrition Plans',
      description: 'Explore curated Vegetarian and Non-Vegetarian high-protein meals.',
      icon: Salad,
      color: 'bg-emerald-50 text-emerald-800',
      badge: 'Macros',
      hoverBorder: 'hover:border-emerald-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            onClick={() => setActiveTab(act.id)}
            className={`group text-left p-5 rounded-3xl bg-white border border-forest-100/90 shadow-soft transition-all duration-200 transform hover:-translate-y-1 hover:shadow-soft-lg ${act.hoverBorder}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${act.color} shadow-sm transition group-hover:scale-105`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-forest-50 text-forest-800">
                  {act.badge}
                </span>
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-forest-700 transition" />
              </div>
            </div>

            <h4 className="font-bold text-slate-dark text-sm group-hover:text-forest-800 transition">
              {act.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
              {act.description}
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default QuickActions;
