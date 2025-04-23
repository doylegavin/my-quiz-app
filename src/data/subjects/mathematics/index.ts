import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';
import foundationLevel from './foundation-level';

export const mathematics = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Algebra", "Geometry", "Trigonometry", "Calculus", "Statistics", "Probability"],
      topics: {}
    },
    "Paper 1": {
      name: "Paper 1",
      sections: ["Algebra", "Complex Numbers", "Calculus"],
      topics: {}
    },
    "Paper 2": {
      name: "Paper 2",
      sections: ["Geometry", "Trigonometry", "Statistics", "Probability"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
};

export { higherLevel, ordinaryLevel, foundationLevel }; 