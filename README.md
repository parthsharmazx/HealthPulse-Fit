# 🌿 HealthPulse & Fit

> **A Production-Ready Full-Stack MERN Healthcare & Fitness Web Application** engineered with React 19, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 🎨 Theme & Design System

HealthPulse & Fit adheres strictly to a clean, clinical yet revitalizing color palette and modern card-based UI/UX system:

- **Forest Green (Primary)**: `#2E7D32` (Actions, Primary Buttons, Brand Headers)
- **Soft Sage (Accent)**: `#81C784` (Interactive Badges, Pulse Icons, Highlights)
- **Mint Light (Background)**: `#F9FBF9` (Clean, Calming Ambient Viewport)
- **Clean White (Card Surfaces)**: `#FFFFFF` (Surface Panels, Modal Drawers, Elevated Cards)
- **Dark Slate (Text)**: `#1B2E1E` (High-Contrast, Accessible Typography)
- **UI Styling**: Rounded corners (`rounded-2xl`, `rounded-3xl`), soft shadows (`shadow-soft`, `shadow-soft-lg`), fluid micro-interactions, Lucide React icons, and celebratory confetti animations upon habit completion.

---

## 🚀 Key Features

### 1. 🔐 Authentication Flow (First Screen for Users)
- **Tab Switching**: Seamlessly toggle between **Sign In** and **Create Account**.
- **1-Click Quick Demo Login**: Instantly test the application with pre-filled test user credentials (`alex@healthpulse.fit` / `demo123`).
- **Profile Initialization**: Collects full name, email, target weight, current weight, height, and primary goal (Weight Gain, Weight Loss, Maintenance).
- **JWT Authentication**: Secure Bearer tokens persisted with fallback for zero-friction evaluation.

### 2. 📊 Dashboard Hub (Overview & Summary Cards)
- **Top Header**: User avatar, time-of-day greeting (*"Good morning / afternoon / evening, Alex 👋"*), real-time notification drawer with badge counter, and quick logout.
- **At-a-Glance Summary Cards**:
  - **Current BMI Status & Category Badge**: Real-time BMI score with WHO classification (*Healthy & Normal, Underweight, Overweight, Obese*).
  - **Daily Calorie Target Progress**: Dynamic progress bar tracking consumed vs target calories with a full macronutrient breakdown (*Protein, Carbs, Fats*) and quick-log buttons (*+200 kcal Shake, +450 kcal Meal, +250ml Water*).
  - **Today's Schedule Snapshot**: One-click check-off for today's prescribed workout and nutrition highlight.
  - **Quick Action Row**: Fast shortcuts to "Ask AI", "Log Workout", "Calculate BMI", and "Nutrition Plans".

### 3. ⚖️ Interactive BMI Calculator Module
- **Metric & Imperial Support**: Toggle between metric (`cm`, `kg`) and imperial (`ft/in`, `lbs`).
- **Interactive Sliders & Number Steppers**: Immediate recalculation as height or weight changes.
- **Visual Spectrum Gauge**: Gradient meter with an accurate marker pin spanning WHO categories.
- **Tailored Prescriptions**: Dynamic nutrition and training recommendations based on category.
- **Save to Profile**: Directly updates your user profile and syncs across the Dashboard in real-time.

### 4. 🤖 PulseAI Fitness & Nutrition Advisor
- **Interactive Chat Interface**: Conversational sports nutrition & biomechanics assistant.
- **Suggestion Pills**: Fast prompts (*"Optimal protein intake for hypertrophy"*, *"15-min HIIT fat burn session"*, *"Creatine guidelines"*).
- **Dual Engine**: Ready for Gemini / OpenAI API keys with an intelligent offline sports science heuristic engine.
- **Prominent Medical Disclaimer**: Clear notice that content is educational and not clinical diagnosis.

### 5. 📅 Weekly Timetable (7-Day Planner)
- **Interactive Monday–Sunday Matrix**: Daily breakdown of strength/cardio sessions and meal highlights.
- **Habit Check-offs**: Interactive checkboxes with **canvas-confetti** celebrations upon completion.
- **Weekly Score Progress Bar**: Tracks cumulative workouts and nutrition compliance across the week.
- **Custom Additions**: Add custom exercises or highlight meals directly to any day.

### 6. 🏋️ Exercise Library (Weight Gain & Loss)
- **Categorized Tabs**:
  - **Weight Gain (Hypertrophy / Compound)**: Squat, Deadlift, Bench Press, Military Press, Weighted Pull-Ups, Romanian Deadlift.
  - **Weight Loss (HIIT / Cardio / Fat Burn)**: Burpee Blitz, Kettlebell Swings, Mountain Climbers, Jump Rope Intervals, Dumbbell Thrusters, Plyo Box Jumps.
- **Filters**: Search by keyword or filter by muscle group (*Legs, Back, Chest, Shoulders, Core, Full Body*).
- **Exercise Cards**: Target & secondary muscles, equipment, volume (sets × reps), rest intervals, estimated calorie burn, expandable step-by-step form cues, and an **"Add to Plan"** scheduler.

### 7. 🥗 Nutrition & Diet Plans (Veg & Non-Veg)
- **Filterable Toggle**:
  - **Vegetarian / Plant-Based**: Spiced Tofu Scramble, Quinoa Edamame Buddha Bowl, Greek Yogurt Crunch, Dal Palak.
  - **Non-Vegetarian**: Smoked Salmon Scramble, Grilled Chicken & Sweet Potato, Whey Isolate Anabolic Shake, Atlantic Salmon Quinoa.
- **Filter by Meal**: All, Breakfast, Lunch, Snack, Dinner.
- **Macronutrient Breakdown**: Visual progress bars for Protein (g), Carbohydrates (g), and Healthy Fats (g).
- **Full Day Energy Snapshot**: Total calories and macros calculated dynamically.
- **Expandable Recipe Drawer**: Full ingredients list and preparation directions.

### 8. 🛍️ Affiliate Fitness Marketplace
- **Curated Products**:
  - **Supplements**: Optimum Nutrition Whey Isolate, Creapure Creatine Monohydrate, Organic Ashwagandha KSM-66.
  - **Gym Gear**: ProGrade Fabric Resistance Bands, Quick-Dial Adjustable Dumbbells, Eco Yoga & Exercise Mat (8mm).
  - **Literature**: Atomic Habits by James Clear, Bigger Leaner Stronger by Michael Matthews.
- **Product Cards**: Badges (*"Bestseller #1"*, *"Editor Choice"*), star ratings, reviews count, discounts, features, and custom affiliate referral links (`?tag=healthpulse-20`).
- **FTC Affiliate Disclosure**: Prominent compliance notice adhering to transparency guidelines.

---

## 📂 Project Architecture

```
d:\Health Care\
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection with seamless MemoryStore auto-fallback
│   ├── controllers/
│   │   ├── authController.js     # JWT auth, register, login, demo bypass, profile update
│   │   ├── exerciseController.js # Exercise retrieval, goal & muscle filtering
│   │   ├── dietController.js     # Diet plans retrieval, veg/non-veg & meal filtering
│   │   ├── timetableController.js# Weekly schedule, workout/nutrition toggles, custom items
│   │   ├── affiliateController.js# Curated gear, supplements, books & affiliate links
│   │   └── aiController.js       # PulseAI assistant with Gemini/heuristic sports engine
│   ├── data/
│   │   ├── seedData.js           # Curated realistic exercise, diet, timetable & affiliate datasets
│   │   └── memoryStore.js        # Reactive in-memory database store for instant offline running
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # Mongoose User schema (biometrics, calories, macros)
│   │   ├── Exercise.js           # Mongoose Exercise schema (muscles, reps, visual)
│   │   ├── DietPlan.js           # Mongoose DietPlan schema (macros, ingredients, prep)
│   │   ├── Timetable.js          # Mongoose Timetable schema (Mon-Sun schedule)
│   │   └── AffiliateProduct.js   # Mongoose AffiliateProduct schema (reviews, discounts, links)
│   ├── routes/                   # Modular Express routers (/api/auth, /api/exercises, etc.)
│   ├── server.js                 # Express server entrypoint
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx     # Modern tabbed login with 1-click Demo button
│   │   │   │   └── Signup.jsx    # Registration with goal selector & live BMI preview
│   │   │   ├── Common/
│   │   │   │   ├── Navbar.jsx    # Header with greeting, notifications bell, user avatar, tabs
│   │   │   │   ├── Footer.jsx    # Footer with Medical and FTC Affiliate Disclaimers
│   │   │   │   └── NotificationModal.jsx # Dropdown notifications drawer
│   │   │   ├── Dashboard/
│   │   │   │   ├── DashboardOverview.jsx # Hub overview with summary cards
│   │   │   │   ├── CalorieTracker.jsx    # Calorie & macro progress bars with quick logs
│   │   │   │   └── QuickActions.jsx      # Navigation shortcuts
│   │   │   ├── BMI/
│   │   │   │   ├── BMICalculator.jsx     # Height/weight sliders & profile sync
│   │   │   │   └── BMIGauge.jsx          # Spectrum meter & tailored guidance
│   │   │   ├── Chatbot/
│   │   │   │   └── AIChatbot.jsx         # PulseAI interactive coach with disclaimer banner
│   │   │   ├── Workouts/
│   │   │   │   ├── ExerciseLibrary.jsx   # Weight Gain vs Loss tabs & muscle filters
│   │   │   │   └── ExerciseCard.jsx      # Card with volume, form cues & schedule button
│   │   │   ├── Diets/
│   │   │   │   ├── DietPlans.jsx         # Veg vs Non-Veg toggle & daily totals summary
│   │   │   │   └── MealCard.jsx          # Macro breakdown chips & recipe accordion
│   │   │   ├── Timetable/
│   │   │   │   └── WeeklyPlanner.jsx     # 7-day interactive grid & habit check-offs
│   │   │   └── Affiliate/
│   │   │       └── AffiliateStore.jsx    # Supplements, gear, books & referral links
│   │   ├── context/
│   │   │   ├── AuthContext.jsx           # Global user authentication & session state
│   │   │   └── FitnessContext.jsx        # Timetable, exercise/diet states, confetti triggers
│   │   ├── services/
│   │   │   └── api.js                    # Unified API service with offline fallback
│   │   ├── App.jsx                       # Main application router and auth gate
│   │   ├── main.jsx                      # React 19 mount point
│   │   └── index.css                     # Tailwind utilities and brand scrollbar
│   ├── tailwind.config.js                # Custom Forest Green & Soft Sage palette config
│   ├── vite.config.js                    # Vite configuration with proxy to backend
│   └── package.json
├── package.json                          # Root monorepo scripts
└── README.md
```

---

## 🛠️ Quick Start & Running Locally

### Prerequisites
- **Node.js** (v18+ recommended, v24+ supported)
- **npm** (v9+)
- *(Optional)* **MongoDB** (if not installed or running, the server automatically boots in MemoryStore mode with all features active)

### 1. Run the Backend API Server
```bash
# From the root directory
npm run dev:backend

# Or directly in the backend folder
cd backend
npm run dev
```
The backend starts on `http://localhost:5000`. You can test the health endpoint at:
`http://localhost:5000/api/health`

### 2. Run the Frontend Development Server
```bash
# From the root directory
npm run dev:frontend

# Or directly in the frontend folder
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build:frontend
```
Production assets will be built cleanly to `frontend/dist/`.

---

## 🔑 Demo Credentials

| Role | Email | Password | Goal |
|---|---|---|---|
| **Demo Athlete** | `alex@healthpulse.fit` | `demo123` | Weight Gain (Hypertrophy) |

*You can also click the **"1-Click Quick Demo Login"** button on the sign-in screen to authenticate instantly.*

---

## 🛡️ Disclaimers
- **Medical Disclaimer**: HealthPulse & Fit and PulseAI are intended for educational and general fitness tracking purposes only. They are not substitutes for medical advice, clinical diagnosis, or treatment.
- **Affiliate Disclosure**: When you buy through links in our Affiliate Store, HealthPulse & Fit may earn an affiliate commission at zero additional cost to you.
