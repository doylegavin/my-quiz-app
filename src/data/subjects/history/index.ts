import historyHigherLevel from './higher-level';
import historyOrdinaryLevel from './ordinary-level';
import { LevelData } from '../types';

const history: LevelData = {
  history: {
    papers: {
      ...historyHigherLevel.history.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
  }
};

export { historyHigherLevel, historyOrdinaryLevel };
export default history;