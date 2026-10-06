import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import {
  defaultExercises,
  defaultDietPlans,
  defaultTimetable,
  defaultAffiliateProducts
} from '../data/defaultData';

const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timetable, setTimetable] = useState(defaultTimetable);
  const [exercises, setExercises] = useState(defaultExercises);
  const [dietPlans, setDietPlans] = useState(defaultDietPlans);
  const [affiliateProducts, setAffiliateProducts] = useState(defaultAffiliateProducts);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Water Intake Goal',
      message: 'You are 800ml away from your 3,200ml hydration target today.',
      time: '15m ago',
      read: false,
      type: 'hydration'
    },
    {
      id: 2,
      title: 'Workout Completed! 🏆',
      message: 'Upper Body Heavy Push session marked as finished.',
      time: '2h ago',
      read: false,
      type: 'workout'
    },
    {
      id: 3,
      title: 'Post-Workout Fuel',
      message: 'Time for your High-Protein meal: Chicken & Sweet Potato Mash.',
      time: '3h ago',
      read: true,
      type: 'nutrition'
    }
  ]);

  // Load live data from backend with fallback
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [timeRes, exRes, dietRes, affRes] = await Promise.allSettled([
          api.getTimetable(),
          api.getExercises(),
          api.getDietPlans(),
          api.getAffiliateProducts()
        ]);

        if (timeRes.status === 'fulfilled' && timeRes.value) setTimetable(timeRes.value);
        if (exRes.status === 'fulfilled' && exRes.value) setExercises(exRes.value);
        if (dietRes.status === 'fulfilled' && dietRes.value) setDietPlans(dietRes.value);
        if (affRes.status === 'fulfilled' && affRes.value) setAffiliateProducts(affRes.value);

        setIsBackendConnected(true);
      } catch {
        setIsBackendConnected(false);
      }
    };

    fetchData();
  }, []);

  // Timetable Toggles with Confetti celebration
  const toggleWorkout = async (day) => {
    // Optimistic UI update
    setTimetable(prev =>
      prev.map(item => {
        if (item.day.toLowerCase() === day.toLowerCase()) {
          const nextCompleted = !item.workout.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.7 },
              colors: ['#2E7D32', '#81C784', '#4CAF50']
            });
          }
          return {
            ...item,
            workout: { ...item.workout, completed: nextCompleted }
          };
        }
        return item;
      })
    );

    try {
      await api.toggleTimetableWorkout(day);
    } catch {
      // Local state already updated
    }
  };

  const toggleNutrition = async (day) => {
    setTimetable(prev =>
      prev.map(item => {
        if (item.day.toLowerCase() === day.toLowerCase()) {
          const nextCompleted = !item.nutrition.completed;
          if (nextCompleted) {
            confetti({
              particleCount: 50,
              spread: 45,
              origin: { y: 0.7 },
              colors: ['#81C784', '#66BB6A', '#F9FBF9']
            });
          }
          return {
            ...item,
            nutrition: { ...item.nutrition, completed: nextCompleted }
          };
        }
        return item;
      })
    );

    try {
      await api.toggleTimetableNutrition(day);
    } catch {
      // Handled in local state
    }
  };

  // Add exercise to weekly timetable
  const addExerciseToSchedule = async (day, exerciseName) => {
    setTimetable(prev =>
      prev.map(item => {
        if (item.day.toLowerCase() === day.toLowerCase()) {
          if (!item.workout.exercises.includes(exerciseName)) {
            return {
              ...item,
              workout: {
                ...item.workout,
                exercises: [...item.workout.exercises, exerciseName]
              }
            };
          }
        }
        return item;
      })
    );

    try {
      await api.addScheduleItem(day, 'exercise', exerciseName);
    } catch {
      // Handled in local state
    }

    addNotification({
      title: 'Workout Scheduled',
      message: `Added "${exerciseName}" to ${day}'s routine!`,
      type: 'workout'
    });
  };

  // Add meal to weekly timetable
  const addMealToSchedule = async (day, mealTitle) => {
    setTimetable(prev =>
      prev.map(item => {
        if (item.day.toLowerCase() === day.toLowerCase()) {
          return {
            ...item,
            nutrition: {
              ...item.nutrition,
              highlightMeal: mealTitle
            }
          };
        }
        return item;
      })
    );

    try {
      await api.addScheduleItem(day, 'meal', mealTitle);
    } catch {
      // Handled in local state
    }

    addNotification({
      title: 'Nutrition Scheduled',
      message: `Set "${mealTitle}" as ${day}'s highlight meal!`,
      type: 'nutrition'
    });
  };

  const addNotification = ({ title, message, type = 'general' }) => {
    const newNotif = {
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <FitnessContext.Provider
      value={{
        activeTab,
        setActiveTab,
        timetable,
        toggleWorkout,
        toggleNutrition,
        addExerciseToSchedule,
        addMealToSchedule,
        exercises,
        dietPlans,
        affiliateProducts,
        notifications,
        addNotification,
        markAllNotificationsAsRead,
        clearNotification,
        isBackendConnected
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => useContext(FitnessContext);
