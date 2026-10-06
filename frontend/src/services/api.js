// API Service Layer for HealthPulse & Fit
// Handles communication with Express backend with offline-resilient fallback

const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('healthpulse_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth endpoints
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Login failed');
    }
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Registration failed');
    }
    return res.json();
  },

  async demoLogin() {
    const res = await fetch(`${API_BASE}/auth/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Demo login failed');
    }
    return res.json();
  },

  async getProfile() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load profile');
    return res.json();
  },

  async updateProfile(updates) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update profile');
    return res.json();
  },

  // Exercises
  async getExercises(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/exercises${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch exercises');
    return res.json();
  },

  // Diets
  async getDietPlans(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/diets${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch diet plans');
    return res.json();
  },

  // Timetable
  async getTimetable() {
    const res = await fetch(`${API_BASE}/timetable`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch timetable');
    return res.json();
  },

  async toggleTimetableWorkout(day) {
    const res = await fetch(`${API_BASE}/timetable/${day}/toggle-workout`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to toggle workout');
    return res.json();
  },

  async toggleTimetableNutrition(day) {
    const res = await fetch(`${API_BASE}/timetable/${day}/toggle-nutrition`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to toggle nutrition');
    return res.json();
  },

  async addScheduleItem(day, type, text) {
    const res = await fetch(`${API_BASE}/timetable/${day}/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ type, text })
    });
    if (!res.ok) throw new Error('Failed to add schedule item');
    return res.json();
  },

  // Affiliate
  async getAffiliateProducts(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/affiliate${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch affiliate products');
    return res.json();
  },

  // AI Chat
  async sendChatMessage(message, userContext = {}) {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, userContext })
    });
    if (!res.ok) throw new Error('AI service error');
    return res.json();
  }
};
