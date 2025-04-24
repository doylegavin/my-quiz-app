import higherLevel from './higher-level';

// Extract topics from higher-level.ts for use in the main index
const strand1Topics = higherLevel.physicalEducation.papers["Strand 1"].topics;
const strand2Topics = higherLevel.physicalEducation.papers["Strand 2"].topics;

export const physicalEducation = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Written Examination", "Physical Activity Project", "Performance Assessment"],
      topics: {}
    },
    "Strand 1": {
      name: "Strand 1",
      sections: ["Short Questions", "Long Questions"],
      topics: strand1Topics
    },
    "Strand 2": {
      name: "Strand 2",
      sections: ["Short Questions", "Long Questions"],
      topics: strand2Topics
    },
    "Written": {
      name: "Written Examination",
      sections: ["Physical Activity", "Sport Science", "Contemporary Issues"],
      topics: strand1Topics // Using Strand 1 topics for Written Examination
    },
    "Project": {
      name: "Physical Activity Project",
      sections: ["Planning", "Performance", "Analysis"],
      topics: {}
    },
    "Practical": {
      name: "Performance Assessment",
      sections: ["Physical Competencies", "Performance Skills", "Applied Techniques"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level"]
};

export { higherLevel }; 