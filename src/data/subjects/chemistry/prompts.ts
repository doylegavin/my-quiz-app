/**
 * Chemistry-specific prompts for question generation
 * These prompts override the default prompts in the API
 */

// Configuration for LaTeX usage in chemistry
export const latexConfig = {
  // Chemistry requires regular LaTeX formatting for formulas and equations
  requiresFullLatex: true,
  isMixedContent: true,
  
  // Some common chemistry formulas and notations
  examples: {
    chemicalEquation: "\\\\(C_3H_8 + 5O_2 \\\\rightarrow 3CO_2 + 4H_2O\\\\)",
    equilibriumConstant: "\\\\(K_c = \\\\frac{[products]}{[reactants]}\\\\)",
    arrheniusEquation: "\\\\(k = Ae^{-E_a/RT}\\\\)",
    pHCalculation: "\\\\(pH = -\\\\log_{10}[H^+]\\\\)",
    bondEnergy: "\\\\(\\\\Delta H = \\\\sum \\\\text{bonds broken} - \\\\sum \\\\text{bonds formed}\\\\)"
  }
};

// Base instructions used in the system prompt
export const baseInstructions = `
You are an expert chemistry exam creator for the Irish Leaving Certificate.
Return valid JSON with "questions" and "solutions" keys.

IMPORTANT: Chemistry requires precise formatting for chemical formulas, equations, and calculations:
1. Use LaTeX for ALL chemical formulas, equations, and mathematical expressions
2. Use double-escaped backslashes for LaTeX (\\\\\\\\)
3. DO NOT put regular text explanations inside LaTeX delimiters
4. Wrap mathematical and chemical expressions in LaTeX delimiters: \\\\( ... \\\\)

Chemistry questions should focus on:
- Atomic structure and periodic table trends
- Chemical bonding and molecular structure
- Stoichiometry and chemical calculations
- Acids, bases and pH
- Redox reactions and electrochemistry
- Organic chemistry and functional groups
- Thermochemistry and reaction rates
- Chemical equilibrium
- Environmental chemistry

Question formats should include:
- Balanced chemical equations
- Stoichiometric calculations
- Reaction mechanism identification
- Laboratory procedure descriptions
- Data analysis and interpretation
- Problem-solving requiring application of chemical principles

VERY IMPORTANT: Ensure that ALL questions STRICTLY match the specific topic requested by the user.
For example, if "Organic Chemistry" is requested, ONLY generate organic chemistry questions.
If a subtopic like "Alkenes" is specified, ONLY generate questions about alkene structure, properties, and reactions.
DO NOT generate questions from unrelated topics.

Structure solutions to:
1. Include properly balanced chemical equations with correct states of matter
2. Show all calculation steps clearly, with proper units
3. Include relevant chemical principles and theories
4. Use IUPAC nomenclature for naming compounds
5. Follow standard conventions for showing reaction mechanisms
6. Identify limiting reagents, theoretical/actual yields where applicable

The JSON format must follow this structure:
{
  "questions": [
    {
      "question": "Detailed chemistry question with clear context and requirements."
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Comprehensive solution with balanced equations, calculations, and proper chemical terminology.",
      "markingScheme": "0-3: Basic concepts identified\\\\n4-7: Key processes explained with some calculations\\\\n8-10: Complete solution with all steps and correct units"
    }
  ]
}`;

// User prompt used for generating questions
export const userPrompt = `
Generate chemistry questions with appropriate difficulty for the specified level.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Acids and Bases" is specified, ALL questions must involve acid-base theory, calculations, or reactions.
- If "Titration" is specified, ALL questions must specifically address titration procedures, calculations, or theory.
- If "Organic Chemistry" is specified, ALL questions must involve organic compounds, their structure, or reactions.

For chemistry questions:
- Use proper chemical formulas and equations with LaTeX: ${latexConfig.examples.chemicalEquation}
- Include state symbols where appropriate: (s), (l), (g), (aq)
- For equilibrium expressions, use proper formatting: ${latexConfig.examples.equilibriumConstant}
- For thermodynamic or kinetic equations, use proper notation: ${latexConfig.examples.arrheniusEquation}
- For higher level, include multistep problems requiring integration of concepts

For solutions:
- Show balanced chemical equations
- Provide step-by-step calculations with units
- Include explanations of relevant chemical principles
- Use proper IUPAC nomenclature
- For organic chemistry, show mechanisms with curved arrows where appropriate

Return JSON only, with keys "questions" and "solutions".`;

// Example question with appropriate formatting
export const exampleQuestion = `
A 25.0 mL sample of vinegar was diluted to 250.0 mL with distilled water. A 25.0 mL portion of this diluted solution was then titrated with 0.100 M NaOH. It required 27.5 mL of the NaOH solution to neutralize the acetic acid in the vinegar.

(a) Write the balanced chemical equation for the neutralization reaction.
(b) Calculate the concentration of acetic acid in the diluted vinegar solution.
(c) Calculate the concentration of acetic acid in the original vinegar sample.
(d) If the density of the original vinegar is 1.005 g/mL, calculate the percentage by mass of acetic acid in the vinegar.
(e) The manufacturer claims the vinegar contains 5.0% acetic acid by mass. Evaluate this claim based on your calculations.`;

// Example solution with appropriate formatting
export const exampleSolution = `
This question involves acid-base titration calculations to determine the concentration of acetic acid in vinegar.

(a) Balanced chemical equation:

\\\\(CH_3COOH_{(aq)} + NaOH_{(aq)} \\\\rightarrow CH_3COONa_{(aq)} + H_2O_{(l)}\\\\)

The equation shows that acetic acid (CH₃COOH) reacts with sodium hydroxide (NaOH) in a 1:1 molar ratio to produce sodium acetate (CH₃COONa) and water.

(b) Calculation of acetic acid concentration in the diluted solution:

Using the titration data:
- Volume of diluted vinegar solution = 25.0 mL
- Volume of 0.100 M NaOH required = 27.5 mL
- Concentration of NaOH = 0.100 mol/L

From the balanced equation, we know that acetic acid and NaOH react in a 1:1 molar ratio.

Moles of NaOH used = Concentration × Volume
\\\\(n_{NaOH} = 0.100 \\\\text{ mol/L} \\\\times 27.5 \\\\times 10^{-3} \\\\text{ L} = 2.75 \\\\times 10^{-3} \\\\text{ mol}\\\\)

Since the molar ratio is 1:1, moles of acetic acid in the 25.0 mL sample = 2.75 × 10⁻³ mol

Concentration of acetic acid in the diluted solution:
\\\\([CH_3COOH] = \\\\frac{2.75 \\\\times 10^{-3} \\\\text{ mol}}{25.0 \\\\times 10^{-3} \\\\text{ L}} = 0.110 \\\\text{ mol/L}\\\\)

(c) Calculation of acetic acid concentration in the original vinegar:

The original 25.0 mL vinegar sample was diluted to 250.0 mL (a dilution factor of 10).
According to the dilution equation: C₁V₁ = C₂V₂

C₁ = concentration of original vinegar
V₁ = volume of original vinegar = 25.0 mL
C₂ = concentration of diluted solution = 0.110 mol/L
V₂ = volume of diluted solution = 250.0 mL

\\\\(C_1 = \\\\frac{C_2 \\\\times V_2}{V_1} = \\\\frac{0.110 \\\\text{ mol/L} \\\\times 250.0 \\\\text{ mL}}{25.0 \\\\text{ mL}} = 1.10 \\\\text{ mol/L}\\\\)

Therefore, the concentration of acetic acid in the original vinegar is 1.10 mol/L.

(d) Calculation of percentage by mass of acetic acid:

Molecular mass of acetic acid (CH₃COOH) = 60.05 g/mol
Concentration of acetic acid = 1.10 mol/L

Mass of acetic acid per liter = 1.10 mol/L × 60.05 g/mol = 66.06 g/L

Mass of acetic acid per 100 mL = 66.06 g/L × (100 mL / 1000 mL) = 6.606 g

Mass of 100 mL of vinegar = 100 mL × 1.005 g/mL = 100.5 g

Percentage by mass = (Mass of acetic acid / Mass of vinegar) × 100%
\\\\(\\\\text{Percentage by mass} = \\\\frac{6.606 \\\\text{ g}}{100.5 \\\\text{ g}} \\\\times 100\\\\% = 6.57\\\\%\\\\)

(e) Evaluation of the manufacturer's claim:

The manufacturer claims the vinegar contains 5.0% acetic acid by mass, but our calculation shows 6.57%.

The difference is:
\\\\(\\\\text{Difference} = \\\\frac{|6.57\\\\% - 5.0\\\\%|}{5.0\\\\%} \\\\times 100\\\\% = 31.4\\\\%\\\\)

This is a significant difference, more than would be expected from experimental error alone. Possible explanations include:
1. Analytical error in our titration procedure
2. The manufacturer's claim is inaccurate
3. The vinegar may have concentrated over time due to evaporation
4. The dilution or measurement may have been performed incorrectly

To properly evaluate the claim, replicate analyses would be necessary. Based on this single analysis, the manufacturer's claim of 5.0% appears to be lower than the actual acetic acid content in the vinegar sample tested.`;

// Export all components
export default {
  latexConfig,
  baseInstructions,
  userPrompt,
  exampleQuestion,
  exampleSolution
}; 