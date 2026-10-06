import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { defaultUser } from '../data/defaultData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('healthpulse_token'));
  const [loading, setLoading] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('healthpulse_token');
      const storedUser = localStorage.getItem('healthpulse_user');

      if (storedToken && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
          // Try refreshing profile from backend
          const fresh = await api.getProfile();
          if (fresh) {
            setUser(fresh);
            localStorage.setItem('healthpulse_user', JSON.stringify(fresh));
          }
        } catch {
          // If backend offline, keep stored session
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('healthpulse_token', data.token);
      localStorage.setItem('healthpulse_user', JSON.stringify(data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      // If local test match demo
      if (email.toLowerCase() === 'alex@healthpulse.fit' && password === 'demo123') {
        const demo = defaultUser;
        setUser(demo);
        setToken(demo.token);
        localStorage.setItem('healthpulse_token', demo.token);
        localStorage.setItem('healthpulse_user', JSON.stringify(demo));
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await api.register(userData);
      setUser(data);
      setToken(data.token);
      localStorage.setItem('healthpulse_token', data.token);
      localStorage.setItem('healthpulse_user', JSON.stringify(data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      // Local fallback registration
      const height = Number(userData.height) || 175;
      const weight = Number(userData.weight) || 70;
      const heightM = height / 100;
      const bmi = parseFloat((weight / (heightM * heightM)).toFixed(1));
      let category = 'Normal Weight';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal Weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';

      const newUser = {
        ...defaultUser,
        _id: 'user_' + Date.now(),
        name: userData.name,
        email: userData.email,
        goal: userData.goal,
        height,
        weight,
        targetWeight: Number(userData.targetWeight) || weight,
        bmi,
        bmiCategory: category,
        dailyCalorieTarget: userData.goal?.includes('Loss') ? 2000 : 2500,
        caloriesConsumedToday: 0
      };

      setUser(newUser);
      setToken(newUser.token);
      localStorage.setItem('healthpulse_token', newUser.token);
      localStorage.setItem('healthpulse_user', JSON.stringify(newUser));
      setLoading(false);
      return { success: true };
    }
  };

  const demoLogin = async () => {
    setLoading(true);
    try {
      const data = await api.demoLogin();
      setUser(data);
      setToken(data.token);
      localStorage.setItem('healthpulse_token', data.token);
      localStorage.setItem('healthpulse_user', JSON.stringify(data));
    } catch {
      // Instant offline demo load
      setUser(defaultUser);
      setToken(defaultUser.token);
      localStorage.setItem('healthpulse_token', defaultUser.token);
      localStorage.setItem('healthpulse_user', JSON.stringify(defaultUser));
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('healthpulse_token');
    localStorage.removeItem('healthpulse_user');
  };

  const updateProfile = async (updates) => {
    try {
      const updated = await api.updateProfile(updates);
      setUser(updated);
      localStorage.setItem('healthpulse_user', JSON.stringify(updated));
      return updated;
    } catch {
      // Local optimistic update
      setUser(prev => {
        const next = { ...prev, ...updates };
        if (updates.height || updates.weight) {
          const h = updates.height || prev.height;
          const w = updates.weight || prev.weight;
          const hm = h / 100;
          const bmi = parseFloat((w / (hm * hm)).toFixed(1));
          let category = 'Normal Weight';
          if (bmi < 18.5) category = 'Underweight';
          else if (bmi < 25) category = 'Normal Weight';
          else if (bmi < 30) category = 'Overweight';
          else category = 'Obese';
          next.bmi = bmi;
          next.bmiCategory = category;
        }
        localStorage.setItem('healthpulse_user', JSON.stringify(next));
        return next;
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        demoLogin,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
