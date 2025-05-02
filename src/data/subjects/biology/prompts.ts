/**
 * Biology-specific prompts for question generation
 * These prompts override the default prompts in the API
 */

// Configuration for LaTeX usage in biology
export const latexConfig = {
  // Biology has occasional formulas but is not primarily calculation-based
  requiresFullLatex: false,
  isMixedContent: true,
  
  // Some basic formulas that are used in biology
  examples: {
    geneticCrossing: "\\\\(Aa \\\\times Aa \\\\rightarrow 25\\\\% AA : 50\\\\% Aa : 25\\\\% aa\\\\)",
    hardyWeinberg: "\\\\(p^2 + 2pq + q^2 = 1\\\\)",
    respirationEquation: "\\\\(C_6H_{12}O_6 + 6O_2 \\\\rightarrow 6CO_2 + 6H_2O + \\\\text{Energy}\\\\)",
    photosynthesisEquation: "\\\\(6CO_2 + 6H_2O + \\\\text{Light energy} \\\\rightarrow C_6H_{12}O_6 + 6O_2\\\\)"
  }
};

// Base instructions used in the system prompt
export const baseInstructions = `
You are an expert biology exam creator for the Irish Leaving Certificate.
Return valid JSON with "questions" and "solutions" keys.

IMPORTANT: Biology uses primarily text explanations with occasional formulas. When mathematical or chemical expressions are needed:
1. Use LaTeX ONLY for formulas, equations, and scientific notation
2. Use double-escaped backslashes for LaTeX (\\\\\\\\)
3. DO NOT put regular text or explanations inside LaTeX delimiters
4. Wrap mathematical expressions in LaTeX delimiters: \\\\( ... \\\\)

Biology questions should focus on:
- Cell biology and biochemistry
- Genetics and heredity
- Human physiology and anatomy
- Plant biology and physiology
- Ecology and environmental biology
- Microbiology and biotechnology
- Evolution and biodiversity

Question formats should include:
- Short answer knowledge-based questions
- Data interpretation and analysis
- Experimental design and scientific method
- Diagram labeling and processes explanation
- Extended response questions requiring critical thinking

VERY IMPORTANT: Ensure that ALL questions STRICTLY match the specific topic requested by the user. 
For example, if "Genetics" is requested, ONLY generate genetics questions.
If a subtopic like "Mendelian Inheritance" is specified, ONLY generate questions about dominant/recessive traits and Mendelian patterns.
DO NOT generate questions from unrelated topics.

Structure solutions to:
1. Begin with clear explanations of relevant biological concepts
2. Provide scientifically accurate information
3. Use proper biological terminology and nomenclature
4. For chemical equations, use proper chemical formulas with LaTeX
5. For genetic problems, show full crosses and probability calculations with LaTeX
6. For mathematical calculations (e.g., Hardy-Weinberg), show all steps clearly

The JSON format must follow this structure:
{
  "questions": [
    {
      "question": "Detailed biology question with clear context and requirements."
    }
  ],
  "solutions": [
    {
      "questionIndex": 1,
      "solution": "Comprehensive solution with scientifically accurate information and proper terminology.",
      "markingScheme": "0-3: Basic concepts identified\\\\n4-7: Key processes explained\\\\n8-10: Comprehensive answer with specific examples"
    }
  ]
}`;

// User prompt used for generating questions
export const userPrompt = `
Generate biology questions with appropriate difficulty for the specified level.

IMPORTANT: You MUST create questions that match EXACTLY the specified topic. For example:
- If "Genetics" is specified, ALL questions must involve genetic principles and inheritance.
- If "Mendelian Inheritance" is specified, ALL questions must specifically address dominant/recessive traits and Mendelian patterns.
- If "Photosynthesis" is specified, ALL questions must involve the process of photosynthesis.

For biology questions:
- Use clear, precise scientific language
- Incorporate diagrams descriptions where helpful
- Include data analysis or experimental design where appropriate
- Ensure questions test both factual recall and application of knowledge
- For Higher Level, include questions requiring deeper analysis and synthesis

For scientific notation and equations:
- Use proper chemical formulas: ${latexConfig.examples.respirationEquation}
- For genetic crosses, show appropriate notation: ${latexConfig.examples.geneticCrossing}
- For mathematical formulas like Hardy-Weinberg: ${latexConfig.examples.hardyWeinberg}

For solutions:
- Provide scientifically accurate explanations
- Use proper biological terminology
- Include labeled diagrams descriptions when needed
- Structure responses logically
- For questions involving calculations or genetic crosses, show all steps

Return JSON only, with keys "questions" and "solutions".`;

// Example question with appropriate formatting
export const exampleQuestion = `
In a population of 10,000 individuals, 100 people exhibit albinism, a recessive trait caused by a mutation in the OCA2 gene.

(a) Calculate the frequency of the recessive allele (q) and the dominant allele (p) in this population.
(b) Determine how many individuals in this population are heterozygous carriers for albinism.
(c) If this population practices random mating, calculate the expected number of children with albinism from matings between carriers.
(d) Explain how genetic drift might affect the frequency of albinism in a small isolated community of 100 individuals.`;

// Example solution with appropriate formatting
export const exampleSolution = `
This question involves applying the Hardy-Weinberg equilibrium to calculate allele frequencies and genotype distributions for albinism.

(a) Calculating allele frequencies:

Since albinism is a recessive trait, individuals with albinism have the genotype aa.
The number of individuals with albinism = 100 out of 10,000 total population.

The frequency of homozygous recessive individuals (q²) = 100/10,000 = 0.01

Therefore, the frequency of the recessive allele q = √0.01 = 0.1

The frequency of the dominant allele p = 1 - q = 1 - 0.1 = 0.9

So, p = 0.9 and q = 0.1

(b) Determining heterozygous carriers:

According to the Hardy-Weinberg equation: \\\\(p^2 + 2pq + q^2 = 1\\\\)

Where:
- \\\\(p^2\\\\) represents the frequency of homozygous dominant individuals (AA)
- \\\\(2pq\\\\) represents the frequency of heterozygous individuals (Aa)
- \\\\(q^2\\\\) represents the frequency of homozygous recessive individuals (aa)

The frequency of heterozygous carriers = 2pq = 2(0.9)(0.1) = 0.18

The number of heterozygous carriers in the population = 0.18 × 10,000 = 1,800 individuals

(c) Expected number of children with albinism from carrier-carrier matings:

When two heterozygous carriers (Aa × Aa) mate, the possible outcomes follow a Mendelian ratio:
\\\\(Aa \\\\times Aa \\\\rightarrow 25\\\\% AA : 50\\\\% Aa : 25\\\\% aa\\\\)

So, 25% or 1/4 of the offspring from carrier-carrier matings will have albinism (aa).

Total number of possible carrier-carrier matings:
If we assume random mating, the probability of a carrier mating with another carrier = 0.18 × 0.18 = 0.0324

Expected number of carrier-carrier mating pairs = 0.0324 × (10,000/2) = 162 pairs
(assuming 10,000 individuals form 5,000 mating pairs)

Expected number of children with albinism from these matings = 162 × 0.25 = 40.5, or approximately 41 children

(d) Effects of genetic drift in a small population:

Genetic drift refers to random changes in allele frequencies due to chance sampling, particularly in small populations. In a small isolated community of 100 individuals:

1. Increased impact of sampling error: With only 100 individuals, random fluctuations in allele frequencies have a much greater proportional impact than in a population of 10,000.

2. Potential for founder effect: If the small community was established by a subset of individuals from the larger population, they might have a different initial frequency of the albinism allele.

3. Accelerated fixation or loss: The recessive allele could either be eliminated from the population or become fixed (reaching 100% frequency) more rapidly than in a larger population.

4. Reduced effectiveness of selection: Natural selection may be less effective against recessive conditions in small populations, potentially allowing the albinism allele to persist even if slightly deleterious.

5. Inbreeding effects: Small populations often experience increased inbreeding, which would increase the expression of recessive traits like albinism by increasing homozygosity.

For example, if by chance no carriers of albinism were among the 100 individuals, the allele would be completely lost. Alternatively, if by chance a higher proportion of carriers were present, the frequency could increase dramatically in subsequent generations, leading to a much higher incidence of albinism than in the original population.`;

// Export all components
export default {
  latexConfig,
  baseInstructions,
  userPrompt,
  exampleQuestion,
  exampleSolution
}; 