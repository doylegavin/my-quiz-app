import { LevelData } from '../types';

const irishFoundationLevel: LevelData = {
  irish: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Oral Examination": [],
          "Listening Comprehension": [],
          "Reading Comprehension": [],
          "Composition": []
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Poetry": [],
          "Prose": [],
          "Additional Literature": []
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium"],
    levels: ["Foundation Level"]
  }
};

export default irishFoundationLevel; 