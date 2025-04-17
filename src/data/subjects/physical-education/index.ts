import physicalEducationHigherLevel from './higher-level';
import { LevelData } from '../types';

// For now, we only have Higher Level, but we can add more levels later
const physicalEducation: LevelData = {
  physicalEducation: {
    papers: {
      ...physicalEducationHigherLevel.physicalEducation.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export { physicalEducationHigherLevel };
export default physicalEducation; 