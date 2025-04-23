import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const art = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Art History and Appreciation", "Practical Coursework", "Practical Examination"],
      topics: {}
    },
    "Art History": {
      name: "Art History and Appreciation",
      sections: ["Irish Art", "European Art", "Art Appreciation"],
      topics: {}
    },
    "Practical": {
      name: "Practical Components",
      sections: ["Coursework", "Examination"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };