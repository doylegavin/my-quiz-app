import biologyHigherLevel from './higher-level';
import biologyOrdinaryLevel from './ordinary-level';
import { LevelData } from '../types';

const biology: LevelData = {
  biology: {
    papers: {
      ...biologyHigherLevel.biology.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
  }
};

export { biologyHigherLevel, biologyOrdinaryLevel };
export default biology;