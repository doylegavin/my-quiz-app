import { LevelData } from '../types';

const englishFoundationLevel: LevelData = {
  english: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Comprehending": [],
          "Composing": []
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Poetry": [],
          "Drama": [],
          "Novel": [],
          "Comparative Study": []
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium"],
    levels: ["Foundation Level"]
  }
};

export default englishFoundationLevel; 