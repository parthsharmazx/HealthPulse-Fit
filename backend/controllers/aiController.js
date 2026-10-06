// AI Fitness & Nutrition Advisor Controller
// Supports Gemini API / OpenAI API keys, with intelligent fitness heuristics fallback

const MEDICAL_DISCLAIMER = "\n\n⚠️ *Medical Disclaimer: PulseAI provides general fitness and nutrition education. Always consult a certified healthcare professional before making major dietary or training changes.*";

// Contextual Knowledge Base for Intelligent Offline Heuristic Coach
const generateHeuristicAdvice = (userMessage, userContext = {}) => {
  const msg = userMessage.toLowerCase();

  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey') || msg.includes('who are you')) {
    return `Hello! I'm **PulseAI**, your dedicated Healthcare, Fitness & Nutrition advisor. 🏋️‍♂️🥗
I can help you with:
- Tailoring workout routines (Weight Gain / Weight Loss / Compound Lifts)
- Calculating optimal daily calorie & macronutrient targets (Protein, Carbs, Fats)
- Interpreting your BMI and body composition goals
- Meal planning (Vegetarian & Non-Vegetarian options)
- Supplement guidance (Creatine, Whey, Multivitamins)

What fitness milestone or question are we tackling today?` + MEDICAL_DISCLAIMER;
  }

  if (msg.includes('protein') || msg.includes('how much protein') || msg.includes('grams')) {
    const weight = userContext.weight || 72;
    const minG = Math.round(weight * 1.6);
    const maxG = Math.round(weight * 2.2);
    return `### Optimal Protein Intake Guidelines 🥩🌱

For your current bodyweight (~${weight} kg) and active training:
- **Optimal Daily Range**: **${minG}g – ${maxG}g** of protein per day (1.6 to 2.2g per kg of total bodyweight).
- **Per-Meal Distribution**: 30–45g of high-leucine protein every 3–4 hours maximizes muscle protein synthesis (MPS).
- **Top Sources**:
  - *Non-Vegetarian*: Chicken breast, wild salmon, egg whites, whey isolate.
  - *Vegetarian*: Firm tofu, edamame, lentils, Greek yogurt, seitan, pea/rice protein isolate.

*Tip: Consume 25-35g of protein with 30-50g of fast-acting carbs within 90 minutes post-workout for optimal glycogen replenishment and repair.*` + MEDICAL_DISCLAIMER;
  }

  if (msg.includes('gain') || msg.includes('muscle') || msg.includes('hypertrophy') || msg.includes('bulk')) {
    return `### Hypertrophy & Muscle Gain Masterplan 💪

To build lean muscular tissue without excessive fat gain:
1. **Caloric Surplus**: Maintain a gentle surplus of **+250 to +400 kcal/day** over your maintenance level.
2. **Progressive Overload**: Strive to add 1 rep or 1-2.5 kg to your primary compound lifts (Squat, Deadlift, Bench, Overhead Press) each week.
3. **Hypertrophy Volume**: 10–20 hard working sets per muscle group per week, training within 1–3 reps in reserve (RIR).
4. **Rest & Recovery**: Target 7.5–9 hours of quality sleep. Growth hormone peaks during slow-wave sleep.

Check out our **Exercise Library > Weight Gain** tab for detailed movement breakdowns!` + MEDICAL_DISCLAIMER;
  }

  if (msg.includes('loss') || msg.includes('lose weight') || msg.includes('fat') || msg.includes('cut')) {
    return `### Science-Based Fat Loss & Definition Protocol 🔥

1. **Sustainable Calorie Deficit**: Aim for a **300–500 kcal daily deficit** (targeting ~0.5kg / 1 lb of fat loss per week).
2. **High Protein Shield**: Keep protein elevated (2.0–2.4g/kg) to protect lean muscle mass while burning adipose tissue.
3. **NEAT & Movement**: Combine 2-3 HIIT or cardio interval sessions weekly with a baseline of 8,000–10,000 daily steps.
4. **Hydration**: Drink 500ml of cold water 20 minutes before meals to enhance satiety and metabolic rate.

Visit our **Weekly Planner** to log your HIIT workouts and check out the **Diet Plans** tab for fiber-rich recipes!` + MEDICAL_DISCLAIMER;
  }

  if (msg.includes('bmi') || msg.includes('body mass index')) {
    return `### Understanding Your BMI & Next Steps ⚖️

Body Mass Index (BMI) is calculated as **Weight (kg) / [Height (m)]²**:
- **Underweight**: < 18.5
- **Normal / Healthy**: 18.5 – 24.9
- **Overweight**: 25.0 – 29.9
- **Obese**: 30.0+

*Note*: While BMI is a fast clinical screening metric, it does not distinguish between muscle mass and adipose fat tissue. Athletes with high muscularity may register as overweight while possessing low body fat.

Use our **BMI Calculator** module in the dashboard to test your metrics and view custom calorie adjustments!` + MEDICAL_DISCLAIMER;
  }

  if (msg.includes('creatine') || msg.includes('supplement') || msg.includes('whey')) {
    return `### Evidence-Based Supplement Guide 💊

1. **Creatine Monohydrate**: The most researched ergogenic aid on earth.
   - *Dose*: 3–5 grams daily, taken consistently at any time of day with water.
   - *Benefits*: Boosts phosphocreatine cellular stores, increasing maximal strength and intra-muscular hydration.
2. **Whey / Plant Protein Isolate**:
   - Convenient, fast-digesting protein booster to hit your daily macro targets effortlessly.
3. **Omega-3 Fish Oil / Algae Oil**:
   - 1,000–2,000mg combined EPA/DHA daily reduces joint inflammation and improves insulin sensitivity.

Browse our **Affiliate Store** for laboratory-certified brands tested for purity and potency!` + MEDICAL_DISCLAIMER;
  }

  // Fallback comprehensive fitness advice
  return `### PulseAI Fitness Recommendation 💡

Thank you for your question! Here is personalized guidance based on modern sports science:
- **Consistency over Intensity**: Adhering to an 80% optimal program for 12 months outperforms doing a 100% perfect program for only 3 weeks.
- **Nutrition Architecture**: Prioritize whole, minimally processed single-ingredient foods with adequate dietary fiber (30-40g/day) and electrolyte hydration.
- **Tracking**: Use the **Weekly Timetable** to log today's training session and track your daily calorie target in the dashboard.

Would you like specific recommendations for:
1. Weight Gain vs Weight Loss routines?
2. High-protein Vegetarian or Non-Vegetarian meal suggestions?
3. Designing your weekly training timetable?` + MEDICAL_DISCLAIMER;
};

// @desc    Handle chat assistant messages
// @route   POST /api/ai/chat
const handleAIChat = async (req, res) => {
  try {
    const { message, userContext } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // Check if external API key is configured (e.g. GEMINI_API_KEY or OPENAI_API_KEY)
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are PulseAI, a certified healthcare and fitness coach for the 'HealthPulse & Fit' app.
User info: ${JSON.stringify(userContext || {})}.
Answer the user's question clearly with markdown bullet points, fitness science, and practical tips. Keep answers concise, actionable, and encouraging. Always append a brief medical disclaimer.
User: ${message}`
                    }
                  ]
                }
              ]
            })
          }
        );
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
          return res.json({ reply: data.candidates[0].content.parts[0].text });
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to heuristic engine:', geminiErr.message);
      }
    }

    // Heuristic Engine
    const reply = generateHeuristicAdvice(message, userContext);
    return res.json({ reply });
  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({ message: 'AI processing error', error: error.message });
  }
};

module.exports = {
  handleAIChat
};
