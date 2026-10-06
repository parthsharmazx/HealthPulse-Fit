const seedData = require('./seedData');

class MemoryStore {
  constructor() {
    this.users = JSON.parse(JSON.stringify(seedData.users));
    this.exercises = JSON.parse(JSON.stringify(seedData.exercises));
    this.dietPlans = JSON.parse(JSON.stringify(seedData.dietPlans));
    this.timetable = JSON.parse(JSON.stringify(seedData.timetable));
    this.affiliateProducts = JSON.parse(JSON.stringify(seedData.affiliateProducts));
  }

  // Users
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: 'user_' + Date.now(),
      joinedAt: new Date().toISOString().split('T')[0],
      caloriesConsumedToday: 0,
      macros: {
        protein: 0,
        targetProtein: 150,
        carbs: 0,
        targetCarbs: 250,
        fats: 0,
        targetFats: 65
      },
      waterIntakeMl: 0,
      waterTargetMl: 3000,
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.users.findIndex(u => u._id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  // Exercises
  getExercises({ category, muscle, search } = {}) {
    let result = [...this.exercises];
    if (category) {
      result = result.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    if (muscle && muscle !== 'All') {
      result = result.filter(e => 
        e.targetMuscle.toLowerCase().includes(muscle.toLowerCase()) ||
        (e.secondaryMuscles && e.secondaryMuscles.some(m => m.toLowerCase().includes(muscle.toLowerCase())))
      );
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(q) ||
        e.targetMuscle.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      );
    }
    return result;
  }

  // Diet Plans
  getDietPlans({ dietType, mealType, search } = {}) {
    let result = [...this.dietPlans];
    if (dietType && dietType !== 'All') {
      result = result.filter(d => d.dietType.toLowerCase() === dietType.toLowerCase());
    }
    if (mealType && mealType !== 'All') {
      result = result.filter(d => d.mealType.toLowerCase() === mealType.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d => 
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      );
    }
    return result;
  }

  // Timetable
  getTimetable() {
    return this.timetable;
  }

  toggleTimetableWorkout(day) {
    const item = this.timetable.find(t => t.day.toLowerCase() === day.toLowerCase());
    if (item && item.workout) {
      item.workout.completed = !item.workout.completed;
      return item;
    }
    return null;
  }

  toggleTimetableNutrition(day) {
    const item = this.timetable.find(t => t.day.toLowerCase() === day.toLowerCase());
    if (item && item.nutrition) {
      item.nutrition.completed = !item.nutrition.completed;
      return item;
    }
    return null;
  }

  addCustomWorkoutToDay(day, exerciseName) {
    const item = this.timetable.find(t => t.day.toLowerCase() === day.toLowerCase());
    if (item && item.workout) {
      if (!item.workout.exercises.includes(exerciseName)) {
        item.workout.exercises.push(exerciseName);
      }
      return item;
    }
    return null;
  }

  addCustomMealToDay(day, mealTitle) {
    const item = this.timetable.find(t => t.day.toLowerCase() === day.toLowerCase());
    if (item && item.nutrition) {
      item.nutrition.highlightMeal = mealTitle;
      return item;
    }
    return null;
  }

  // Affiliate
  getAffiliateProducts({ category } = {}) {
    let result = [...this.affiliateProducts];
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return result;
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
