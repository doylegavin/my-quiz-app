/**
 * Utility functions for converting between legacy and enhanced subject data structures
 */

import { 
  EnhancedSubject, 
  EnhancedLevel, 
  EnhancedPaper, 
  Topic, 
  Subtopic, 
  LegacySubjectData 
} from "@/data/subjects/enhanced-types";
import mathHigherLevel from '@/data/subjects/mathematics/higher-level';
import { LevelData, SubjectStructure } from '@/data/subjects/types';

/**
 * Convert legacy subject data to enhanced subject structure
 * @param subjectName The name of the subject
 * @param legacyData The legacy subject data
 * @returns Enhanced subject data structure
 */
export function convertToEnhanced(subjectName: string, legacyData: any): EnhancedSubject {
  // Create base enhanced subject structure
  const enhancedSubject: EnhancedSubject = {
    name: subjectName,
    difficulty: legacyData.difficulty || ["Random", "Easy", "Medium", "Hard"],
    levels: {},
    keywords: [],
  };

  // Process legacy levels data structure
  const legacyLevels = legacyData.levels || [];
  
  // If there are level-specific modules (like higher-level.ts, ordinary-level.ts)
  if (legacyData.higherLevel || legacyData.ordinaryLevel || legacyData.foundationLevel) {
    // Process higher level if it exists
    if (legacyData.higherLevel && legacyData.higherLevel[subjectName]) {
      enhancedSubject.levels["Higher Level"] = convertLevelToEnhanced(
        "Higher Level",
        legacyData.higherLevel[subjectName]
      );
    }

    // Process ordinary level if it exists
    if (legacyData.ordinaryLevel && legacyData.ordinaryLevel[subjectName]) {
      enhancedSubject.levels["Ordinary Level"] = convertLevelToEnhanced(
        "Ordinary Level",
        legacyData.ordinaryLevel[subjectName]
      );
    }

    // Process foundation level if it exists
    if (legacyData.foundationLevel && legacyData.foundationLevel[subjectName]) {
      enhancedSubject.levels["Foundation Level"] = convertLevelToEnhanced(
        "Foundation Level",
        legacyData.foundationLevel[subjectName]
      );
    }
  } 
  // If the level structure is flat
  else {
    // Create a single "default" level with the papers from the legacy structure
    const defaultLevel = legacyLevels[0] || "Higher Level";
    enhancedSubject.levels[defaultLevel] = convertLevelToEnhanced(
      defaultLevel,
      legacyData
    );
  }

  return enhancedSubject;
}

/**
 * Convert legacy level data to enhanced level structure
 * @param levelName The name of the level
 * @param levelData The legacy level data
 * @returns Enhanced level data structure
 */
function convertLevelToEnhanced(levelName: string, levelData: any): EnhancedLevel {
  const enhancedLevel: EnhancedLevel = {
    name: levelName,
    papers: {},
  };

  // Process papers
  if (levelData.papers) {
    for (const [paperKey, paperData] of Object.entries(levelData.papers)) {
      enhancedLevel.papers[paperKey] = convertPaperToEnhanced(paperKey, paperData as any);
    }
  }

  return enhancedLevel;
}

/**
 * Convert legacy paper data to enhanced paper structure
 * @param paperKey The key of the paper
 * @param paperData The legacy paper data
 * @returns Enhanced paper data structure
 */
function convertPaperToEnhanced(paperKey: string, paperData: any): EnhancedPaper {
  const enhancedPaper: EnhancedPaper = {
    name: paperData.name || paperKey,
    sections: paperData.sections || [],
    topics: {},
  };

  // Process topics
  if (paperData.topics) {
    for (const [topicKey, subtopics] of Object.entries(paperData.topics)) {
      enhancedPaper.topics[topicKey] = convertTopicToEnhanced(topicKey, subtopics as any);
    }
  }

  return enhancedPaper;
}

/**
 * Convert legacy topic data to enhanced topic structure
 * @param topicName The name of the topic
 * @param subtopicData The legacy subtopic data (array of strings)
 * @returns Enhanced topic data structure
 */
function convertTopicToEnhanced(topicName: string, subtopicData: string[]): Topic {
  const enhancedTopic: Topic = {
    name: topicName,
    subtopics: {},
    keywords: [topicName.toLowerCase()],
  };

  // If subtopics is an array of strings, convert to Subtopic objects
  if (Array.isArray(subtopicData)) {
    subtopicData.forEach((subtopicName) => {
      (enhancedTopic.subtopics as Record<string, Subtopic>)[subtopicName] = {
        name: subtopicName,
        keywords: [subtopicName.toLowerCase()],
      };
    });
  }
  // If it's already a Record<string, any>, convert each value to a Subtopic
  else if (typeof subtopicData === 'object' && subtopicData !== null) {
    for (const [subtopicKey, subtopicValue] of Object.entries(subtopicData)) {
      if (typeof subtopicValue === 'string') {
        (enhancedTopic.subtopics as Record<string, Subtopic>)[subtopicKey] = {
          name: subtopicValue,
          keywords: [subtopicValue.toLowerCase()],
        };
      } else {
        // Handle case where subtopicValue is already an object
        (enhancedTopic.subtopics as Record<string, Subtopic>)[subtopicKey] = {
          name: subtopicKey,
          keywords: [subtopicKey.toLowerCase()],
          ...(typeof subtopicValue === 'object' ? subtopicValue : {})
        };
      }
    }
  }

  return enhancedTopic;
}

/**
 * Convert enhanced subject structure back to legacy format for backward compatibility
 * @param enhancedSubject The enhanced subject data
 * @returns Legacy subject data structure
 */
export function convertToLegacy(enhancedSubject: EnhancedSubject): LegacySubjectData {
  const legacyData: LegacySubjectData = {
    papers: {},
    difficulty: enhancedSubject.difficulty || ["Random", "Easy", "Medium", "Hard"],
    levels: Object.keys(enhancedSubject.levels),
  };

  // Get the first level (usually Higher Level) to extract papers
  const firstLevelKey = Object.keys(enhancedSubject.levels)[0];
  const firstLevel = enhancedSubject.levels[firstLevelKey];

  if (firstLevel && firstLevel.papers) {
    // Convert each paper back to legacy format
    for (const [paperKey, paperData] of Object.entries(firstLevel.papers)) {
      legacyData.papers[paperKey] = {
        name: paperData.name,
        sections: paperData.sections,
        topics: {},
      };

      // Convert topics back to simple string arrays
      for (const [topicKey, topicData] of Object.entries(paperData.topics)) {
        // Convert subtopics back to array of strings
        const subtopics = Object.keys(
          typeof topicData.subtopics === 'object' ? topicData.subtopics : {}
        );
        legacyData.papers[paperKey].topics[topicKey] = subtopics;
      }
    }
  }

  return legacyData;
}

/**
 * Get available levels for a subject in enhanced format
 * @param enhancedSubject The enhanced subject data
 * @returns Array of level names
 */
export function getAvailableLevels(enhancedSubject: EnhancedSubject): string[] {
  return Object.keys(enhancedSubject.levels);
}

/**
 * Get available papers for a subject and level in enhanced format
 * @param enhancedSubject The enhanced subject data
 * @param level The level name
 * @returns Array of paper names or empty array if level not found
 */
export function getAvailablePapers(
  enhancedSubject: EnhancedSubject,
  level: string
): string[] {
  return enhancedSubject.levels[level]
    ? Object.keys(enhancedSubject.levels[level].papers)
    : [];
}

/**
 * Get available topics for a subject, level, and paper in enhanced format
 * @param enhancedSubject The enhanced subject data
 * @param level The level name
 * @param paper The paper name
 * @returns Array of topic names or empty array if paper not found
 */
export function getAvailableTopics(
  enhancedSubject: EnhancedSubject,
  level: string,
  paper: string
): string[] {
  return enhancedSubject.levels[level]?.papers[paper]
    ? Object.keys(enhancedSubject.levels[level].papers[paper].topics)
    : [];
}

/**
 * Get available subtopics for a subject, level, paper, and topic in enhanced format
 * @param enhancedSubject The enhanced subject data
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @returns Array of subtopic names or empty array if topic not found
 */
export function getAvailableSubtopics(
  enhancedSubject: EnhancedSubject,
  level: string,
  paper: string,
  topic: string
): string[] {
  const topicData = enhancedSubject.levels[level]?.papers[paper]?.topics[topic];
  
  if (!topicData) return [];
  
  return Array.isArray(topicData.subtopics)
    ? topicData.subtopics.map(st => typeof st === 'string' ? st : st.name)
    : Object.keys(topicData.subtopics);
}

/**
 * Convert a specific level file directly to an enhanced subject format
 * This allows us to use detailed level files like mathematics/higher-level.ts directly
 * @param subjectName The name of the subject
 * @param levelName The name of the level
 * @param levelData The level data from the specific level file
 * @returns Enhanced subject with the level data integrated
 */
export function convertLevelDataToEnhanced(
  subjectName: string,
  levelName: string,
  levelData: LevelData
): EnhancedSubject {
  const enhancedSubject: EnhancedSubject = {
    name: subjectName.charAt(0).toUpperCase() + subjectName.slice(1),
    description: `${levelName} ${subjectName} curriculum`,
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    keywords: [subjectName.toLowerCase()],
    levels: {}
  };

  // Convert the level data to enhanced format
  enhancedSubject.levels[levelName] = convertLevelToEnhanced(
    levelName,
    levelData[subjectName]
  );

  return enhancedSubject;
} 