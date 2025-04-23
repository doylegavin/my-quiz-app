import { LevelData } from '../types';

const accountingOrdinaryLevel: LevelData = {
  accounting: {
    papers: {
      "Paper": {
        name: "Accounting Paper",
        sections: ["Section 1 (Short Questions)", "Section 2 (Long Questions)"],
        topics: {
          "Unit 1: Basic Accounting Concepts": [
            "Accounting Principles",
            "Basic Concepts",
            "Capital and Revenue",
            "Double Entry System",
            "Source Documents",
            "Books of Prime Entry",
            "Trial Balance"
          ],
          "Unit 2: Basic Financial Statements": [
            "Trading Account",
            "Profit and Loss Account",
            "Balance Sheet",
            "Basic Adjustments",
            "Closing Entries",
            "Financial Statement Preparation",
            "Interpretation of Statements"
          ],
          "Unit 3: Company Accounts": [
            "Types of Companies",
            "Share Capital",
            "Simple Reserves",
            "Basic Company Accounts",
            "Dividends",
            "Published Accounts Format",
            "Simple Directors' Report"
          ],
          "Unit 4: Introduction to Management Accounting": [
            "Types of Costs",
            "Fixed and Variable Costs",
            "Direct and Indirect Costs",
            "Break-even Analysis",
            "Simple Costing",
            "Product Costing",
            "Basic Cost Control"
          ],
          "Unit 5: Basic Budgeting": [
            "Purpose of Budgets",
            "Cash Budget",
            "Sales Budget",
            "Purchase Budget",
            "Budget Planning",
            "Simple Budget Analysis",
            "Budget Control"
          ],
          "Unit 6: Simple Investment Analysis": [
            "Capital Expenditure",
            "Payback Period",
            "Return on Investment",
            "Basic Investment Decisions",
            "Investment Evaluation",
            "Cost-Benefit Analysis"
          ],
          "Unit 7: Basic Financial Analysis": [
            "Key Ratios",
            "Profitability Ratios",
            "Liquidity Ratios",
            "Efficiency Ratios",
            "Simple Ratio Calculations",
            "Ratio Interpretation",
            "Using Ratios in Decision Making"
          ],
          "Unit 8: Basic Specialized Accounts": [
            "Club Accounts",
            "Service Organizations",
            "Simple Manufacturing Accounts",
            "Incomplete Records",
            "Single Entry Records",
            "Conversion to Double Entry"
          ],
          "Unit 9: Accounting Standards": [
            "Basic Accounting Standards",
            "Regulatory Framework",
            "Professional Ethics",
            "Accounting Responsibilities",
            "Business Ethics",
            "Corporate Responsibility"
          ],
          "Unit 10: Financial Statement Interpretation": [
            "Reading Financial Statements",
            "Basic Financial Analysis",
            "Understanding Performance",
            "Year-to-Year Comparison",
            "Identifying Financial Trends",
            "Business Decision Making"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default accountingOrdinaryLevel;