/**
 * Mathematics-specific prompts for question generation
 * These prompts override the default prompts in the API
 */

// Configuration for LaTeX usage in mathematics
export const latexConfig = {
  // Set to true for subjects that need full LaTeX handling
  requiresFullLatex: true,
  
  // Examples of correctly formatted mathematics formulas
  examples: {
    quadratic: "\\\\(ax^2 + bx + c = 0\\\\)",
    quadraticFormula: "\\\\(x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}\\\\)",
    derivative: "\\\\(\\\\frac{d}{dx}(x^n) = nx^{n-1}\\\\)",
    integral: "\\\\(\\\\int x^n dx = \\\\frac{x^{n+1}}{n+1} + C\\\\)",
    coordinateGeometry: "\\\\(y - y_1 = m(x - x_1)\\\\)"
  }
};

// Base instructions used in the system prompt
export const baseInstructions = `
You are an expert mathematics exam creator for the Irish Leaving Certificate.
Return valid JSON with "questions" and "solutions" keys.

CRITICAL: All mathematical expressions and calculations MUST use LaTeX with double-escaped backslashes (\\\\\\\\).
Ensure ALL mathematical expressions are properly formatted - this is absolutely essential.

LaTeX formatting rules:
- ALL mathematical symbols, equations, expressions must be wrapped in LaTeX delimiters: \\\\( ... \\\\)
- For complex equations, use display math mode: \\\\[ ... \\\\]
- Every backslash in LaTeX commands must be doubled: \\\\ becomes \\\\\\\\
- Fractions: \\\\(\\\\frac{numerator}{denominator}\\\\)
- Exponents: \\\\(x^{power}\\\\) or \\\\(e^{x}\\\\)
- Subscripts: \\\\(x_{i}\\\\)
- Square roots: \\\\(\\\\sqrt{expression}\\\\)
- Greek letters: \\\\(\\\\alpha\\\\), \\\\(\\\\beta\\\\), \\\\(\\\\pi\\\\), etc.
- Special functions: \\\\(\\\\sin(x)\\\\), \\\\(\\\\cos(x)\\\\), \\\\(\\\\tan(x)\\\\), etc.
- Integrals: \\\\(\\\\int_{a}^{b} f(x) \\\\, dx\\\\)
- Matrices: Use \\\\(\\\\begin{pmatrix} ... \\\\end{pmatrix}\\\\)
- Boxed answers: \\\\boxed{answer}

NEVER leave any mathematical expression unformatted with LaTeX. This includes:
- All variables (x, y, z, etc.)
- All numbers in equations
- All operations (+, -, ×, ÷, =, etc.)
- All functions (f(x), sin(x), etc.)

Questions should reflect authentic exam style, including:
- Algebraic manipulation and proof
- Calculus (differentiation and integration)
- Coordinate geometry
- Complex numbers and matrices
- Probability and statistics
- Functions and sequences

VERY IMPORTANT: Ensure that ALL questions STRICTLY match the specific topic requested by the user. 
For example, if "Coordinate Geometry" is requested, ONLY generate coordinate geometry questions.
If a subtopic like "The Line" is specified, ONLY generate questions about lines.
DO NOT generate questions from unrelated topics.

Before creating a question, confirm that:
1. It is solvable using techniques appropriate for the requested level
2. It has a clear solution that can be fully explained
3. It matches the exact topic requested
4. The question difficulty is appropriate

Structure each solution with COMPLETE step-by-step explanations that:
1. Begin by stating the approach/method
2. Show EVERY step of calculation with proper LaTeX formatting
3. Include explanations for WHY each step is taken
4. Provide the final answer clearly marked with \\\\boxed{}

Solutions must be comprehensive enough that a student could learn the technique by following them.
Each solution should demonstrate mathematical rigor expected at the requested level.

The JSON format must follow this structure:
{
  "questions": [
    {
      "question": "Detailed question with mathematics in LaTeX format \\\\\\\\(x^2 + 2x + 1 = 0\\\\\\\\).",
      "geogebraCommands": "ZoomIn(-10,10,-10,10)" // Include for graphing questions
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Step-by-step solution with detailed reasoning for EACH mathematical step using LaTeX \\\\\\\\(x = -1\\\\\\\\).",
      "markingScheme": "0-3: Correct approach identified\\\\n4-7: Key steps correctly applied\\\\n8-10: Complete solution with correct answer",
      "geogebraCommands": "f(x)=x^2+2x+1;ZoomIn(-10,10,-10,10)" // Include for graphing questions
    }
  ]
}`;

// User prompt used for generating questions
export const userPrompt = `
Generate mathematics questions with appropriate difficulty for the specified level.

CRITICAL: EVERY mathematical expression MUST be properly formatted with LaTeX. This includes ALL variables, numbers in equations, operations, and functions.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Coordinate Geometry" is specified, ALL questions must involve coordinates, lines, circles, etc.
- If "The Line" is specified, ALL questions must involve lines, slopes, perpendicular/parallel lines, etc.
- If "Calculus" is specified, ALL questions must involve differentiation or integration.

For your solutions:
- Show each step clearly with LaTeX formatting for ALL mathematical expressions
- Explain the reasoning behind each step
- For algebraic manipulations, show each line of working
- For calculus, show all differentiation/integration steps
- For coordinate geometry, explain the formulas used
- Present the final answer clearly with \\\\boxed{answer}

Examples of proper LaTeX formatting:
- For quadratic equations: ${latexConfig.examples.quadratic}
- For the quadratic formula: ${latexConfig.examples.quadraticFormula}
- For derivatives: ${latexConfig.examples.derivative}
- For integrals: ${latexConfig.examples.integral}
- For coordinate geometry: ${latexConfig.examples.coordinateGeometry}

Return JSON only, with keys "questions" and "solutions".`;

// Example question with appropriate formatting
export const exampleQuestion = `
Find the equation of the line passing through the points \\\\(A(3,7)\\\\) and \\\\(B(-2,1)\\\\). 
Express your answer in the form \\\\(ax + by + c = 0\\\\), where \\\\(a\\\\), \\\\(b\\\\), and \\\\(c\\\\) are integers with no common factor other than 1.`;

// Example solution with appropriate formatting
export const exampleSolution = `
To find the equation of a line passing through two points, I'll follow these steps:
1. Calculate the slope using the slope formula
2. Use the point-slope form to find the equation
3. Convert to the desired form \\\\(ax + by + c = 0\\\\)

Step 1: Calculate the slope using the slope formula:
\\\\(m = \\\\frac{y_2 - y_1}{x_2 - x_1} = \\\\frac{1 - 7}{-2 - 3} = \\\\frac{-6}{-5} = \\\\frac{6}{5}\\\\)

Step 2: Use the point-slope form with the point \\\\(A(3,7)\\\\):
\\\\(y - y_1 = m(x - x_1)\\\\)
\\\\(y - 7 = \\\\frac{6}{5}(x - 3)\\\\)
\\\\(y - 7 = \\\\frac{6x - 18}{5}\\\\)
\\\\(5(y - 7) = 6x - 18\\\\)
\\\\(5y - 35 = 6x - 18\\\\)
\\\\(5y - 6x = 35 - 18\\\\)
\\\\(5y - 6x = 17\\\\)

Step 3: Rearrange to the form \\\\(ax + by + c = 0\\\\):
\\\\(5y - 6x = 17\\\\)
\\\\(-6x + 5y - 17 = 0\\\\)
\\\\(6x - 5y + 17 = 0\\\\)

To verify this is correct, I'll check if both points satisfy our equation:
For \\\\(A(3,7)\\\\):
\\\\(6(3) - 5(7) + 17 = 18 - 35 + 17 = 0\\\\) ✓

For \\\\(B(-2,1)\\\\):
\\\\(6(-2) - 5(1) + 17 = -12 - 5 + 17 = 0\\\\) ✓

Therefore, the equation of the line passing through \\\\(A(3,7)\\\\) and \\\\(B(-2,1)\\\\) is:
\\\\boxed{6x - 5y + 17 = 0}\\\\)

Note: The coefficients 6, -5, and 17 have no common factor other than 1, so this is the required form.`;

// Export all components
export default {
  latexConfig,
  baseInstructions,
  userPrompt,
  exampleQuestion,
  exampleSolution
}; 