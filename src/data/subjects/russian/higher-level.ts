import { LevelData } from '../types';

const russianHigherLevel: LevelData = {
  russian: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 1": [],
          "Topic 2": []
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 3": [],
          "Topic 4": []
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default russianHigherLevel;