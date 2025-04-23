import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const business = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Business Environment", "Enterprise", "Management", "Finance"],
      topics: {}
    },
    "Paper 1": {
      name: "Short Questions & ABQs",
      sections: ["Business Environment", "Enterprise"],
      topics: {}
    },
    "Paper 2": {
      name: "Long Questions",
      sections: ["Management", "Finance", "Business in Action"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };