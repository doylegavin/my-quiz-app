import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const economics = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Microeconomics", "Macroeconomics", "International Economics", "Economic Policy"],
      topics: {}
    },
    "Paper 1": {
      name: "Short Questions",
      sections: ["Microeconomics", "Macroeconomics"],
      topics: {}
    },
    "Paper 2": {
      name: "Long Questions",
      sections: ["International Economics", "Economic Policy", "Applied Economics"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };