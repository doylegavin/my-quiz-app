import { LevelData } from '../types';

const businessOrdinaryLevel: LevelData = {
  business: {
    papers: {
      "Paper": {
        name: "Business Paper",
        sections: ["Section 1 (Short Questions)", "Section 2 (Applied Business Question)", "Section 3 (Long Questions)"],
        topics: {
          "Unit 1: Introduction to Business": [
            "Business Organizations",
            "Types of Business",
            "Stakeholders in Business",
            "Business Ethics",
            "Entrepreneurship",
            "Business Start-up",
            "Basic Business Plans"
          ],
          "Unit 2: Enterprise": [
            "Entrepreneurial Skills",
            "Business Ideas",
            "New Products",
            "Market Research",
            "Business Ownership",
            "Sole Traders",
            "Partnerships",
            "Companies"
          ],
          "Unit 3: Managing": [
            "Management Functions",
            "Management Styles",
            "Human Resources",
            "Recruitment",
            "Employment",
            "Training",
            "Motivation",
            "Communication"
          ],
          "Unit 4: Business Operations": [
            "Business Finance",
            "Sources of Funds",
            "Financial Documents",
            "Cash Flow",
            "Budgeting",
            "Break-even Analysis",
            "Basic Financial Calculations"
          ],
          "Unit 5: Business Environment": [
            "Consumer Laws",
            "Employment Laws",
            "Taxation",
            "Government Support",
            "Economic Factors",
            "Inflation",
            "Interest Rates",
            "Competition"
          ],
          "Unit 6: International Business": [
            "Importing and Exporting",
            "European Union",
            "Single Market",
            "Global Business",
            "Multinational Companies",
            "Currency Exchange",
            "International Trade"
          ],
          "Unit 7: Business Management": [
            "Setting Business Goals",
            "Business Analysis",
            "SWOT Analysis",
            "Decision Making",
            "Problem Solving",
            "Managing Change",
            "Business Ethics"
          ],
          "Unit 8: Marketing": [
            "Marketing Basics",
            "Market Research",
            "Target Markets",
            "Product",
            "Price",
            "Place",
            "Promotion",
            "Branding",
            "Advertising",
            "Sales"
          ],
          "Unit 9: Technology in Business": [
            "Business Technology",
            "E-Commerce",
            "Online Business",
            "Social Media",
            "Technology Impact",
            "Digital Communication"
          ],
          "Applied Business Question": [
            "Case Studies",
            "Business Problem Solving",
            "Practical Business Scenarios",
            "Business Reports"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default businessOrdinaryLevel;