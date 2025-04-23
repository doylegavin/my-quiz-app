import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const computerscience = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Computer Systems", "Algorithms", "Programming", "Applied Technology"],
      topics: {}
    },
    "Paper 1": {
      name: "Written Examination",
      sections: ["Computer Systems", "Algorithms", "Programming Concepts"],
      topics: {}
    },
    "Project": {
      name: "Computational Thinking Project",
      sections: ["Analysis", "Design", "Implementation", "Testing & Documentation"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel }; 