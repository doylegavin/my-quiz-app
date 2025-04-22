import irishHigherLevel from './higher-level';
import irishOrdinaryLevel from './ordinary-level';
import irishFoundationLevel from './foundation-level';
import { LevelData } from '../types';

const irish: LevelData = {
  irish: {
    papers: {
      ...irishHigherLevel.irish.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
  }
};

export { irishHigherLevel, irishOrdinaryLevel, irishFoundationLevel };
export default irish; 