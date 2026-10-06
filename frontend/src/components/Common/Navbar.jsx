import React, { useState } from 'react';
import {
  Activity,
  LayoutDashboard,
  Scale,
  Bot,
  Dumbbell,
  Salad,
  CalendarCheck,
  ShoppingBag,
  Bell,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFitness } from '../../context/FitnessContext';
import NotificationModal from './NotificationModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { activeTab, setActiveTab, notifications, isBackendConnected } = useFitness();
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bmi', label: 'BMI Hub', icon: Scale },
    { id: 'chatbot', label: 'PulseAI', icon: Bot, badge: 'AI' },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'diets', label: 'Nutrition', icon: Salad },
    { id: 'timetable', label: 'Planner', icon: CalendarCheck },
    { id: 'affiliate', label: 'Store', icon: ShoppingBag }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-forest-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Slogan */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-11 h-11 rounded-2xl bg-forest-800 flex items-center justify-center shadow-md shadow-forest-800/20 text-white transform transition hover:scale-105">
              <Activity className="w-6 h-6 text-sage-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-forest-900">HealthPulse</span>
                <span className="text-xl font-bold tracking-tight text-forest-600">& Fit</span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide">Elite Healthcare & Wellness</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-forest-50/70 p-1.5 rounded-2xl border border-forest-100">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-forest-800 text-white shadow-sm shadow-forest-900/20'
                      : 'text-slate-dark/80 hover:text-forest-800 hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sage-300' : 'text-forest-600'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                      isActive ? 'bg-sage-400 text-forest-950' : 'bg-forest-200 text-forest-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile, Notifications & Quick Logout */}
          <div className="hidden sm:flex items-center space-x-4">
            
            {/* Sync State Badge */}
            <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-forest-50 border border-forest-100 text-[11px] text-forest-800 font-medium">
              <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-500 animate-ping' : 'bg-forest-500'}`} />
              <span>{isBackendConnected ? 'Live MongoDB' : 'Ready'}</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl text-gray-600 hover:text-forest-800 hover:bg-forest-50 transition border border-gray-100"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-forest-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              <NotificationModal
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>

            {/* User Greeting & Avatar */}
            <div className="flex items-center space-x-3 pl-2 border-l border-gray-100">
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-dark">
                  {getGreeting()}, <span className="text-forest-800 font-bold">{user?.name?.split(' ')[0] || 'Member'}</span>
                </div>
                <div className="text-[11px] text-gray-500 font-medium truncate max-w-[130px]">
                  {user?.goal || 'Fitness Journey'}
                </div>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-forest-800 to-sage-400 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-bold text-forest-800 text-sm">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>

              {/* Quick Logout */}
              <button
                onClick={logout}
                title="Log out"
                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-gray-600"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-forest-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-forest-50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-forest-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-forest-800 text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-dark">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.goal}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg flex items-center space-x-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2.5 p-3 rounded-xl text-xs font-semibold text-left transition ${
                    isActive
                      ? 'bg-forest-800 text-white'
                      : 'bg-forest-50/50 text-slate-dark hover:bg-forest-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
