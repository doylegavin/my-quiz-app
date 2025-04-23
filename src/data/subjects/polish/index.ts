import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const polish = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Listening", "Reading", "Writing", "Oral"],
      topics: {}
    },
    "Paper 1": {
      name: "Written Paper",
      sections: ["Reading Comprehension", "Written Production"],
      topics: {}
    },
    "Paper 2": {
      name: "Listening Comprehension",
      sections: ["Short Passages", "Long Passages", "News Items"],
      topics: {}
    },
    "Oral": {
      name: "Oral Examination",
      sections: ["General Conversation", "Role Play", "Picture Description"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };