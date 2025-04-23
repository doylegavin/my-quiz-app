import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const homeeconomics = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Food Studies", "Resource Management", "Social Studies", "Practical Skills"],
      topics: {}
    },
    "Paper 1": {
      name: "Written Examination",
      sections: ["Food Studies", "Resource Management", "Consumer Studies", "Social Studies"],
      topics: {}
    },
    "Food Studies": {
      name: "Food Studies Assignment",
      sections: ["Research", "Preparation", "Implementation", "Evaluation"],
      topics: {}
    },
    "Practical": {
      name: "Practical Examination",
      sections: ["Culinary Skills", "Food Preparation", "Time Management", "Presentation"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };