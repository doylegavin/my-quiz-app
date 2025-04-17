import mathsHigherLevel from './higher-level';
import mathsOrdinaryLevel from './ordinary-level';
import mathsFoundationLevel from './foundation-level';
import { LevelData } from '../types';

const mathematics: LevelData = {
  mathematics: {
    papers: {
      ...mathsHigherLevel.mathematics.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level", "Foundation Level"]
  }
};

export { mathsHigherLevel, mathsOrdinaryLevel, mathsFoundationLevel };
export default mathematics; 