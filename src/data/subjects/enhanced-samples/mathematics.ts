/**
 * Enhanced sample data for Mathematics subject
 */
import { EnhancedSubject } from '@/data/subjects/enhanced-types';

const enhancedMathematics: EnhancedSubject = {
  name: "Mathematics",
  description: "The study of numbers, quantities, and shapes. Mathematics at Leaving Certificate level covers algebra, calculus, probability, statistics, geometry, and trigonometry.",
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  keywords: ["mathematics", "math", "maths", "algebra", "calculus", "geometry"],
  relatedSubjects: ["Applied Mathematics", "Physics", "Economics", "Accounting"],
  levels: {
    "Higher Level": {
      name: "Higher Level",
      description: "Higher Level Mathematics challenges students with complex mathematical concepts and applications. This level includes advanced topics in calculus, algebra, and geometry.",
      papers: {
        "Both": {
          name: "All Papers",
          description: "Combined content from both Paper 1 and Paper 2.",
          sections: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"],
          topics: {}
        },
        "paper1": {
          name: "Paper 1",
          description: "Focuses on algebra, complex numbers, functions, calculus, and sequences and series.",
          sections: ["Short Questions", "Long Questions"],
          topics: {
            "Algebra": {
              name: "Algebra",
              description: "The branch of mathematics dealing with symbols and the rules for manipulating these symbols. It forms the foundation for much of higher mathematics.",
              keywords: ["algebra", "equations", "expressions", "polynomials", "factoring"],
              subtopics: {
                "Expressions, Notation & Substitution": {
                  name: "Expressions, Notation & Substitution",
                  description: "Working with algebraic expressions, mathematical notation, and substituting values into expressions.",
                  keywords: ["expressions", "notation", "substitution", "simplify"],
                  examples: [
                    "Simplify the expression 3(2x - 5) + 4(x + 3) and evaluate when x = 2.",
                    "Given f(x) = x² - 3x + 4, calculate f(2) and f(-1)."
                  ],
                  difficulty: "Easy"
                },
                "Factorising": {
                  name: "Factorising",
                  description: "The process of finding the factors that multiply together to give a polynomial expression.",
                  keywords: ["factoring", "factorising", "common factor", "difference of squares", "quadratic"],
                  examples: [
                    "Factorise x² - 9x + 14 completely.",
                    "Express x³ - 8 as a product of factors."
                  ],
                  difficulty: "Medium"
                },
                "Solving Higher-Order Equations": {
                  name: "Solving Higher-Order Equations",
                  description: "Techniques for solving polynomial equations of degree 3 or higher.",
                  keywords: ["cubic equations", "quartic", "higher-order", "polynomial equations", "factor theorem"],
                  examples: [
                    "Solve the cubic equation x³ - 6x² + 11x - 6 = 0 given that x = 1 is a root.",
                    "Find all real and complex roots of x⁴ - 5x² + 4 = 0."
                  ],
                  difficulty: "Hard"
                }
              }
            },
            "Differential Calculus": {
              name: "Differential Calculus",
              description: "The branch of calculus concerned with the rate at which quantities change (derivatives).",
              keywords: ["differentiation", "derivatives", "rate of change", "tangent", "maxima", "minima"],
              subtopics: {
                "First Derivatives": {
                  name: "First Derivatives",
                  description: "Computing first derivatives of functions and applying them to find rates of change and tangent lines.",
                  keywords: ["derivative", "differentiation", "rate of change", "tangent"],
                  examples: [
                    "Find the derivative of f(x) = 3x⁴ - 2x³ + 5x - 7.",
                    "Find the equation of the tangent line to the curve y = x² - 4x + 7 at the point where x = 3."
                  ],
                  difficulty: "Medium"
                },
                "Maxima and Minima": {
                  name: "Maxima and Minima",
                  description: "Finding and classifying extreme values of functions using differentiation.",
                  keywords: ["maximum", "minimum", "extrema", "critical points", "optimization"],
                  examples: [
                    "Find the maximum and minimum values of f(x) = x³ - 3x² - 9x + 5 on the interval [-2, 4].",
                    "A rectangular field is to be enclosed with 120m of fencing. Find the dimensions that maximize the area."
                  ],
                  difficulty: "Hard"
                }
              }
            }
          }
        },
        "paper2": {
          name: "Paper 2",
          description: "Focuses on geometry, trigonometry, probability, and statistics.",
          sections: ["Short Questions", "Long Questions"],
          topics: {
            "Probability": {
              name: "Probability",
              description: "The branch of mathematics concerned with numerical descriptions of how likely an event is to occur.",
              keywords: ["probability", "chance", "likelihood", "random", "events", "outcomes"],
              subtopics: {
                "Probability Theory": {
                  name: "Probability Theory",
                  description: "Fundamental concepts and theory of probability including basic principles and axioms.",
                  keywords: ["probability theory", "sample space", "events", "axioms"],
                  examples: [
                    "If P(A) = 0.4, P(B) = 0.5, and P(A ∩ B) = 0.2, find P(A ∪ B) and determine if A and B are independent events.",
                    "A fair die is rolled twice. Find the probability of getting a sum greater than 9."
                  ],
                  difficulty: "Medium"
                },
                "The Binomial Distribution": {
                  name: "The Binomial Distribution",
                  description: "A discrete probability distribution that models the number of successes in a fixed number of independent trials.",
                  keywords: ["binomial", "distribution", "bernoulli", "trials", "success", "failure"],
                  examples: [
                    "A fair coin is tossed 10 times. Find the probability of getting exactly 6 heads.",
                    "If 10% of components are defective, find the probability that in a sample of 15 components, at most 2 are defective."
                  ],
                  difficulty: "Hard"
                }
              }
            },
            "Statistics": {
              name: "Statistics",
              description: "The branch of mathematics dealing with the collection, analysis, interpretation, and presentation of data.",
              keywords: ["statistics", "data", "analysis", "mean", "median", "mode", "standard deviation"],
              subtopics: {
                "Measures of Central Tendency": {
                  name: "Measures of Central Tendency",
                  description: "Statistical measures that identify a central value of a dataset (mean, median, mode).",
                  keywords: ["mean", "median", "mode", "average", "central tendency"],
                  examples: [
                    "Calculate the mean, median, and mode for the dataset: 4, 7, 2, 8, 4, 3, 7, 4, 9, 2.",
                    "The mean salary of 50 employees in a company is €35,000. If 5 employees with a mean salary of €65,000 leave, what is the mean salary of the remaining employees?"
                  ],
                  difficulty: "Easy"
                },
                "Linear Regression": {
                  name: "Linear Regression",
                  description: "A statistical method for modeling the relationship between a dependent variable and one or more independent variables.",
                  keywords: ["regression", "correlation", "least squares", "line of best fit", "prediction"],
                  examples: [
                    "For the given data points, find the equation of the line of best fit and interpret the slope and y-intercept.",
                    "Given a correlation coefficient of r = 0.85, calculate the coefficient of determination and explain its meaning."
                  ],
                  difficulty: "Hard"
                }
              }
            }
          }
        }
      }
    },
    "Ordinary Level": {
      name: "Ordinary Level",
      description: "Ordinary Level Mathematics provides a solid foundation in mathematical concepts and techniques that are applicable to everyday scenarios.",
      papers: {
        "Both": {
          name: "All Papers",
          description: "Combined content from both Paper 1 and Paper 2.",
          sections: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"],
          topics: {}
        },
        "paper1": {
          name: "Paper 1",
          description: "Focuses on algebra, functions, and basic calculus.",
          sections: ["Short Questions", "Long Questions"],
          topics: {
            "Algebra": {
              name: "Algebra",
              description: "The study of mathematical symbols and the rules for manipulating these symbols, with a focus on practical applications.",
              keywords: ["algebra", "equations", "expressions", "solving equations"],
              subtopics: {
                "Expressions and Equations": {
                  name: "Expressions and Equations",
                  description: "Working with algebraic expressions and solving linear and quadratic equations.",
                  keywords: ["expressions", "equations", "solve", "linear", "quadratic"],
                  examples: [
                    "Solve the equation 3x - 5 = 2x + 7 for x.",
                    "Solve the quadratic equation x² - 6x + 8 = 0 by factoring or using the quadratic formula."
                  ],
                  difficulty: "Easy"
                }
              }
            }
          }
        },
        "paper2": {
          name: "Paper 2",
          description: "Focuses on geometry, trigonometry, and basic statistics.",
          sections: ["Short Questions", "Long Questions"],
          topics: {
            "Geometry": {
              name: "Geometry",
              description: "The study of shapes, sizes, and properties of space.",
              keywords: ["geometry", "shapes", "area", "volume", "angles"],
              subtopics: {
                "Basic Geometric Concepts": {
                  name: "Basic Geometric Concepts",
                  description: "Fundamental principles of geometry including points, lines, angles, and shapes.",
                  keywords: ["geometry", "angles", "triangles", "circles", "quadrilaterals"],
                  examples: [
                    "Calculate the area and perimeter of a rectangle with length 12cm and width 8cm.",
                    "Find the area of a circle with radius 5cm. (Use π = 3.14)"
                  ],
                  difficulty: "Easy"
                }
              }
            }
          }
        }
      }
    }
  }
};

export default enhancedMathematics; 