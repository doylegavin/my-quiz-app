import subjectData from "@/data/subjects";
import { LevelData } from "@/data/subjects/types";

/**
 * Gets subject data for a specific subject
 * @param subject The subject name
 * @returns The subject data or undefined if not found
 */
export function getSubjectData(subject: string) {
  return subjectData[subject];
}

/**
 * Maps paper names between display format and internal format
 * @param subject The subject name
 * @param paper The paper name to convert
 * @param toInternal Whether to convert from display to internal format (true) or vice versa (false)
 * @returns The mapped paper name
 */
export function mapPaperName(subject: string, paper: string, toInternal: boolean = false): string {
  // Subject-specific mappings
  const mappings: Record<string, Record<string, Record<string, string>>> = {
    "mathematics": {
      // Display format to internal format
      toInternal: {
        "Both": "Both",
        "Paper 1": "paper1",
        "Paper 2": "paper2"
      },
      // Internal format to display format
      toDisplay: {
        "Both": "Both",
        "paper1": "Paper 1",
        "paper2": "Paper 2"
      }
    },
    "biology": {
      toInternal: {
        "Unit 1": "unit1",
        "Unit 2": "unit2",
        "Unit 3": "unit3"
      },
      toDisplay: {
        "unit1": "Unit 1",
        "unit2": "Unit 2", 
        "unit3": "Unit 3"
      }
    }
    // Add other subjects as needed
  };
  
  // If we have mappings for this subject
  if (mappings[subject]) {
    const direction = toInternal ? "toInternal" : "toDisplay";
    if (mappings[subject][direction] && mappings[subject][direction][paper]) {
      return mappings[subject][direction][paper];
    }
  }
  
  // Default: return the paper name unchanged
  return paper;
}

/**
 * Dynamically imports level-specific data for any subject
 * @param subject The subject name
 * @param level The level (Higher Level, Ordinary Level, etc.)
 * @returns Promise resolving to the level-specific data
 */
export async function getLevelData(subject: string, level: string): Promise<LevelData | null> {
  if (!subject) return null;
  
  try {
    // Convert level name to filename format (e.g. "Higher Level" -> "higher-level")
    const levelFileName = level.toLowerCase().replace(/\s+/g, '-');
    
    // Dynamic import using the subject and level
    const module = await import(`@/data/subjects/${subject}/${levelFileName}`);
    
    // Return the default export which should be the level data
    return module.default;
  } catch (error) {
    console.error(`Failed to load level data for ${subject} (${level}):`, error);
    return null;
  }
}

/**
 * Gets paper data for a specific subject and level
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns The paper data structure or null if not found
 */
export function getPaperData(subject: string, level: string, paper: string) {
  // First try the standard structure in the subject data
  const subjectInfo = getSubjectData(subject);
  if (subjectInfo?.papers?.[paper]) {
    return subjectInfo.papers[paper];
  }
  
  // If no paper found in standard structure, check if there's a level-specific export
  try {
    // Safe access for imported level data
    const subjectModule = require(`@/data/subjects/${subject}`);
    const levelKey = level === "Higher Level" ? "higherLevel" : 
                     level === "Ordinary Level" ? "ordinaryLevel" :
                     level === "Foundation Level" ? "foundationLevel" : null;
    
    if (levelKey && subjectModule[levelKey]?.[subject]?.papers?.[paper]) {
      return subjectModule[levelKey][subject].papers[paper];
    }
  } catch (error) {
    console.warn(`No level-specific data found for ${subject} (${level}):`, error);
  }
  
  return null;
}

/**
 * Gets topics for a specific subject, level, and paper
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns Array of topic names or empty array if none found
 */
export function getTopics(subject: string, level: string, paper: string): string[] {
  // Try to get paper data
  const paperData = getPaperData(subject, level, paper);
  
  if (paperData?.topics) {
    return Object.keys(paperData.topics);
  }
  
  return [];
}

/**
 * Gets subtopics for a specific topic
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @returns Array of subtopics or empty array if none found
 */
export function getSubtopics(subject: string, level: string, paper: string, topic: string): string[] {
  // Try to get paper data
  const paperData = getPaperData(subject, level, paper);
  
  if (paperData?.topics?.[topic]) {
    const topicData = paperData.topics[topic];
    
    // Handle different data structures
    if (Array.isArray(topicData)) {
      return topicData;
    } else if (typeof topicData === 'object') {
      return Object.keys(topicData);
    }
  }
  
  return [];
} 