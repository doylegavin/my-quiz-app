import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';
import foundationLevel from './foundation-level';

export const english = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Comprehending", "Composing", "Literary Genres", "Poetry"],
      topics: {}
    },
    "Paper 1": {
      name: "Language and Comprehension",
      sections: ["Comprehending", "Composing"],
      topics: {}
    },
    "Paper 2": {
      name: "Literature",
      sections: ["Single Text", "Comparative Study", "Poetry"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
};

export { higherLevel, ordinaryLevel, foundationLevel }; 