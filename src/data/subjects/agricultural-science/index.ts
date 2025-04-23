import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const agriculturalscience = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Plant Science", "Animal Science", "Soil Science", "Farm Management"],
      topics: {}
    },
    "Paper 1": {
      name: "Written Examination",
      sections: ["Short Questions", "Long Questions"],
      topics: {}
    },
    "Project": {
      name: "Practical Assessment",
      sections: ["Scientific Investigation", "Farm Management", "Crop Production", "Animal Production"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };