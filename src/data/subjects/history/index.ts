import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const history = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Irish History", "European History", "World History", "Research Study"],
      topics: {}
    },
    "Paper 1": {
      name: "Documents Question",
      sections: ["Irish History", "European History", "Document Analysis"],
      topics: {}
    },
    "Paper 2": {
      name: "Essays",
      sections: ["Irish History", "European History", "World History"],
      topics: {}
    },
    "Research": {
      name: "Research Study Report",
      sections: ["Historical Research", "Document Analysis", "Extended Essay"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };