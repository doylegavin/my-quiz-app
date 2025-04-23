import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const mathematicalapplications = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Mathematical Models", "Statistics", "Probability", "Finance"],
      topics: {}
    },
    "Section A": {
      name: "Number & Statistics",
      sections: ["Number", "Statistics", "Data Analysis"],
      topics: {}
    },
    "Section B": {
      name: "Applied Mathematics",
      sections: ["Finance", "Probability", "Mathematical Models"],
      topics: {}
    },
    "Project": {
      name: "Mathematical Investigation",
      sections: ["Problem Analysis", "Mathematical Modeling", "Data Collection", "Solution Development"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };