import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const biology = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Cell Biology", "Human Biology", "Plant Biology", "Microbiology & Genetics", "Ecology"],
      topics: {}
    },
    "Section A": {
      name: "Short Questions",
      sections: ["Cell Biology", "Human Biology", "Plant Biology"],
      topics: {}
    },
    "Section B": {
      name: "Long Questions",
      sections: ["Microbiology & Genetics", "Ecology", "Applied Biology"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };