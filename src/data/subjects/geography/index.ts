import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const geography = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Physical Geography", "Regional Geography", "Human Geography", "Geographical Skills"],
      topics: {}
    },
    "Paper 1": {
      name: "Physical & Regional Geography",
      sections: ["Physical Geography", "Regional Geography"],
      topics: {}
    },
    "Paper 2": {
      name: "Human & Skills Geography",
      sections: ["Human Geography", "Geographical Skills", "Field Study Report"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };