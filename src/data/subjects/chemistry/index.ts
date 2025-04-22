import chemistryHigherLevel from './higher-level';
import chemistryOrdinaryLevel from './ordinary-level';
import { LevelData } from '../types';

const chemistry: LevelData = {
  chemistry: {
    papers: {
      ...chemistryHigherLevel.chemistry.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
  }
};

export { chemistryHigherLevel, chemistryOrdinaryLevel };
export default chemistry;