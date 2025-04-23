import { LevelData } from '../types';

const accountingHigherLevel: LevelData = {
  accounting: {
    papers: {
      "Paper": {
        name: "Accounting Paper",
        sections: ["Section 1 (Short Questions)", "Section 2 (Long Questions)"],
        topics: {
          "Unit 1: Introduction to Accounting": [
            "Accounting Concepts and Principles",
            "Generally Accepted Accounting Principles (GAAP)",
            "Capital and Revenue Expenditure",
            "Double Entry System",
            "Source Documents",
            "Books of Original Entry",
            "Trial Balance"
          ],
          "Unit 2: Financial Statements": [
            "Trading, Profit and Loss Account",
            "Balance Sheet",
            "Statement of Financial Position",
            "Statement of Comprehensive Income",
            "Statement of Cash Flows",
            "Preparation of Financial Statements",
            "Adjustments and Year-End Entries"
          ],
          "Unit 3: Company Accounts": [
            "Company Formation",
            "Share Capital",
            "Reserves",
            "Debentures",
            "Published Accounts",
            "Directors' Report",
            "Notes to the Financial Statements",
            "Corporate Governance"
          ],
          "Unit 4: Management Accounting": [
            "Costing",
            "Cost Classification",
            "Absorption Costing",
            "Marginal Costing",
            "Cost-Volume-Profit Analysis",
            "Break-even Analysis",
            "Standard Costing",
            "Variance Analysis"
          ],
          "Unit 5: Budgeting": [
            "Budget Types",
            "Cash Budgets",
            "Operational Budgets",
            "Master Budget",
            "Flexible Budgeting",
            "Zero-based Budgeting",
            "Performance Evaluation",
            "Budgetary Control"
          ],
          "Unit 6: Capital Investment Appraisal": [
            "Investment Decisions",
            "Payback Period",
            "Accounting Rate of Return",
            "Net Present Value",
            "Internal Rate of Return",
            "Capital Rationing",
            "Risk and Uncertainty"
          ],
          "Unit 7: Financial Analysis": [
            "Ratio Analysis",
            "Profitability Ratios",
            "Liquidity Ratios",
            "Efficiency Ratios",
            "Investment Ratios",
            "Gearing Ratios",
            "Interpretation of Ratios",
            "Limitations of Ratio Analysis"
          ],
          "Unit 8: Specialized Accounts": [
            "Club and Service Organizations",
            "Manufacturing Accounts",
            "Departmental Accounts",
            "Branch Accounts",
            "Incomplete Records",
            "Single Entry System",
            "Farm Accounts"
          ],
          "Unit 9: Accounting Theory and Practice": [
            "Accounting Standards",
            "International Financial Reporting Standards (IFRS)",
            "Regulatory Framework",
            "Accounting Ethics",
            "Sustainability Accounting",
            "Corporate Social Responsibility",
            "Integrated Reporting"
          ],
          "Unit 10: Financial Statement Analysis": [
            "Trend Analysis",
            "Comparative Analysis",
            "Common-Size Statements",
            "Cash Flow Analysis",
            "Working Capital Analysis",
            "Financial Health Assessment",
            "Limitations of Financial Analysis"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default accountingHigherLevel;