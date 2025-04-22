import { LevelData } from '../types';

const chemistryOrdinaryLevel: LevelData = {
  chemistry: {
    papers: {
      "Paper": {
        name: "Chemistry Paper",
        sections: ["Section A (Experiments)", "Section B (Short Questions)", "Section C (Long Questions)"],
        topics: {
          "Atomic Structure and Periodic Table": [
            "Atomic Model",
            "Protons, Neutrons, Electrons",
            "Electronic Structure",
            "Periodic Table Organization",
            "Periodic Trends",
            "Element Properties",
            "Groups and Periods",
            "Metals and Non-metals"
          ],
          "Chemical Bonding": [
            "Ionic Bonding",
            "Covalent Bonding",
            "Metallic Bonding",
            "Electronegativity",
            "Bond Polarity",
            "Simple Molecular Shapes",
            "Intermolecular Forces"
          ],
          "Chemical Formulas and Equations": [
            "Chemical Symbols",
            "Writing Formulas",
            "Balancing Equations",
            "Mole Concept",
            "Percentage Composition",
            "Simple Calculations",
            "Avogadro's Number"
          ],
          "Volumetric Analysis": [
            "Acid-Base Titrations",
            "Basic Redox Titrations",
            "Common Indicators",
            "Standard Solutions",
            "Simple Calculations",
            "Experimental Techniques"
          ],
          "Fuels and Heat of Reaction": [
            "Exothermic and Endothermic Reactions",
            "Combustion",
            "Fossil Fuels",
            "Alternative Fuels",
            "Simple Energy Calculations",
            "Heat of Reaction"
          ],
          "Rates of Reaction": [
            "Collision Theory",
            "Factors Affecting Rate",
            "Catalysts",
            "Concentration Effects",
            "Temperature Effects",
            "Simple Rate Experiments"
          ],
          "Organic Chemistry": [
            "Hydrocarbons",
            "Alkanes",
            "Alkenes",
            "Alcohols",
            "Carboxylic Acids",
            "Simple Organic Reactions",
            "Functional Groups",
            "Isomerism"
          ],
          "Chemical Equilibrium": [
            "Reversible Reactions",
            "Le Chatelier's Principle",
            "Simple Equilibrium Systems",
            "Factors Affecting Equilibrium"
          ],
          "Acids and Bases": [
            "Properties of Acids and Bases",
            "pH Scale",
            "Neutralization",
            "Strong and Weak Acids/Bases",
            "Common Acid-Base Reactions"
          ],
          "Redox Reactions": [
            "Oxidation and Reduction",
            "Oxidation Numbers",
            "Simple Redox Equations",
            "Oxidizing and Reducing Agents",
            "Simple Electrochemical Cells"
          ],
          "Practical Experiments": [
            "Flame Tests",
            "pH Testing",
            "Simple Titrations",
            "Preparation of Oxygen",
            "Rates of Reaction Experiments",
            "Simple Organic Tests",
            "Water Testing",
            "Standard Solutions"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default chemistryOrdinaryLevel;