import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const physics = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Mechanics", "Heat", "Waves", "Electricity & Magnetism", "Modern Physics"],
      topics: {}
    },
    "Section A": {
      name: "Short Questions",
      sections: ["Mechanics", "Heat", "Waves"],
      topics: {}
    },
    "Section B": {
      name: "Long Questions",
      sections: ["Electricity & Magnetism", "Modern Physics", "Applied Physics"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };