import physicsHigherLevel from './higher-level';
import physicsOrdinaryLevel from './ordinary-level';
import { LevelData } from '../types';

const physics: LevelData = {
  physics: {
    papers: {
      ...physicsHigherLevel.physics.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
  }
};

export { physicsHigherLevel, physicsOrdinaryLevel };
export default physics;