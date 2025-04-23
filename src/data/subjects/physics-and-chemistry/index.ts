import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const physicsandchemistry = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Physics", "Chemistry", "Practical Work"],
      topics: {}
    },
    "Section A": {
      name: "Physics",
      sections: ["Mechanics", "Heat", "Waves", "Electricity"],
      topics: {}
    },
    "Section B": {
      name: "Chemistry",
      sections: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry"],
      topics: {}
    },
    "Practical": {
      name: "Practical Work",
      sections: ["Physics Experiments", "Chemistry Experiments", "Lab Safety"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };