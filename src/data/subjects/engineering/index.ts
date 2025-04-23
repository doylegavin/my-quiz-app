import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const engineering = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Section A (Short Questions)", "Section B (Long Questions)"],
      topics: {}
    },
    "Paper 1": {
      name: "Theory Paper",
      sections: ["Materials", "Mechanics", "Manufacturing", "Design"],
      topics: {}
    },
    "Paper 2": {
      name: "Practical Paper",
      sections: ["Project Work", "Applied Engineering", "Problem Solving"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };