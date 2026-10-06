const seedData = {
  users: [
    {
      _id: 'user_alex_001',
      name: 'Alex Morgan',
      email: 'alex@healthpulse.fit',
      passwordHash: '$2a$10$Wp8K/d4qCgnm0K9m5m2LRe3yIUkM2rE05q0zF5V6kGqT7qN9a3zC6', // demo123
      age: 27,
      gender: 'male',
      height: 178, // cm
      weight: 72, // kg
      targetWeight: 75,
      goal: 'Weight Gain (Hypertrophy)',
      dailyCalorieTarget: 2500,
      caloriesConsumedToday: 1850,
      macros: {
        protein: 155, // grams consumed
        targetProtein: 170,
        carbs: 210,
        targetCarbs: 280,
        fats: 58,
        targetFats: 70
      },
      waterIntakeMl: 2400,
      waterTargetMl: 3200,
      bmi: 22.7,
      bmiCategory: 'Normal Weight',
      joinedAt: '2026-01-15'
    }
  ],

  exercises: [
    // WEIGHT GAIN (Hypertrophy & Compound)
    {
      _id: 'ex_gain_01',
      name: 'Barbell Back Squat',
      category: 'Weight Gain',
      targetMuscle: 'Legs (Quadriceps, Glutes)',
      secondaryMuscles: ['Hamstrings', 'Lower Back', 'Core'],
      difficulty: 'Intermediate',
      equipment: 'Barbell, Squat Rack',
      sets: '4 sets',
      reps: '8 - 10 reps',
      restTime: '90 - 120s',
      caloriesBurned: '110 kcal / 15 min',
      demoVisual: 'squat',
      description: 'The king of lower-body compound movements. Essential for progressive overload, leg thickness, and whole-body hormonal response.',
      instructions: [
        'Rest the barbell comfortably across your upper traps with a tight shoulder grip.',
        'Set feet shoulder-width apart, toes flared slightly outwards (15-30 degrees).',
        'Break at hips and knees simultaneously, descending until hip crease is below knee level.',
        'Drive through mid-foot to stand back up, keeping chest high and spine neutral.'
      ]
    },
    {
      _id: 'ex_gain_02',
      name: 'Conventional Barbell Deadlift',
      category: 'Weight Gain',
      targetMuscle: 'Back (Latissimus, Traps, Erector Spinae)',
      secondaryMuscles: ['Hamstrings', 'Glutes', 'Forearms'],
      difficulty: 'Advanced',
      equipment: 'Olympic Barbell & Plates',
      sets: '3 sets',
      reps: '5 - 6 reps',
      restTime: '120 - 180s',
      caloriesBurned: '130 kcal / 15 min',
      demoVisual: 'deadlift',
      description: 'Ultimate test of raw posterior-chain strength and spinal stability. Maximizes muscle recruitment from head to toe.',
      instructions: [
        'Stand with feet hip-width apart, bar over mid-foot (about 1 inch from shins).',
        'Hinge at hips, grip the bar just outside knees with overhand or mixed grip.',
        'Engage lats, pack shoulders, and push the floor away without rounding lower back.',
        'Lock out hips at the top with a strong glute squeeze, then control descent.'
      ]
    },
    {
      _id: 'ex_gain_03',
      name: 'Flat Barbell Bench Press',
      category: 'Weight Gain',
      targetMuscle: 'Chest (Pectoralis Major)',
      secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoids'],
      difficulty: 'Intermediate',
      equipment: 'Bench & Barbell',
      sets: '4 sets',
      reps: '8 - 12 reps',
      restTime: '90s',
      caloriesBurned: '95 kcal / 15 min',
      demoVisual: 'bench-press',
      description: 'Foundational upper-body pushing exercise for mass and pressing power.',
      instructions: [
        'Lie back on bench with eyes directly under the racked bar.',
        'Retract scapulae and plant feet firmly on the floor.',
        'Unrack bar, lower with control to lower-sternum touching gently.',
        'Press upward explosively in a slight J-curve back over shoulders.'
      ]
    },
    {
      _id: 'ex_gain_04',
      name: 'Standing Overhead Military Press',
      category: 'Weight Gain',
      targetMuscle: 'Shoulders (Deltoids)',
      secondaryMuscles: ['Triceps', 'Upper Trapezius', 'Core'],
      difficulty: 'Intermediate',
      equipment: 'Barbell',
      sets: '4 sets',
      reps: '8 - 10 reps',
      restTime: '90s',
      caloriesBurned: '85 kcal / 15 min',
      demoVisual: 'overhead-press',
      description: 'Develops wide, boulder shoulders and vertical pressing functional power.',
      instructions: [
        'Clean bar to collarbone height with elbows tucked slightly forward.',
        'Squeeze glutes and brace core to eliminate lower back arch.',
        'Press bar straight overhead, tucking head back slightly until bar clears forehead.',
        'Lock out overhead with bar directly aligned above heels.'
      ]
    },
    {
      _id: 'ex_gain_05',
      name: 'Weighted Pull-Ups',
      category: 'Weight Gain',
      targetMuscle: 'Back (V-Taper Latissimus)',
      secondaryMuscles: ['Biceps', 'Rhomboids', 'Brachialis'],
      difficulty: 'Advanced',
      equipment: 'Pull-up Bar & Dip Belt',
      sets: '4 sets',
      reps: '6 - 8 reps',
      restTime: '90s',
      caloriesBurned: '90 kcal / 15 min',
      demoVisual: 'pull-up',
      description: 'Crucial compound vertical pulling movement for developing wide back wings and arm strength.',
      instructions: [
        'Grip bar with overhand grip wider than shoulders.',
        'Depress shoulder blades down, engage lats and pull chest toward bar.',
        'Pause at the top with chin well over the bar.',
        'Lower with full control through a 3-second eccentric stretch.'
      ]
    },
    {
      _id: 'ex_gain_06',
      name: 'Romanian Dumbbell Deadlift (RDL)',
      category: 'Weight Gain',
      targetMuscle: 'Hamstrings & Glutes',
      secondaryMuscles: ['Adductors', 'Erector Spinae'],
      difficulty: 'Intermediate',
      equipment: 'Pair of Heavy Dumbbells',
      sets: '3 sets',
      reps: '10 - 12 reps',
      restTime: '75s',
      caloriesBurned: '80 kcal / 15 min',
      demoVisual: 'rdl',
      description: 'Eccentric hamstring loading that produces exceptional posterior hypertrophy and knee resilience.',
      instructions: [
        'Hold dumbbells in front of thighs with slight soft knee bend.',
        'Push hips backward towards the back wall while keeping spine neutral.',
        'Lower dumbbells along shins until you feel a deep hamstring stretch.',
        'Drive hips forward to return to standing position.'
      ]
    },

    // WEIGHT LOSS (HIIT, Cardio & Fat Burn)
    {
      _id: 'ex_loss_01',
      name: 'High-Octane Burpee Interval Blitz',
      category: 'Weight Loss',
      targetMuscle: 'Full Body (Cardiovascular)',
      secondaryMuscles: ['Chest', 'Quadriceps', 'Core', 'Deltoids'],
      difficulty: 'Advanced',
      equipment: 'Bodyweight',
      sets: '5 rounds',
      reps: '45s work / 15s rest',
      restTime: '60s between rounds',
      caloriesBurned: '180 kcal / 15 min',
      demoVisual: 'burpee',
      description: 'Maximum heart-rate accelerator and metabolic booster that triggers high EPOC (afterburn effect).',
      instructions: [
        'From standing, drop into a deep squat and plant hands on floor.',
        'Kick feet back into a full push-up position and perform a crisp chest-to-deck push-up.',
        'Hop feet forward back into squat stance and jump upward with hands overhead.',
        'Land softly on balls of feet and immediately flow into next repetition.'
      ]
    },
    {
      _id: 'ex_loss_02',
      name: 'Kettlebell Russian Swings',
      category: 'Weight Loss',
      targetMuscle: 'Glutes, Hamstrings & Core',
      secondaryMuscles: ['Shoulders', 'Forearms', 'Cardiovascular'],
      difficulty: 'Intermediate',
      equipment: 'Kettlebell (16-24 kg)',
      sets: '4 sets',
      reps: '20 reps or 40s',
      restTime: '30s',
      caloriesBurned: '160 kcal / 15 min',
      demoVisual: 'kettlebell',
      description: 'Explosive hip hinge movement that torches body fat while building athletic posterior power.',
      instructions: [
        'Hike kettlebell between legs with flat back and soft knees.',
        'Snap hips forward with maximum glute contraction, propelling bell to chest level.',
        'Let bell freefall back between legs while absorbing weight into hips.',
        'Maintain tall posture; do not squat the kettlebell.'
      ]
    },
    {
      _id: 'ex_loss_03',
      name: 'Mountain Climbers & Plank Taps Combo',
      category: 'Weight Loss',
      targetMuscle: 'Core (Rectus Abdominis, Obliques)',
      secondaryMuscles: ['Shoulders', 'Hip Flexors', 'Cardio'],
      difficulty: 'Beginner',
      equipment: 'Mat (Bodyweight)',
      sets: '4 sets',
      reps: '50s nonstop',
      restTime: '20s',
      caloriesBurned: '120 kcal / 15 min',
      demoVisual: 'mountain-climber',
      description: 'Dynamic plank core burner that keeps the heart rate elevated while tightening the midsection.',
      instructions: [
        'Start in high push-up plank with hands stacked under shoulders.',
        'Rapidly drive alternate knees to chest in a rhythmic running cadence.',
        'Keep hips low and level without bouncing up and down.',
        'Every 10 reps, pause and tap left shoulder with right hand, then vice-versa.'
      ]
    },
    {
      _id: 'ex_loss_04',
      name: 'Speed Jump Rope Intervals',
      category: 'Weight Loss',
      targetMuscle: 'Calves, Shins & Cardiovascular',
      secondaryMuscles: ['Forearms', 'Shoulders', 'Core'],
      difficulty: 'Beginner',
      equipment: 'Speed Jump Rope',
      sets: '6 sets',
      reps: '60s fast skip',
      restTime: '30s',
      caloriesBurned: '175 kcal / 15 min',
      demoVisual: 'jump-rope',
      description: 'Classic boxer conditioning tool for rapid calorie burn, foot coordination, and ankle stiffness.',
      instructions: [
        'Hold rope handles loosely at hip level with elbows tucked close.',
        'Jump just 1-2 inches off the ground using only balls of feet.',
        'Turn rope using wrist rotations rather than entire arms.',
        'Maintain a steady, rhythmic breathing pattern throughout.'
      ]
    },
    {
      _id: 'ex_loss_05',
      name: 'Dumbbell Thruster Metcon',
      category: 'Weight Loss',
      targetMuscle: 'Full Body (Quads, Shoulders, Triceps)',
      secondaryMuscles: ['Core', 'Glutes', 'Lungs'],
      difficulty: 'Advanced',
      equipment: 'Pair of Moderate Dumbbells',
      sets: '4 sets',
      reps: '15 reps',
      restTime: '45s',
      caloriesBurned: '150 kcal / 15 min',
      demoVisual: 'thruster',
      description: 'A brutal compound fusion of front squat and overhead press that demands high oxygen uptake.',
      instructions: [
        'Hold dumbbells at shoulder rack position with elbows high.',
        'Descend into a full depth squat with knees tracking over toes.',
        'Drive out of squat forcefully, using hip momentum to press weights overhead.',
        'Lower weights back to shoulders smoothly as you start next squat.'
      ]
    },
    {
      _id: 'ex_loss_06',
      name: 'Explosive Plyo Box Jumps',
      category: 'Weight Loss',
      targetMuscle: 'Legs (Fast-Twitch Muscle Fibers)',
      secondaryMuscles: ['Calves', 'Core', 'Glutes'],
      difficulty: 'Intermediate',
      equipment: 'Plyometric Box (20-24")',
      sets: '4 sets',
      reps: '12 jumps',
      restTime: '45s',
      caloriesBurned: '115 kcal / 15 min',
      demoVisual: 'box-jump',
      description: 'Builds explosive vertical jumping power while incinerating calories through rapid contraction.',
      instructions: [
        'Stand an arm-length away from plyo box in athletic ready stance.',
        'Swing arms back and load hips into a quarter squat.',
        'Explode upward, swinging arms forward and tucking knees to land gently atop box.',
        'Step down one foot at a time to protect Achilles tendons.'
      ]
    }
  ],

  dietPlans: [
    // VEGETARIAN
    {
      _id: 'diet_veg_01',
      dietType: 'Vegetarian',
      mealType: 'Breakfast',
      title: 'Spiced Tofu Scramble with Avocado & Sprouted Grain Toast',
      calories: 450,
      macros: { protein: 28, carbs: 38, fats: 20 },
      prepTime: '15 mins',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      description: 'High-protein vegan morning staple loaded with anti-inflammatory turmeric, fresh veggies, and healthy monounsaturated fats.',
      ingredients: [
        '200g Firm Tofu (crumbled)',
        '1/2 tsp Turmeric & Black Pepper',
        '1/2 ripe Haas Avocado sliced',
        '2 slices Sprouted Ezekiel Toast',
        '1 cup Baby Spinach & Cherry Tomatoes'
      ],
      instructions: 'Sauté tomatoes and spinach with olive oil, crumble in tofu, add seasonings, and serve alongside toasted Ezekiel bread and creamy sliced avocado.'
    },
    {
      _id: 'diet_veg_02',
      dietType: 'Vegetarian',
      mealType: 'Lunch',
      title: 'Quinoa Edamame Buddha Bowl with Tahini Lime Drizzle',
      calories: 580,
      macros: { protein: 26, carbs: 65, fats: 22 },
      prepTime: '20 mins',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      description: 'Nutrient-dense powerhouse bowl delivering complete amino acids from quinoa and edamame, fiber-rich roasted sweet potato, and sesame fats.',
      ingredients: [
        '1 cup Cooked Tri-Color Quinoa',
        '3/4 cup Steamed Shelled Edamame',
        '1/2 Roasted Sweet Potato (cubed)',
        '1 cup Chopped Kale with Lemon Massage',
        '2 tbsp Creamy Tahini Lime Dressing'
      ],
      instructions: 'Arrange warm quinoa, steamed edamame, and roasted sweet potatoes over kale. Whisk tahini, lime juice, and garlic, drizzling evenly over top.'
    },
    {
      _id: 'diet_veg_03',
      dietType: 'Vegetarian',
      mealType: 'Snack',
      title: 'Greek Yogurt Crunch with Chia Seeds & Wild Blueberries',
      calories: 230,
      macros: { protein: 20, carbs: 24, fats: 5 },
      prepTime: '5 mins',
      imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
      description: 'Slow-digesting casein-rich Greek yogurt combined with brain-healthy blueberry antioxidants and omega-3 chia seeds.',
      ingredients: [
        '170g Non-Fat Plain Greek Yogurt (or Soy Yogurt)',
        '1/2 cup Organic Wild Blueberries',
        '1 tbsp Black Chia Seeds',
        '1 tsp Raw Honey or Stevia'
      ],
      instructions: 'Layer yogurt into a chilled bowl, top with chia seeds, fresh blueberries, and a subtle drizzle of organic raw honey.'
    },
    {
      _id: 'diet_veg_04',
      dietType: 'Vegetarian',
      mealType: 'Dinner',
      title: 'Hearty Dal Palak (Yellow Lentil & Spinach) with Brown Basmati',
      calories: 520,
      macros: { protein: 25, carbs: 74, fats: 12 },
      prepTime: '25 mins',
      imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
      description: 'Traditional comforting red & yellow lentil stew packed with bioavailable plant iron, fresh ginger, and digestion-friendly cumin.',
      ingredients: [
        '1 cup Cooked Toor/Moong Dal Lentils',
        '2 cups Fresh Spinach Leaves (wilted in curry)',
        '1 cup Steamed Brown Basmati Rice',
        '1 tsp Ghee or Olive Oil for Tadka seasoning',
        'Fresh Coriander & Lemon wedge'
      ],
      instructions: 'Simmer lentils with turmeric and salt. Temper spices (cumin, mustard seeds, garlic) in ghee, stir into lentils with fresh spinach, and serve over warm brown rice.'
    },

    // NON-VEGETARIAN
    {
      _id: 'diet_nonveg_01',
      dietType: 'Non-Vegetarian',
      mealType: 'Breakfast',
      title: '3-Egg Spinach Scramble with Smoked Salmon & Sourdough',
      calories: 490,
      macros: { protein: 38, carbs: 28, fats: 24 },
      prepTime: '12 mins',
      imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
      description: 'High-protein champion breakfast providing brain-boosting choline from whole pasture-raised eggs and anti-inflammatory EPA/DHA from salmon.',
      ingredients: [
        '2 Whole Pasture Eggs + 2 Egg Whites',
        '60g Wild Alaskan Smoked Salmon',
        '1 slice Artisan Sourdough Bread (toasted)',
        '1 cup Baby Spinach (sautéed)',
        '1 tsp Extra Virgin Olive Oil'
      ],
      instructions: 'Whisk eggs and scramble softly in olive oil with spinach. Plate on toasted sourdough and top with cold-smoked salmon slices and cracked black pepper.'
    },
    {
      _id: 'diet_nonveg_02',
      dietType: 'Non-Vegetarian',
      mealType: 'Lunch',
      title: 'Lemon Herb Grilled Chicken Breast with Sweet Potato & Asparagus',
      calories: 610,
      macros: { protein: 50, carbs: 54, fats: 16 },
      prepTime: '25 mins',
      imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
      description: 'The golden standard bodybuilding lean muscle lunch. Pure lean poultry protein paired with complex slow-release carbohydrates.',
      ingredients: [
        '200g Lean Chicken Breast Fillet',
        '200g Baked Sweet Potato Mash',
        '8 spears Tender Grilled Asparagus',
        '1 tbsp Rosemary Lemon Marinade',
        '1 tsp Cold-Pressed Olive Oil'
      ],
      instructions: 'Marinate chicken in lemon juice, garlic, and rosemary. Grill for 6 minutes per side until internal temp hits 165°F. Serve with baked sweet potato and asparagus.'
    },
    {
      _id: 'diet_nonveg_03',
      dietType: 'Non-Vegetarian',
      mealType: 'Snack',
      title: 'Whey Isolate Anabolic Shake with Almond Butter & Banana',
      calories: 310,
      macros: { protein: 34, carbs: 28, fats: 7 },
      prepTime: '3 mins',
      imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
      description: 'Ultra-fast absorbing post-workout shake formulated to trigger Muscle Protein Synthesis (MPS) with minimal digestive strain.',
      ingredients: [
        '1 scoop (30g) Vanilla Whey Protein Isolate',
        '1 medium Ripe Banana',
        '1 tbsp Natural Smooth Almond Butter',
        '300ml Unsweetened Almond Milk & Ice'
      ],
      instructions: 'Combine all ingredients in a high-speed blender for 30 seconds until velvety smooth. Consume within 60 minutes of lifting.'
    },
    {
      _id: 'diet_nonveg_04',
      dietType: 'Non-Vegetarian',
      mealType: 'Dinner',
      title: 'Pan-Seared Atlantic Salmon with Garlic Quinoa & Roasted Broccoli',
      calories: 620,
      macros: { protein: 44, carbs: 42, fats: 28 },
      prepTime: '20 mins',
      imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
      description: 'Rich in Omega-3 fatty acids for joint recovery and heart wellness, paired with fiber-heavy brassica greens and complex grains.',
      ingredients: [
        '180g Fresh Salmon Fillet with crispy skin',
        '1 cup Cooked Fluffy Garlic Quinoa',
        '1.5 cups Oven-Roasted Broccoli Florets',
        '1/2 Lemon for finishing zest',
        '1 tsp Avocado Oil for high-heat searing'
      ],
      instructions: 'Sear salmon skin-side down in hot skillet for 4 mins until crispy, flip for 3 mins. Serve alongside warm garlic quinoa and oven-crisped broccoli.'
    }
  ],

  timetable: [
    {
      day: 'Monday',
      dayShort: 'Mon',
      workout: {
        title: 'Upper Body Heavy Push & Hypertrophy',
        duration: '55 mins',
        exercises: ['Flat Barbell Bench Press (4x8)', 'Overhead Military Press (4x10)', 'Incline DB Flyes (3x12)'],
        completed: true
      },
      nutrition: {
        focus: 'High Protein / Carb Load',
        caloriesTarget: 2600,
        highlightMeal: 'Grilled Chicken with Sweet Potato Mash',
        completed: true
      }
    },
    {
      day: 'Tuesday',
      dayShort: 'Tue',
      workout: {
        title: 'Lower Body Quad & Posterior Chain',
        duration: '60 mins',
        exercises: ['Barbell Back Squats (4x8)', 'Romanian Deadlifts (3x10)', 'Walking DB Lunges (3x12)'],
        completed: true
      },
      nutrition: {
        focus: 'Glutamine & Hydration Focus',
        caloriesTarget: 2500,
        highlightMeal: 'Quinoa Edamame Buddha Bowl',
        completed: false
      }
    },
    {
      day: 'Wednesday',
      dayShort: 'Wed',
      workout: {
        title: 'Cardio Core & Active Mobility Recovery',
        duration: '35 mins',
        exercises: ['Jump Rope HIIT Intervals (15m)', 'Mountain Climber Core Matrix (15m)', 'Foam Rolling (10m)'],
        completed: false
      },
      nutrition: {
        focus: 'Antioxidant & Lean Fuel',
        caloriesTarget: 2200,
        highlightMeal: 'Wild Salmon with Roasted Broccoli',
        completed: false
      }
    },
    {
      day: 'Thursday',
      dayShort: 'Thu',
      workout: {
        title: 'Back Thickness & Bicep Peak Work',
        duration: '50 mins',
        exercises: ['Barbell Deadlift (4x6)', 'Weighted Pull-Ups (4x8)', 'Incline Dumbbell Curls (3x12)'],
        completed: false
      },
      nutrition: {
        focus: 'Muscle Recovery Synthesis',
        caloriesTarget: 2500,
        highlightMeal: 'Hearty Dal Palak with Brown Basmati',
        completed: false
      }
    },
    {
      day: 'Friday',
      dayShort: 'Fri',
      workout: {
        title: 'Chest & Arms Hypertrophy Blitz',
        duration: '50 mins',
        exercises: ['Dumbbell Incline Press (4x10)', 'Cable Crossover (3x15)', 'Tricep Rope Pushdowns (4x12)'],
        completed: false
      },
      nutrition: {
        focus: 'Clean Energy & Moderate Carbs',
        caloriesTarget: 2400,
        highlightMeal: '3-Egg Spinach & Salmon Scramble',
        completed: false
      }
    },
    {
      day: 'Saturday',
      dayShort: 'Sat',
      workout: {
        title: 'Full Body HIIT Conditioning & Sprints',
        duration: '40 mins',
        exercises: ['Burpee Box Jumps (5 sets)', 'Kettlebell Swings (4 sets)', 'Thruster Metcon (4 sets)'],
        completed: false
      },
      nutrition: {
        focus: 'Post-Workout Glycogen Replenishment',
        caloriesTarget: 2600,
        highlightMeal: 'Whey Isolate Anabolic Smoothie Bowl',
        completed: false
      }
    },
    {
      day: 'Sunday',
      dayShort: 'Sun',
      workout: {
        title: 'Rest, Deep Tissue Massage & Yoga Flow',
        duration: '30 mins',
        exercises: ['Vinyasa Yoga Stretch Flow', 'Deep Breathing & Hydration', 'Walk outdoors 5,000 steps'],
        completed: false
      },
      nutrition: {
        focus: 'Gut Health & Micronutrient Reset',
        caloriesTarget: 2100,
        highlightMeal: 'Spiced Tofu Scramble with Avocado',
        completed: false
      }
    }
  ],

  affiliateProducts: [
    {
      _id: 'prod_supp_01',
      title: 'Optimum Nutrition Gold Standard 100% Whey Protein Isolate',
      category: 'Supplements',
      badge: 'Bestseller #1',
      rating: 4.8,
      reviewsCount: 14280,
      price: 64.99,
      originalPrice: 79.99,
      discount: '19% OFF',
      affiliateTag: 'healthpulse-whey-20',
      affiliateUrl: 'https://amazon.com/dp/B000QSNY54?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80',
      features: [
        '24g Premium Whey Isolate & Peptides per scoop',
        '5.5g Naturally Occurring BCAAs for muscle protein synthesis',
        'Gluten-free, instantized for clump-free spoon mixing',
        'Informed-Choice tested for banned substances'
      ]
    },
    {
      _id: 'prod_supp_02',
      title: 'Creapure Micronized Creatine Monohydrate (500g)',
      category: 'Supplements',
      badge: 'Editor Choice',
      rating: 4.9,
      reviewsCount: 9850,
      price: 29.95,
      originalPrice: 38.00,
      discount: '21% OFF',
      affiliateTag: 'healthpulse-creatine-20',
      affiliateUrl: 'https://amazon.com/dp/B002DYIZEO?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=600&q=80',
      features: [
        '100% German-manufactured Creapure purity standard',
        'Clinically proven to increase maximal power output & lean mass',
        'Zero fillers, unflavored for seamless drink stacking',
        'Rapid muscle cellular hydration and ATP regeneration'
      ]
    },
    {
      _id: 'prod_supp_03',
      title: 'Organic Ashwagandha KSM-66 & BioPerine Complex',
      category: 'Supplements',
      badge: 'Top Rated',
      rating: 4.7,
      reviewsCount: 6320,
      price: 21.90,
      originalPrice: 28.50,
      discount: '23% OFF',
      affiliateTag: 'healthpulse-ashwa-20',
      affiliateUrl: 'https://amazon.com/dp/B078K36SMR?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
      features: [
        'Standardized to 5% withanolides for natural cortisol reduction',
        'Supports deep REM sleep and natural testosterone recovery',
        'Non-GMO, vegan certified capsules',
        'BioPerine black pepper extract for 2000% higher absorption'
      ]
    },
    {
      _id: 'prod_gear_01',
      title: 'ProGrade Heavy-Duty Fabric Resistance Bands (Set of 5)',
      category: 'Gym Gear',
      badge: 'High Durability',
      rating: 4.9,
      reviewsCount: 11450,
      price: 24.99,
      originalPrice: 34.99,
      discount: '29% OFF',
      affiliateTag: 'healthpulse-bands-20',
      affiliateUrl: 'https://amazon.com/dp/B07D38J4Y3?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=600&q=80',
      features: [
        'Anti-snap non-slip inner latex weave with woven fabric shell',
        '5 progressive resistance levels (10 lbs to 50 lbs)',
        'Compact carry pouch included for gym and home workouts',
        'Ideal for glute activation, shoulder mobility, and pull-up assist'
      ]
    },
    {
      _id: 'prod_gear_02',
      title: 'Quick-Dial Adjustable Dumbbells (5 - 52.5 lbs Pair)',
      category: 'Gym Gear',
      badge: 'Home Gym King',
      rating: 4.8,
      reviewsCount: 22100,
      price: 349.00,
      originalPrice: 429.00,
      discount: '19% OFF',
      affiliateTag: 'healthpulse-dumbbells-20',
      affiliateUrl: 'https://amazon.com/dp/B001ARYU58?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=600&q=80',
      features: [
        'Replaces 15 pairs of traditional dumbbells in one compact footprint',
        'Smooth mechanical dial system adjusts in 2.5 lb increments',
        'Durable molding around metal plates for ultra-quiet clank-free reps',
        'Ergonomic knurled grip handles for heavy lifting security'
      ]
    },
    {
      _id: 'prod_gear_03',
      title: 'Eco-Friendly High-Density Yoga & Exercise Mat (8mm Extra Thick)',
      category: 'Gym Gear',
      badge: 'Joint Friendly',
      rating: 4.7,
      reviewsCount: 8200,
      price: 32.50,
      originalPrice: 45.00,
      discount: '28% OFF',
      affiliateTag: 'healthpulse-mat-20',
      affiliateUrl: 'https://amazon.com/dp/B01LP0V4S4?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=600&q=80',
      features: [
        '8mm premium cushioned TPE material cushions knees and elbows',
        'Dual-sided non-slip texture keeps traction on hardwood or tile',
        'Sweat-resistant closed-cell surface is effortlessly wiped clean',
        'Includes carrying strap and alignment line markings'
      ]
    },
    {
      _id: 'prod_book_01',
      title: 'Atomic Habits: Tiny Changes, Remarkable Results by James Clear',
      category: 'Books',
      badge: 'Global #1',
      rating: 4.9,
      reviewsCount: 135000,
      price: 14.99,
      originalPrice: 27.00,
      discount: '44% OFF',
      affiliateTag: 'healthpulse-atomichabits-20',
      affiliateUrl: 'https://amazon.com/dp/0735211299?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      features: [
        'Master the 4 Laws of Behavior Change for automatic fitness habits',
        'How to overcome lack of willpower and redesign your environment',
        'Proven framework used by Olympic athletes and world-class leaders',
        'Essential mindset reading for sustainable lifestyle transformation'
      ]
    },
    {
      _id: 'prod_book_02',
      title: 'Bigger Leaner Stronger: The Science of Muscle & Fat Loss by M. Matthews',
      category: 'Books',
      badge: 'Fitness Essential',
      rating: 4.8,
      reviewsCount: 16400,
      price: 15.99,
      originalPrice: 21.99,
      discount: '27% OFF',
      affiliateTag: 'healthpulse-bls-20',
      affiliateUrl: 'https://amazon.com/dp/1938895364?tag=healthpulse-20',
      imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
      features: [
        'Debunks 10 worst fitness myths about diet, supplements, and routines',
        'The exact formula of flexible dieting that lets you eat foods you love',
        'Science-backed progressive overload strength training protocol',
        'Includes meal plan templates and workout tracking charts'
      ]
    }
  ]
};

module.exports = seedData;
