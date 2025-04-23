import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const religiouseducation = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["World Religions", "Christianity", "Ethics", "Moral Decision Making"],
      topics: {}
    },
    "Section A": {
      name: "The Search for Meaning and Values",
      sections: ["Philosophy of Religion", "Faith and Reason", "Sources of Morality"],
      topics: {}
    },
    "Section B": {
      name: "Christianity",
      sections: ["Origins and Development", "Sacred Texts", "Contemporary Issues"],
      topics: {}
    },
    "Section C": {
      name: "World Religions",
      sections: ["Judaism", "Islam", "Hinduism", "Buddhism"],
      topics: {}
    },
    "Section D": {
      name: "Moral Decision Making",
      sections: ["Ethics", "Personal Morality", "Social Ethics", "Contemporary Issues"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };