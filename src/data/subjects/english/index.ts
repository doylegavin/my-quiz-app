import englishHigherLevel from './higher-level';
import englishOrdinaryLevel from './ordinary-level';
import englishFoundationLevel from './foundation-level';
import { LevelData } from '../types';

const english: LevelData = {
  english: {
    papers: {
      ...englishHigherLevel.english.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
  }
};

export { englishHigherLevel, englishOrdinaryLevel, englishFoundationLevel };
export default english; 