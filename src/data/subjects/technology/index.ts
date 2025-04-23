import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const technology = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Process of Design", "Materials Technology", "Electronics", "Information Technology"],
      topics: {}
    },
    "Paper 1": {
      name: "Theory",
      sections: ["Materials and Manufacturing", "Electronics and Control", "Information and Communications Technology"],
      topics: {}
    },
    "Paper 2": {
      name: "Design Project",
      sections: ["Design Brief", "Analysis and Research", "Design Development", "Implementation and Evaluation"],
      topics: {}
    },
    "Project": {
      name: "Practical Work",
      sections: ["Design Process", "Materials Processing", "Electronics Assembly", "Systems Integration"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };