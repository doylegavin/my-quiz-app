import { LevelData } from '../types';

const mathsFoundationLevel: LevelData = {
  mathematics: {
    papers: {
      Both: {
        name: "Both",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Number Theory": [
            "Integers and Operations",
            "Fractions and Decimals",
            "Percentages",
            "Ratio and Proportion",
            "Estimation and Approximation"
          ],
          "Algebra": [
            "Basic Expressions",
            "Simple Equations",
            "Linear Patterns",
            "Formulas and Substitution"
          ],
          "Functions": [
            "Linear Functions",
            "Basic Graphing",
            "Rates of Change"
          ],
          "Geometry": [
            "Angles and Shapes",
            "Area and Perimeter",
            "Volume and Surface Area",
            "Symmetry and Transformations"
          ],
          "Trigonometry": [
            "Right-Angled Triangles",
            "Basic Trigonometric Ratios",
            "Applications of Trigonometry"
          ],
          "Statistics": [
            "Data Collection",
            "Averages (Mean, Median, Mode)",
            "Data Presentation",
            "Range and Spread"
          ],
          "Probability": [
            "Basic Probability Concepts",
            "Probability Scale",
            "Simple Events",
            "Probability Trees"
          ],
        },
      },
    },
    difficulty: ["Random", "Easy", "Medium"],
    levels: ["Foundation Level"],
  },
};

export default mathsFoundationLevel; 