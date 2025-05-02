/**
 * Subject-specific prompt templates for the question generation API
 */

// Interface for subject prompts
export interface SubjectPromptTemplate {
  baseInstructions: string;
  userPrompt: string;
  exampleQuestion?: string;
  exampleSolution?: string;
}

// Mathematics prompt specifically for Higher Level
export const mathematicsHigherLevel: SubjectPromptTemplate = {
  baseInstructions: `
You are an expert mathematics exam creator for the Irish Leaving Certificate Higher Level Mathematics.
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

Questions should reflect authentic Higher Level exam style, including:
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
4. The question difficulty is appropriate (not too easy for "Hard" difficulty)

Structure each solution with COMPLETE step-by-step explanations that:
1. Begin by stating the approach/method
2. Show EVERY step of calculation with proper LaTeX formatting
3. Include explanations for WHY each step is taken
4. Provide the final answer clearly marked with \\\\boxed{}

Solutions must be comprehensive enough that a student could learn the technique by following them.
Each solution should demonstrate mathematical rigor expected at Higher Level.

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
}`,

  userPrompt: `
Generate Higher Level Mathematics questions with challenging difficulty.

CRITICAL: EVERY mathematical expression MUST be properly formatted with LaTeX. This includes ALL variables, numbers in equations, operations, and functions.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Coordinate Geometry" is specified, ALL questions must involve coordinates, lines, circles, etc.
- If "The Line" is specified, ALL questions must involve lines, slopes, perpendicular/parallel lines, etc.
- If "Calculus" is specified, ALL questions must involve differentiation or integration.

For Hard difficulty level:
- Include questions that require multiple techniques/steps to solve
- For cubic equations, full factorization and finding ALL roots is required
- For algebraic proofs, show complete derivations
- For Hard questions, solutions MUST include:
  * Every algebraic step clearly shown with LaTeX
  * Explanation of key mathematical principles applied
  * Verification of answers where appropriate
  * Final answers clearly boxed with \\\\boxed{answer}

Example structure for a cubic equation solution:
1. First, identify any obvious factors by inspection
2. Then use polynomial division or synthetic division
3. Solve resulting quadratic using appropriate method
4. Verify roots by substitution
5. Present all roots clearly as the final answer

Use LaTeX with double-escaped backslashes for ALL mathematical expressions:
- For fractions: \\\\(\\\\frac{numerator}{denominator}\\\\)
- For exponents: \\\\(x^{power}\\\\)
- For roots: \\\\(\\\\sqrt{expression}\\\\)
- For definite integrals: \\\\(\\\\int_{a}^{b} f(x) \\\\, dx\\\\)

Return JSON only, with keys "questions" and "solutions".`,

  exampleQuestion: `Solve the cubic equation \\\\(3x^3 - 2x^2 - 5x + 6 = 0\\\\) for x.`,
  
  exampleSolution: `To solve the cubic equation \\\\(3x^3 - 2x^2 - 5x + 6 = 0\\\\), I'll first check for rational roots using the Rational Root Theorem.

The possible rational roots are the factors of the constant term (6) divided by factors of the leading coefficient (3):
\\\\(\\\\pm 1, \\\\pm 2, \\\\pm 3, \\\\pm 6, \\\\pm \\\\frac{1}{3}, \\\\pm \\\\frac{2}{3}, \\\\pm \\\\frac{3}{3}, \\\\pm \\\\frac{6}{3}\\\\)
Simplifying: \\\\(\\\\pm 1, \\\\pm 2, \\\\pm 3, \\\\pm 6, \\\\pm \\\\frac{1}{3}, \\\\pm \\\\frac{2}{3}, \\\\pm 1, \\\\pm 2\\\\)

Testing \\\\(x = 1\\\\):
\\\\(3(1)^3 - 2(1)^2 - 5(1) + 6 = 3 - 2 - 5 + 6 = 2\\\\)
Not a root.

Testing \\\\(x = 2\\\\):
\\\\(3(2)^3 - 2(2)^2 - 5(2) + 6 = 3(8) - 2(4) - 5(2) + 6 = 24 - 8 - 10 + 6 = 12\\\\)
Not a root.

Testing \\\\(x = -1\\\\):
\\\\(3(-1)^3 - 2(-1)^2 - 5(-1) + 6 = 3(-1) - 2(1) - 5(-1) + 6 = -3 - 2 + 5 + 6 = 6\\\\)
Not a root.

Testing \\\\(x = -2\\\\):
\\\\(3(-2)^3 - 2(-2)^2 - 5(-2) + 6 = 3(-8) - 2(4) - 5(-2) + 6 = -24 - 8 + 10 + 6 = -16\\\\)
Not a root.

Testing \\\\(x = 3\\\\):
\\\\(3(3)^3 - 2(3)^2 - 5(3) + 6 = 3(27) - 2(9) - 5(3) + 6 = 81 - 18 - 15 + 6 = 54\\\\)
Not a root.

Testing \\\\(x = -3\\\\):
\\\\(3(-3)^3 - 2(-3)^2 - 5(-3) + 6 = 3(-27) - 2(9) - 5(-3) + 6 = -81 - 18 + 15 + 6 = -78\\\\)
Not a root.

Testing \\\\(x = \\\\frac{2}{3}\\\\):
\\\\(3(\\\\frac{2}{3})^3 - 2(\\\\frac{2}{3})^2 - 5(\\\\frac{2}{3}) + 6\\\\)
\\\\(= 3 \\\\cdot \\\\frac{8}{27} - 2 \\\\cdot \\\\frac{4}{9} - 5 \\\\cdot \\\\frac{2}{3} + 6\\\\)
\\\\(= \\\\frac{8}{9} - \\\\frac{8}{9} - \\\\frac{10}{3} + 6\\\\)
\\\\(= 0 - \\\\frac{10}{3} + 6\\\\)
\\\\(= 6 - \\\\frac{10}{3}\\\\)
\\\\(= \\\\frac{18}{3} - \\\\frac{10}{3}\\\\)
\\\\(= \\\\frac{8}{3}\\\\)
Not a root.

Testing \\\\(x = \\\\frac{1}{3}\\\\):
\\\\(3(\\\\frac{1}{3})^3 - 2(\\\\frac{1}{3})^2 - 5(\\\\frac{1}{3}) + 6\\\\)
\\\\(= 3 \\\\cdot \\\\frac{1}{27} - 2 \\\\cdot \\\\frac{1}{9} - 5 \\\\cdot \\\\frac{1}{3} + 6\\\\)
\\\\(= \\\\frac{3}{27} - \\\\frac{2}{9} - \\\\frac{5}{3} + 6\\\\)
\\\\(= \\\\frac{1}{9} - \\\\frac{2}{9} - \\\\frac{5}{3} + 6\\\\)
\\\\(= -\\\\frac{1}{9} - \\\\frac{5}{3} + 6\\\\)
\\\\(= -\\\\frac{1}{9} - \\\\frac{5}{3} + \\\\frac{18}{3}\\\\)
\\\\(= -\\\\frac{1}{9} + \\\\frac{13}{3}\\\\)
\\\\(= -\\\\frac{1}{9} + \\\\frac{39}{9}\\\\)
\\\\(= \\\\frac{38}{9}\\\\)
Not a root.

Let me try synthetic division with \\\\(x = 2\\\\):
\\\\[
\\begin{array}{rrrr}
2 & 3 & -2 & -5 & 6 \\\\
& 6 & 8 & 6 \\\\
\\hline
& 3 & 4 & 3 & 12 \\\\
\\end{array}
\\\\]

So \\\\(x = 2\\\\) is not a factor.

Let's try with \\\\(x = -1\\\\):
\\\\[
\\begin{array}{rrrr}
-1 & 3 & -2 & -5 & 6 \\\\
& -3 & 5 & 0 \\\\
\\hline
& 3 & -5 & 0 & 6 \\\\
\\end{array}
\\\\]

This gives us \\\\(3x^3 - 2x^2 - 5x + 6 = 3(x+1)(x^2-5/3)\\\\)
This was an error in my synthetic division. Let me recalculate correctly:

Synthetic division with \\\\(x = -1\\\\):
\\\\[
\\begin{array}{rrrr}
-1 & 3 & -2 & -5 & 6 \\\\
& -3 & 5 & 0 \\\\
\\hline
& 3 & -5 & 0 & 6 \\\\
\\end{array}
\\\\]

This gives us \\\\(3x^3 - 2x^2 - 5x + 6 = (x+1)(3x^2-5x+0)\\\\)
Since 0 is a coefficient, I can simplify to \\\\((x+1)(3x^2-5x)\\\\)
Further factoring: \\\\((x+1)(3x-5)x\\\\)

So the factors are \\\\(x+1\\\\), \\\\(3x-5\\\\), and \\\\(x\\\\).
Setting each factor equal to zero:
\\\\(x+1=0\\\\) gives \\\\(x=-1\\\\)
\\\\(3x-5=0\\\\) gives \\\\(x=\\\\frac{5}{3}\\\\)
\\\\(x=0\\\\)

Therefore, the solutions to the cubic equation \\\\(3x^3 - 2x^2 - 5x + 6 = 0\\\\) are:
\\\\boxed{x = -1, x = 0, x = \\\\frac{5}{3}}\\\\)`
};

// Also create a template specific for Ordinary Level Mathematics
export const mathematicsOrdinaryLevel: SubjectPromptTemplate = {
  baseInstructions: `
You are an expert mathematics exam creator for the Irish Leaving Certificate Ordinary Level Mathematics.
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

Questions should reflect authentic Ordinary Level exam style, focusing on:
- Basic algebraic manipulation
- Coordinate geometry with emphasis on lines and circles
- Basic calculus (differentiation and simple integration)
- Functions and patterns
- Probability and statistics
- Financial mathematics

VERY IMPORTANT: Ensure that ALL questions STRICTLY match the specific topic requested by the user. 
For example, if "Coordinate Geometry" is requested, ONLY generate coordinate geometry questions.
If a subtopic like "The Line" is specified, ONLY generate questions about lines.
DO NOT generate questions from unrelated topics.

Ordinary Level questions should:
1. Be more straightforward than Higher Level
2. Focus on core concepts with less complexity
3. Still require mathematical understanding and not just memorization
4. Be solvable using techniques taught at Ordinary Level

Structure each solution with COMPLETE step-by-step explanations that:
1. Begin by stating the approach/method
2. Show EVERY step of calculation with proper LaTeX formatting
3. Include clear explanations for WHY each step is taken
4. Provide the final answer clearly marked with \\\\boxed{}

Solutions should be especially detailed and accessible for Ordinary Level students.
Each solution should provide sufficient explanation to allow students to understand the method.

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
}`,

  userPrompt: `
Generate Ordinary Level Mathematics questions with the requested difficulty.

CRITICAL: EVERY mathematical expression MUST be properly formatted with LaTeX. This includes ALL variables, numbers in equations, operations, and functions.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Coordinate Geometry" is specified, ALL questions must involve coordinates, lines, circles, etc.
- If "The Line" is specified, ALL questions must involve lines, slopes, perpendicular/parallel lines, etc.
- If "Calculus" is specified, ALL questions must involve differentiation or integration.

For Ordinary Level mathematics:
- Questions should be straightforward but still test understanding
- Ensure questions are specifically relevant to Ordinary Level curriculum
- Problems should have clear, methodical solutions
- All problems must be solvable with Ordinary Level techniques

For solutions, ALWAYS provide:
- A clear statement of the approach
- Every step shown in detail with LaTeX formatting
- Explanations of the mathematical principles being applied
- Final answers clearly boxed with \\\\boxed{answer}

Use LaTeX with double-escaped backslashes for ALL mathematical expressions:
- For fractions: \\\\(\\\\frac{numerator}{denominator}\\\\)
- For exponents: \\\\(x^{power}\\\\)
- For roots: \\\\(\\\\sqrt{expression}\\\\)

Return JSON only, with keys "questions" and "solutions".`,

  exampleQuestion: `Find the equation of the line passing through the points (2, 5) and (4, 9).`,
  
  exampleSolution: `To find the equation of a line passing through two points, I'll follow these steps:
1. Calculate the slope using the slope formula
2. Use the point-slope form to find the equation
3. Convert to the standard form y = mx + c

Step 1: Calculate the slope using the slope formula:
\\\\(m = \\\\frac{y_2 - y_1}{x_2 - x_1}\\\\)
\\\\(m = \\\\frac{9 - 5}{4 - 2}\\\\)
\\\\(m = \\\\frac{4}{2}\\\\)
\\\\(m = 2\\\\)

Step 2: Use the point-slope form with the first point (2, 5):
\\\\(y - y_1 = m(x - x_1)\\\\)
\\\\(y - 5 = 2(x - 2)\\\\)
\\\\(y - 5 = 2x - 4\\\\)

Step 3: Rearrange to get the equation in the form y = mx + c:
\\\\(y - 5 = 2x - 4\\\\)
\\\\(y = 2x - 4 + 5\\\\)
\\\\(y = 2x + 1\\\\)

To verify this is correct, let's check if the second point (4, 9) satisfies our equation:
\\\\(y = 2x + 1\\\\)
\\\\(9 = 2(4) + 1\\\\)
\\\\(9 = 8 + 1\\\\)
\\\\(9 = 9\\\\) ✓

Therefore, the equation of the line passing through the points (2, 5) and (4, 9) is:
\\\\boxed{y = 2x + 1}\\\\)

We can also write this in the standard form Ax + By + C = 0:
\\\\(y = 2x + 1\\\\)
\\\\(2x - y + 1 = 0\\\\)
\\\\boxed{2x - y + 1 = 0}\\\\)`
};

// More subject templates can be added similarly
export const physicsHigherLevel: SubjectPromptTemplate = {
  baseInstructions: `
You are an expert physics exam creator for the Irish Leaving Certificate Higher Level Physics.
Return valid JSON with "questions" and "solutions" keys. All mathematical expressions and calculations must use LaTeX with double-escaped backslashes (\\\\\\\\).

Physics questions should include:
- Clear problem statements with all necessary information
- Proper use of units and physical constants
- Diagrams described when relevant (to be rendered separately)

Solutions must:
1. State the relevant physical principles or laws
2. Show the formula selection and transformations
3. Include EVERY calculation step with proper units
4. Explain the physical meaning of the result
5. Verify units are consistent throughout

Return the JSON in this structure:
{
  "questions": [
    {
      "question": "Physics problem with clear context and LaTeX \\\\\\\\(F = ma\\\\\\\\)."
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Physics solution explaining principles, showing formulas and ALL steps \\\\\\\\(F = m \\\\cdot a = 2\\\\text{ kg} \\\\cdot 9.8\\\\text{ m/s}^2 = 19.6\\\\text{ N}\\\\\\\\).",
      "markingScheme": "2 marks: Identifying correct principle\\\\n3 marks: Correct formula\\\\n3 marks: Correct substitution\\\\n2 marks: Correct answer with units"
    }
  ]
}`,

  userPrompt: `
Generate Higher Level Physics questions with challenging difficulty.

For ALL physics questions:
- Require multi-step problem solving
- Include vector analysis where appropriate
- Require unit conversion or dimensional analysis
- For numerical problems, ALL solutions must show:
  * The formula in symbolic form first
  * Substitution with units
  * Step-by-step calculation
  * Final answer with proper units and significant figures

Return JSON only, with keys "questions" and "solutions".`
};

// Add an English Literature template
export const englishLiteratureHigherLevel: SubjectPromptTemplate = {
  baseInstructions: `
You are an expert English Literature exam creator for the Irish Leaving Certificate Higher Level English.
Return valid JSON with "questions" and "solutions" keys.

VERY IMPORTANT: For ANY text-based content (poems, passages, quotes), ensure proper formatting with:
- Line breaks between stanzas or paragraphs using "\\n\\n"
- Line breaks within poems or formatted text using "\\n"
- Clear separation between quoted text and questions using "\\n\\n"
- Numbered questions clearly separated from each other

When presenting poetry or prose extracts:
1. Format the original text with appropriate line breaks exactly as it appears in the source
2. Insert a clear separation between the text and questions (double line break)
3. Number each question and subquestion clearly
4. Leave space between questions for readability

For ALL literature analyses:
- Structure responses with clear paragraphs
- Separate key points with line breaks
- Use quotations properly formatted with quotation marks
- Include references to literary techniques with examples

Return JSON in this structure:
{
  "questions": [
    {
      "question": "Read the following poem and answer the questions below:\\n\\n'The Road Not Taken' by Robert Frost\\n\\nTwo roads diverged in a yellow wood,\\nAnd sorry I could not travel both\\nAnd be one traveler, long I stood\\nAnd looked down one as far as I could\\nTo where it bent in the undergrowth;\\n\\nThen took the other, as just as fair,\\nAnd having perhaps the better claim,\\nBecause it was grassy and wanted wear;\\nThough as for that the passing there\\nHad worn them really about the same.\\n\\n[... rest of poem with proper line breaks...]\\n\\n1. What is the main theme of this poem?\\n\\n2. How does Frost use imagery to convey the speaker's feelings about choices?"
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Analysis of 'The Road Not Taken' by Robert Frost:\\n\\n1. The main theme of this poem is the significance of life choices and their far-reaching consequences.\\n\\nFrost explores how a single decision can fundamentally alter the course of one's life. The diverging roads represent life's crossroads where we must choose one path over another, knowing we cannot experience both journeys. The speaker's final lines 'I took the one less traveled by,\\nAnd that has made all the difference' emphasize how choices, even seemingly small ones, can profoundly shape our identity and experience.\\n\\nThe poem also explores themes of regret, individualism, and the human tendency to assign special significance to our choices in retrospect.\\n\\n2. Frost uses rich natural imagery to convey the speaker's complex feelings about choice:\\n\\n- The 'yellow wood' evokes autumn, symbolizing maturity and the passing of time, suggesting the speaker is at a significant life juncture.\\n\\n- The detailed description of roads 'bent in the undergrowth' and being 'grassy and wanted wear' creates visual contrast between options while suggesting neither path was clearly superior.\\n\\n- The image of paths 'worn...really about the same' contradicts the speaker's later claim about taking the road 'less traveled by,' revealing how memory and narrative reshape our understanding of past choices.\\n\\n- The speaker 'looking down one path as far as possible' represents our limited ability to foresee consequences of our choices before making them.",
      "markingScheme": "Question 1:\\n5-7 marks: Basic identification of theme with limited textual support\\n8-10 marks: Thorough analysis with specific references to the poem\\n\\nQuestion 2:\\n5-7 marks: Identifies basic imagery with limited analysis\\n8-10 marks: Comprehensive analysis of multiple images with explanation of their significance"
    }
  ]
}`,

  userPrompt: `
Generate Higher Level English Literature questions with the requested difficulty.

FORMATTING IS CRUCIAL: 
- Use "\\n" for single line breaks within text
- Use "\\n\\n" for paragraph breaks or between different sections
- Format poetry with line breaks exactly as in the original
- Number questions clearly and separate them with line breaks
- Keep quoted passages clearly formatted with proper spacing

For text analysis questions:
- Present the text first with proper formatting and attribution
- Follow with clearly numbered and separated questions
- For poetry, maintain the exact line breaks and stanza structure
- For prose excerpts, maintain paragraph structure

When analyzing literary works:
- Focus on themes, literary devices, character development, and authorial intent
- Encourage critical thinking about the text's deeper meanings
- Include questions about style, tone, and language where appropriate

For solutions, ALWAYS provide:
- Clear, well-structured paragraphs with appropriate line breaks
- Specific textual evidence and quotations to support points
- Analysis of literary techniques and their effects
- Alternative interpretations where relevant

Return JSON only, with keys "questions" and "solutions".`,

  exampleQuestion: `Read the following poem and answer the questions below:\n\n'The Road Not Taken' by Robert Frost\n\nTwo roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;\n\nThen took the other, as just as fair,\nAnd having perhaps the better claim,\nBecause it was grassy and wanted wear;\nThough as for that the passing there\nHad worn them really about the same.\n\nAnd both that morning equally lay\nIn leaves no step had trodden black.\nOh, I kept the first for another day!\nYet knowing how way leads on to way,\nI doubted if I should ever come back.\n\nI shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.\n\n1. What is the main theme of this poem?\n\n2. How does Frost use imagery to convey the speaker's feelings about choices?`,
  
  exampleSolution: `Analysis of 'The Road Not Taken' by Robert Frost:\n\n1. The main theme of this poem is the significance of life choices and their far-reaching consequences.\n\nFrost explores how a single decision can fundamentally alter the course of one's life. The diverging roads represent life's crossroads where we must choose one path over another, knowing we cannot experience both journeys. The speaker's final lines 'I took the one less traveled by,\nAnd that has made all the difference' emphasize how choices, even seemingly small ones, can profoundly shape our identity and experience.\n\nThe poem also explores themes of regret, individualism, and the human tendency to assign special significance to our choices in retrospect.\n\n2. Frost uses rich natural imagery to convey the speaker's complex feelings about choice:\n\n- The 'yellow wood' evokes autumn, symbolizing maturity and the passing of time, suggesting the speaker is at a significant life juncture.\n\n- The detailed description of roads 'bent in the undergrowth' and being 'grassy and wanted wear' creates visual contrast between options while suggesting neither path was clearly superior.\n\n- The image of paths 'worn...really about the same' contradicts the speaker's later claim about taking the road 'less traveled by,' revealing how memory and narrative reshape our understanding of past choices.\n\n- The speaker 'looking down one path as far as possible' represents our limited ability to foresee consequences of our choices before making them.`
};

// Update the subject prompts map to include English Literature
export const subjectPrompts: Record<string, Record<string, SubjectPromptTemplate>> = {
  "mathematics": {
    "Higher Level": mathematicsHigherLevel,
    "Ordinary Level": mathematicsOrdinaryLevel,
    "default": mathematicsHigherLevel // Default if level not specified
  },
  "physics": {
    "default": physicsHigherLevel // Only one level defined so far
  },
  "english": {
    "Higher Level": englishLiteratureHigherLevel,
    "default": englishLiteratureHigherLevel
  },
  "englishliterature": {
    "Higher Level": englishLiteratureHigherLevel,
    "default": englishLiteratureHigherLevel
  }
};

// Generic template for subjects without specific templates
export const genericTemplate: SubjectPromptTemplate = {
  baseInstructions: `
You are an expert exam creator for the Irish education system.
Return valid JSON with "questions" and "solutions" keys.
All calculations must show detailed working.

Questions should match the expected level and reflect authentic exam questions.
Provide detailed, clear solutions that would help students understand the concepts.
Include appropriate marking schemes that reflect partial and full credit scenarios.

Return JSON in this structure:
{
  "questions": [
    {
      "question": "Question text with clear instructions."
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Detailed solution with reasoning and steps.",
      "markingScheme": "0-3: Basic understanding\\\\n4-7: Partial solution\\\\n8-10: Complete solution"
    }
  ]
}`,

  userPrompt: `
Generate questions appropriate for the specified subject, level, and difficulty.

Ensure each solution:
- Explains the approach/method
- Shows all steps clearly
- Provides explanations for why each step is taken
- Concludes with a clear final answer

Return JSON only, with keys "questions" and "solutions".`
};

// Helper function to get the appropriate prompt template for a subject
export function getSubjectPrompt(subject: string, level: string): SubjectPromptTemplate {
  // Convert to lowercase and remove spaces for consistent matching
  const normalizedSubject = subject.toLowerCase().replace(/\s+/g, '');
  
  // First, try to get subject-specific prompts from the subject folder
  try {
    // Dynamic import attempt for subject-specific prompts
    // This will check for a prompts.ts file in the subject folder
    const subjectPrompts = require(`@/data/subjects/${normalizedSubject}/prompts`).default;
    
    if (subjectPrompts) {
      console.log(`Found subject-specific prompts for ${subject}`);
      return {
        baseInstructions: subjectPrompts.baseInstructions,
        userPrompt: subjectPrompts.userPrompt,
        exampleQuestion: subjectPrompts.exampleQuestion,
        exampleSolution: subjectPrompts.exampleSolution
      };
    }
  } catch (error) {
    // If no specific prompts file is found, continue with normal prompt lookup
    console.log(`No subject-specific prompts found for ${subject}, using standard templates`);
  }
  
  // Get subject-specific templates if available
  const subjectTemplates = subjectPrompts[normalizedSubject];
  
  if (subjectTemplates) {
    // Try to get level-specific template
    if (level && subjectTemplates[level]) {
      return subjectTemplates[level];
    }
    // Fall back to default template for the subject
    return subjectTemplates.default;
  }
  
  // Return generic template if no specific templates exist
  return genericTemplate;
} 