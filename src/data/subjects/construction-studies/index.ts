import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const constructionstudies = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Building Materials", "Building Science", "Practical Skills", "Drawing"],
      topics: {}
    },
    "Paper 1": {
      name: "Theory",
      sections: ["Building Materials", "Building Construction", "Building Science", "Services"],
      topics: {}
    },
    "Paper 2": {
      name: "Drawing",
      sections: ["Building Drawing", "Interpretation of Drawings", "Scale Drawings"],
      topics: {}
    },
    "Practical": {
      name: "Practical Assessment",
      sections: ["Design Brief", "Project Execution", "Construction Skills", "Finishing Skills"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };