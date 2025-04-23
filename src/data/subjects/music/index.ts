import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const music = {
  papers: {
    "Both": {
      name: "All Papers",
      sections: ["Listening", "Composing", "Performing"],
      topics: {}
    },
    "Paper 1": {
      name: "Listening",
      sections: ["Set Works", "Irish Music", "General Listening"],
      topics: {}
    },
    "Paper 2": {
      name: "Composing",
      sections: ["Melody Writing", "Harmony", "Counterpoint"],
      topics: {}
    },
    "Practical": {
      name: "Performing",
      sections: ["Solo Performance", "Group Performance", "Music Technology"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };