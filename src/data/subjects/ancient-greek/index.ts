import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const ancientgreek = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Comprehension", "Translation", "Composition", "Literature"],
      topics: {}
    },
    "Paper 1": {
      name: "Translation and Grammar",
      sections: ["Comprehension", "Translation", "Composition"],
      topics: {}
    },
    "Paper 2": {
      name: "Literature and History",
      sections: ["Greek Literature", "Classical History", "Classical Civilization"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };