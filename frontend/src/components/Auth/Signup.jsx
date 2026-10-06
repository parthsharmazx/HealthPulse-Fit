import React, { useState } from 'react';
import { Activity, Lock, Mail, User as UserIcon, Target, Scale, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Signup = ({ onSwitchToLogin }) => {
  const { register, demoLogin, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState('Weight Gain (Hypertrophy)');
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(70);
  const [targetWeight, setTargetWeight] = useState(74);
  const [error, setError] = useState('');

  // Calculate live BMI preview
  const heightM = (height || 175) / 100;
  const bmiVal = ((weight || 70) / (heightM * heightM)).toFixed(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    const result = await register({
      name,
      email,
      password,
      goal,
      height: Number(height),
      weight: Number(weight),
      targetWeight: Number(targetWeight)
    });
    if (!result.success) {
      setError(result.message || 'Registration failed');
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl shadow-forest-900/5 border border-forest-100 p-8 sm:p-10 transition-all">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-800 flex items-center justify-center text-white shadow-md shadow-forest-800/20 mb-3">
          <Activity className="w-8 h-8 text-sage-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-dark tracking-tight">Create Your Profile</h2>
        <p className="text-xs text-gray-500 mt-1">Start your science-based fitness and nutrition journey</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-forest-50 p-1 rounded-2xl mb-6 border border-forest-100">
        <button
          onClick={onSwitchToLogin}
          className="flex-1 py-2 text-xs font-bold rounded-xl text-gray-600 hover:text-forest-800 transition"
        >
          Sign In
        </button>
        <button
          className="flex-1 py-2 text-xs font-bold rounded-xl bg-forest-800 text-white shadow-sm transition"
        >
          Create Account
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-dark mb-1">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Miller"
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:border-forest-600 text-xs text-slate-dark outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-dark mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:border-forest-600 text-xs text-slate-dark outline-none transition"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-dark mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:border-forest-600 text-xs text-slate-dark outline-none transition"
            />
          </div>
        </div>

        {/* Goal Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-dark mb-1.5 flex items-center space-x-1.5">
            <Target className="w-3.5 h-3.5 text-forest-700" />
            <span>Primary Fitness Objective</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'Weight Gain (Hypertrophy)', label: 'Weight Gain', sub: 'Hypertrophy' },
              { id: 'Weight Loss (Fat Burn)', label: 'Weight Loss', sub: 'Fat Burn / HIIT' },
              { id: 'Maintenance & Endurance', label: 'Maintenance', sub: 'Endurance' }
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setGoal(item.id)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  goal === item.id
                    ? 'border-forest-800 bg-forest-50/80 ring-2 ring-forest-800/10'
                    : 'border-gray-200 hover:border-forest-300'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-dark">{item.label}</div>
                <div className="text-[10px] text-gray-500">{item.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Biometrics */}
        <div className="p-3.5 rounded-2xl bg-forest-50/60 border border-forest-100/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-forest-900">
            <span className="flex items-center space-x-1">
              <Scale className="w-4 h-4 text-forest-700" />
              <span>Biometric Baseline</span>
            </span>
            <span className="text-[11px] bg-white px-2 py-0.5 rounded-md border border-forest-100 text-forest-800">
              Est. BMI: <strong className="text-forest-900">{bmiVal}</strong>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">Height (cm)</label>
              <input
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-slate-dark outline-none focus:border-forest-600"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">Weight (kg)</label>
              <input
                type="number"
                min="30"
                max="250"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-slate-dark outline-none focus:border-forest-600"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 mb-1">Target (kg)</label>
              <input
                type="number"
                min="30"
                max="250"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-slate-dark outline-none focus:border-forest-600"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-md shadow-forest-800/20 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5"
        >
          <span>{loading ? 'Creating Your Profile...' : 'Complete Registration'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Demo bypass */}
      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => demoLogin()}
          className="text-xs font-semibold text-forest-700 hover:text-forest-900 inline-flex items-center space-x-1"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Or skip straight to Demo Dashboard &rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
