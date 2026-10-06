import React, { useState } from 'react';
import { Activity, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = ({ onSwitchToSignup }) => {
  const { login, demoLogin, loading } = useAuth();
  const [email, setEmail] = useState('alex@healthpulse.fit');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError(result.message || 'Invalid credentials. Try our 1-click Demo Login!');
    }
  };

  const handleDemoClick = async () => {
    setError('');
    await demoLogin();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-forest-900/5 border border-forest-100 p-8 sm:p-10 transition-all">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-forest-800 flex items-center justify-center text-white shadow-md shadow-forest-800/20 mb-4">
          <Activity className="w-8 h-8 text-sage-300" />
        </div>
        <h2 className="text-2xl font-bold text-slate-dark tracking-tight">Welcome Back</h2>
        <p className="text-xs text-gray-500 mt-1">Access your health metrics, custom routines & nutrition</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-forest-50 p-1 rounded-2xl mb-6 border border-forest-100">
        <button
          className="flex-1 py-2 text-xs font-bold rounded-xl bg-forest-800 text-white shadow-sm transition"
        >
          Sign In
        </button>
        <button
          onClick={onSwitchToSignup}
          className="flex-1 py-2 text-xs font-bold rounded-xl text-gray-600 hover:text-forest-800 transition"
        >
          Create Account
        </button>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-dark mb-1.5">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@healthpulse.fit"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-forest-600 focus:ring-2 focus:ring-forest-100 text-xs text-slate-dark outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-dark mb-1.5">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-forest-600 focus:ring-2 focus:ring-forest-100 text-xs text-slate-dark outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs shadow-md shadow-forest-800/20 flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5"
        >
          <span>{loading ? 'Authenticating...' : 'Sign In to HealthPulse'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-forest-100"></div>
        </div>
        <span className="relative px-3 bg-white text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Instant Evaluation
        </span>
      </div>

      {/* 1-Click Demo Login */}
      <button
        type="button"
        onClick={handleDemoClick}
        disabled={loading}
        className="w-full py-3 px-4 rounded-xl bg-sage-50 border-2 border-sage-300/80 hover:bg-sage-100/60 text-forest-900 font-bold text-xs flex items-center justify-center space-x-2 transition transform hover:-translate-y-0.5"
      >
        <Sparkles className="w-4 h-4 text-forest-700" />
        <span>1-Click Quick Demo Login (Alex Morgan)</span>
      </button>

      {/* Feature highlights */}
      <div className="mt-8 pt-6 border-t border-forest-50 grid grid-cols-2 gap-2 text-[11px] text-gray-500 font-medium">
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
          <span>Real-time BMI Hub</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
          <span>PulseAI Chatbot</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
          <span>Hypertrophy / HIIT</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-forest-600" />
          <span>Veg & Non-Veg Macros</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
