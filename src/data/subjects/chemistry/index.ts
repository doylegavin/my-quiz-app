import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const chemistry = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry", "Applied Chemistry"],
      topics: {}
    },
    "Section A": {
      name: "Short Questions",
      sections: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry"],
      topics: {}
    },
    "Section B": {
      name: "Long Questions",
      sections: ["Physical Chemistry", "Inorganic Chemistry", "Organic Chemistry", "Applied Chemistry"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };