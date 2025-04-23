import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const accounting = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Financial Accounting", "Management Accounting", "Financial Statements"],
      topics: {}
    },
    "Section 1": {
      name: "Financial Accounting",
      sections: ["Double Entry", "Trial Balance", "Control Accounts", "Bank Reconciliation"],
      topics: {}
    },
    "Section 2": {
      name: "Management Accounting",
      sections: ["Costing", "Budgeting", "Break-even Analysis", "Decision Making"],
      topics: {}
    },
    "Section 3": {
      name: "Financial Statements",
      sections: ["Final Accounts", "Company Accounts", "Cash Flow Statements", "Ratios"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };