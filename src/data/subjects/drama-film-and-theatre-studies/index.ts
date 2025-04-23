import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const dramafilmandtheatrestudies = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Theatre History", "Performance", "Film Studies", "Dramatic Theory"],
      topics: {}
    },
    "Paper 1": {
      name: "Theatre and Drama",
      sections: ["Theatre History", "Dramatic Theory", "Playwrights and Texts"],
      topics: {}
    },
    "Paper 2": {
      name: "Film Studies",
      sections: ["Film History", "Film Analysis", "Directors and Genres"],
      topics: {}
    },
    "Practical": {
      name: "Performance",
      sections: ["Improvisation", "Character Development", "Script Analysis", "Practical Performance"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };