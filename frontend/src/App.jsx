import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useFitness } from './context/FitnessContext';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import BMICalculator from './components/BMI/BMICalculator';
import AIChatbot from './components/Chatbot/AIChatbot';
import ExerciseLibrary from './components/Workouts/ExerciseLibrary';
import DietPlans from './components/Diets/DietPlans';
import WeeklyPlanner from './components/Timetable/WeeklyPlanner';
import AffiliateStore from './components/Affiliate/AffiliateStore';

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const { activeTab } = useFitness();
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  // Loading spinner during auth check
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-forest-800 flex items-center justify-center animate-bounce shadow-lg">
            <span className="w-4 h-4 rounded-full bg-sage-300" />
          </div>
          <span className="text-xs font-bold text-forest-900 tracking-wider uppercase">Loading HealthPulse...</span>
        </div>
      </div>
    );
  }

  // 1. First Screen for Users: Secure Login / Signup Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F9FBF9] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background ambient decorative glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-forest-100/60 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sage-200/50 blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col items-center">
          {authView === 'login' ? (
            <Login onSwitchToSignup={() => setAuthView('signup')} />
          ) : (
            <Signup onSwitchToLogin={() => setAuthView('login')} />
          )}

          <div className="mt-8 text-center text-xs text-gray-400">
            <p>HealthPulse & Fit © 2026. Enterprise Healthcare & Fitness Architecture.</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Main Authenticated Application Shell
  return (
    <div className="min-h-screen bg-[#F9FBF9] flex flex-col selection:bg-sage-300 selection:text-forest-950">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardOverview />}
        {activeTab === 'bmi' && <BMICalculator />}
        {activeTab === 'chatbot' && <AIChatbot />}
        {activeTab === 'workouts' && <ExerciseLibrary />}
        {activeTab === 'diets' && <DietPlans />}
        {activeTab === 'timetable' && <WeeklyPlanner />}
        {activeTab === 'affiliate' && <AffiliateStore />}
      </main>

      <Footer />
    </div>
  );
};

export default App;
