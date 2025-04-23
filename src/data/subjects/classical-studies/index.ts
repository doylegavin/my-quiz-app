import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const classicalstudies = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Greek Civilization", "Roman Civilization", "Classical Literature", "Ancient History"],
      topics: {}
    },
    "Section A": {
      name: "Greek Civilization",
      sections: ["Greek Art & Architecture", "Greek Drama", "Greek Politics", "Greek Philosophy"],
      topics: {}
    },
    "Section B": {
      name: "Roman Civilization",
      sections: ["Roman Art & Architecture", "Roman Literature", "Roman Politics", "Roman Society"],
      topics: {}
    },
    "Section C": {
      name: "Ancient History",
      sections: ["Greek History", "Roman History", "Ancient Mediterranean", "Classical Archaeology"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };