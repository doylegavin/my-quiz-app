import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const politicsandsociety = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Democracy", "Human Rights", "Globalisation", "Social Analysis"],
      topics: {}
    },
    "Paper 1": {
      name: "Essay Questions",
      sections: ["Power and Decision Making", "Active Citizenship", "Human Rights and Responsibilities"],
      topics: {}
    },
    "Paper 2": {
      name: "Documents Based Questions",
      sections: ["Data Analysis", "Social Theory", "Research Methods"],
      topics: {}
    },
    "Research": {
      name: "Citizenship Project",
      sections: ["Research Process", "Participation", "Critical Analysis", "Reflection"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };