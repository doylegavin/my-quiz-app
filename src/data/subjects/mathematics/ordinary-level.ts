import { LevelData } from '../types';

const mathsOrdinaryLevel: LevelData = {
  mathematics: {
    papers: {
      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [],
          "Complex Numbers": [],
          "Sequences and Series": [],
          "Functions": [],
          "Differential Calculus": [],
          "Financial Maths": [],
          "Geometry": [],
          "Trigonometry": [],
          "Coordinate Geometry The Line": [],
          "Coordinate Geometry The Circle": [],
          "Probability": [],
          "Statistics": [],
          "Constructions": [],
        },
      },
      paper1: {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Algebra": [
            "Expressions, Notation & Substitution",
            "Factorising",
            "Expanding & Re-Grouping Expressions",
            "Algebraic Fractions",
            "Equations",
            "Inequalities",
            "Absolute Value (Modulus)",
            "Algebraic Manipulation",
            "Problem Solving Using Algebra",
          ],
          "Complex Numbers": [
            "Introduction to Complex Numbers",
            "Addition & Subtraction",
            "Multiplication & Division",
            "Conjugates & Modulus",
            "Argand Diagram",
          ],
          "Sequences and Series": [
            "Arithmetic Sequences",
            "Arithmetic Series",
            "Geometric Sequences",
            "Geometric Series",
          ],
          "Functions": [
            "Linear Functions",
            "Quadratic Functions",
            "Graphing Functions",
          ],
          "Differential Calculus": [
            "First Derivatives",
            "Second Derivatives",
            "Slopes of Tangents",
            "Maxima and Minima",
          ],
          "Financial Maths": [
            "Compound Interest",
            "Depreciation",
            "Loans and Investments",
          ],
        },
      },
      paper2: {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Geometry": [
            "Basic Geometric Concepts",
            "Angles & Lines",
            "Triangles & Congruence",
            "Quadrilaterals",
            "Circles & Theorems",
          ],
          "Trigonometry": [
            "Right-Angled Triangles & Pythagoras",
            "Trigonometric Ratios",
            "Special Angles (30°, 45°, 60°)",
            "The Sine Rule",
            "The Cosine Rule",
            "Area of a Triangle",
          ],
          "Coordinate Geometry The Line": [
            "Distance Between Two Points",
            "Midpoint of a Line Segment",
            "Slope of a Line",
            "Equation of a Line",
            "Intersection of Lines",
          ],
          "Coordinate Geometry The Circle": [
            "Equations of Circles",
            "Lines and Circles",
            "Points Inside, Outside, or On a Circle",
            "Tangents and Chords",
          ],
          "Probability": [
            "Fundamental Principle of Counting",
            "Permutations & Combinations",
            "Probability Theory",
            "Tree Diagrams",
            "Expected Value",
          ],
          "Statistics": [
            "Measures of Central Tendency",
            "Measures of Variation",
            "Probability Distributions",
            "The Normal Distribution",
          ],
          "Constructions": [
            "Basic Constructions",
            "Higher-Level Constructions",
          ],
        },
      },
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"],
  },
};

export default mathsOrdinaryLevel; 