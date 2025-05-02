/**
 * Physical Education-specific prompts for question generation
 * These prompts override the default prompts in the API
 */

// Configuration for LaTeX usage in physical education
export const latexConfig = {
  // Set to false since physical education doesn't typically require complex math
  requiresFullLatex: false,
  isMixedContent: false,
  
  // Some basic formulas that might occasionally be used in physical education
  examples: {
    heartRate: "\\\\(\\\\text{Target Heart Rate} = (\\\\text{Max HR} - \\\\text{Resting HR}) \\\\times \\\\text{Intensity} + \\\\text{Resting HR}\\\\)",
    vo2Max: "\\\\(\\\\text{VO}_2\\\\text{max} = \\\\frac{\\\\text{Maximum oxygen consumption}}{\\\\text{Body weight}}\\\\)",
    percentageChange: "\\\\(\\\\text{Percent Change} = \\\\frac{\\\\text{New} - \\\\text{Original}}{\\\\text{Original}} \\\\times 100\\\\%\\\\)"
  }
};

// Base instructions used in the system prompt
export const baseInstructions = `
You are an expert physical education exam creator for the Irish Leaving Certificate.
Return valid JSON with "questions" and "solutions" keys.

Physical Education questions should focus on:
- Theoretical knowledge of physical activities and sports
- Understanding of training principles and exercise physiology
- Performance analysis and skill acquisition
- Psychological factors in sport and physical activity
- Personal and social development through physical education
- Contemporary issues in physical education and sport

Question formats should include:
- Short answer knowledge-based questions
- Extended responses requiring critical analysis
- Case studies and scenario-based questions
- Sport-specific technical and tactical questions
- Questions about training methods and program design

VERY IMPORTANT: Ensure that ALL questions STRICTLY match the specific topic requested by the user. 
For example, if "Exercise Physiology" is requested, ONLY generate questions about physiological responses to exercise.
If a subtopic like "Energy Systems" is specified, ONLY generate questions about aerobic, anaerobic, and ATP-PC systems.
DO NOT generate questions from unrelated topics.

Structure solutions to:
1. Begin with a clear explanation of the core concepts
2. Provide evidence-based and factually correct information
3. Include relevant examples or applications where appropriate
4. Use proper physical education terminology
5. For any calculations (rare in PE), show all steps clearly

The JSON format must follow this structure:
{
  "questions": [
    {
      "question": "Detailed physical education question with clear context and requirements."
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Comprehensive solution with factually correct information and proper PE terminology.",
      "markingScheme": "0-3: Basic knowledge identified\\\\n4-7: Key concepts explained\\\\n8-10: Comprehensive answer with relevant examples"
    }
  ]
}`;

// User prompt used for generating questions
export const userPrompt = `
Generate physical education questions with appropriate difficulty for the specified level.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Exercise Physiology" is specified, ALL questions must involve physiological responses to exercise.
- If "Energy Systems" is specified, ALL questions must specifically address aerobic, anaerobic, or ATP-PC systems.
- If "Skill Acquisition" is specified, ALL questions must involve how skills are learned and developed.

For physical education questions:
- Use clear, precise language free of ambiguity
- Include scenario-based questions where applicable
- Reference contemporary issues and developments in PE and sport
- Incorporate real-world examples and applications
- Ensure questions test both knowledge and critical thinking
- For Higher Level, include questions requiring in-depth analysis

For solutions:
- Provide factually accurate information
- Include current evidence-based practices and research
- Use proper terminology specific to physical education
- Structure responses logically with clear explanations
- Reference relevant theories and models where appropriate

Return JSON only, with keys "questions" and "solutions".`;

// Example question with appropriate formatting
export const exampleQuestion = `
A 16-year-old athlete is transitioning from team sports to endurance running. 
Explain the principle of specificity as it relates to this transition, and design a 6-week training program outlining:
(a) The physiological adaptations they should expect
(b) Three specific training methods they should incorporate
(c) How you would monitor their progress`;

// Example solution with appropriate formatting
export const exampleSolution = `
The principle of specificity states that training adaptations are specific to the type of training performed. For a 16-year-old athlete transitioning from team sports to endurance running, their training needs to be redesigned to specifically target the physiological and biomechanical demands of endurance running.

(a) Physiological adaptations the athlete should expect:

Cardiovascular adaptations:
- Increased stroke volume and cardiac output
- Lower resting heart rate
- Increased blood volume and hemoglobin levels
- Enhanced capillarization in working muscles

Respiratory adaptations:
- Improved ventilatory efficiency
- Increased maximal oxygen uptake (VO₂ max)
- Enhanced ventilatory threshold

Muscular adaptations:
- Increased slow-twitch (Type I) muscle fiber efficiency
- Enhanced mitochondrial density in muscle cells
- Improved aerobic enzyme activity
- Greater glycogen storage capacity
- Enhanced fat oxidation capabilities

(b) Three specific training methods to incorporate:

1. Long Slow Distance (LSD) Training:
   - Purpose: Develop aerobic base and improve fat metabolism
   - Implementation: 1-2 sessions per week starting with 20-30 minutes of continuous running at 65-70% of maximum heart rate, gradually increasing to 60-90 minutes
   - Progression: Increase duration by 10% each week before increasing intensity

2. Tempo/Threshold Training:
   - Purpose: Improve lactate threshold and running economy
   - Implementation: 1 session per week of 15-25 minutes of running at a "comfortably hard" pace (approximately 80-85% of maximum heart rate)
   - Progression: Begin with 2 x 7-minute efforts with 3 minutes recovery, building to 2 x 12-minute efforts

3. Interval Training:
   - Purpose: Improve VO₂ max and running efficiency
   - Implementation: 1 session per week of shorter, higher-intensity efforts
   - Progression: Begin with 6-8 x 400m with equal recovery time, gradually increasing to 6-8 x 800m

(c) Monitoring progress:

Objective measures:
- Timed runs over standardized distances (e.g., 3km time trial every 2 weeks)
- Heart rate monitoring: track resting heart rate weekly and recovery heart rate following standardized effort
- Rate of perceived exertion (RPE) for standardized workouts to assess subjective difficulty

Subjective measures:
- Training diary recording perceived effort, fatigue levels, and recovery quality
- Wellness questionnaires tracking sleep quality, stress levels, muscle soreness
- Session RPE to monitor training load

Testing protocol:
- Conduct a 12-minute Cooper test at the beginning and end of the 6-week period
- Perform a submaximal heart rate test (running at fixed pace for 6 minutes) biweekly to track heart rate decrease at same intensity
- Use regular feedback sessions to assess technical improvements in running form

The 6-week program should follow periodization principles with gradual progressive overload, ensuring adequate recovery between hard sessions with a typical structure of:
- Monday: Interval training (high intensity)
- Tuesday: Recovery run (low intensity) or cross-training
- Wednesday: Rest or active recovery
- Thursday: Tempo/threshold training (moderate-high intensity)
- Friday: Recovery run (low intensity)
- Saturday: Long slow distance (moderate intensity)
- Sunday: Complete rest

This approach ensures specificity to endurance running while gradually developing the athlete's aerobic capacity, lactate threshold, and running economy required for their new sport.`;

// Export all components
export default {
  latexConfig,
  baseInstructions,
  userPrompt,
  exampleQuestion,
  exampleSolution
}; 