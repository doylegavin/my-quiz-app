/**
 * Compatibility layer to ensure smooth transition from legacy to enhanced subject data structure
 * This wraps the original subjectUtils.ts functions and delegates to enhancedSubjectUtils.ts when appropriate
 */

import * as originalUtils from './subjectUtils';
import * as enhancedUtils from './enhancedSubjectUtils';
import { useEnhancedSubjectStore } from '../stores/enhancedSubjectStore';

/**
 * Gets subject data, prioritizing enhanced structure but falling back to legacy if needed
 * @param subject The subject name
 * @returns The subject data
 */
export function getSubjectData(subject: string) {
  // Special case for direct mathematics higher level
  if (subject === "mathematicsHL") {
    // Get directly from enhanced store
    const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
    if (enhancedSubject) {
      return useEnhancedSubjectStore.getState().getLegacySubject(subject);
    }
  }
  
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    // Convert to legacy format for backward compatibility
    return useEnhancedSubjectStore.getState().getLegacySubject(subject);
  }
  
  // Fall back to original utils
  return originalUtils.getSubjectData(subject);
}

/**
 * Maps paper names between display and internal format
 * @param subject The subject name
 * @param paper The paper name
 * @param toInternal Whether to convert to internal format
 * @returns Mapped paper name
 */
export function mapPaperName(subject: string, paper: string, toInternal: boolean = false): string {
  // Both legacy and enhanced have the same mapping logic
  // Use the enhanced utils implementation
  return enhancedUtils.mapPaperName(subject, paper, toInternal);
}

/**
 * Gets level data for a subject and level
 * @param subject The subject name
 * @param level The level name
 * @returns Promise resolving to level data or null
 */
export async function getLevelData(subject: string, level: string) {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject && enhancedSubject.levels[level]) {
    // Convert to legacy format for backward compatibility
    const legacyData = useEnhancedSubjectStore.getState().getLegacySubject(subject);
    
    // Extract level-specific data from the legacy format
    const levelData = {
      papers: legacyData.papers,
      difficulty: legacyData.difficulty,
      levels: [level]
    };
    
    return levelData;
  }
  
  // Fall back to original utils
  return originalUtils.getLevelData(subject, level);
}

/**
 * Gets paper data for a subject, level, and paper
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns Paper data structure or null
 */
export function getPaperData(subject: string, level: string, paper: string) {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject && enhancedSubject.levels[level]?.papers[paper]) {
    // Convert to legacy format for backward compatibility
    const legacyData = useEnhancedSubjectStore.getState().getLegacySubject(subject);
    
    return legacyData.papers[paper] || null;
  }
  
  // Fall back to original utils
  return originalUtils.getPaperData(subject, level, paper);
}

/**
 * Gets topics for a subject, level, and paper
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns Array of topic names
 */
export function getTopics(subject: string, level: string, paper: string): string[] {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    return enhancedUtils.getAvailableTopicsForPaper(subject, level, paper);
  }
  
  // Fall back to original utils
  return originalUtils.getTopics(subject, level, paper);
}

/**
 * Gets subtopics for a subject, level, paper, and topic
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @returns Array of subtopic names
 */
export function getSubtopics(subject: string, level: string, paper: string, topic: string): string[] {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    return enhancedUtils.getAvailableSubtopicsForTopic(subject, level, paper, topic);
  }
  
  // Fall back to original utils
  return originalUtils.getSubtopics(subject, level, paper, topic);
}

/**
 * Checks if a subject has sections
 * @param subject The subject name
 * @param paper The paper name
 * @returns Boolean indicating if the subject has sections
 */
export function hasSubjectSections(subject: string, paper: string): boolean {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    // Look for sections in any level (usually the first one)
    const levels = Object.keys(enhancedSubject.levels);
    if (levels.length > 0) {
      const firstLevel = levels[0];
      const paperData = enhancedSubject.levels[firstLevel]?.papers[paper];
      
      return !!(paperData && Array.isArray(paperData.sections) && paperData.sections.length > 0);
    }
  }
  
  // If not found or no enhanced data, fall back to checking if we have any sections in the legacy data
  const paperData = originalUtils.getPaperData(subject, 'Higher Level', paper); // Default to Higher Level
  return !!(paperData && Array.isArray(paperData.sections) && paperData.sections.length > 0);
}

/**
 * Checks if a paper has topics
 * @param subject The subject name
 * @param paper The paper name
 * @returns Boolean indicating if the paper has topics
 */
export function hasPaperTopics(subject: string, paper: string): boolean {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    // Look for topics in any level (usually the first one)
    const levels = Object.keys(enhancedSubject.levels);
    if (levels.length > 0) {
      const firstLevel = levels[0];
      const paperData = enhancedSubject.levels[firstLevel]?.papers[paper];
      
      return !!(paperData && paperData.topics && Object.keys(paperData.topics).length > 0);
    }
  }
  
  // If not found or no enhanced data, fall back to checking if we have any topics in the legacy data
  const paperData = originalUtils.getPaperData(subject, 'Higher Level', paper); // Default to Higher Level
  return !!(paperData && paperData.topics && Object.keys(paperData.topics).length > 0);
}

/**
 * Gets the paper label for display
 * @param subject The subject name
 * @returns The paper label
 */
export function getPaperLabel(subject: string): string {
  // Default paper label
  let paperLabel = "Paper";
  
  // Subject-specific paper labels
  const paperLabels: Record<string, string> = {
    "mathematics": "Paper",
    "english": "Paper",
    "irish": "Paper",
    "biology": "Unit",
    "chemistry": "Section",
    "physics": "Section",
    // Add other subject-specific labels as needed
  };
  
  // Return the label for the subject, or the default if not found
  return paperLabels[subject] || paperLabel;
}

/**
 * Gets metadata for a subject (like display names, labels, etc.)
 * @param subject The subject name
 * @returns Metadata object or empty object if not found
 */
export function getSubjectMetadata(subject: string): Record<string, any> {
  // Try to get from enhanced store first
  const enhancedSubject = enhancedUtils.getEnhancedSubjectData(subject);
  
  if (enhancedSubject) {
    return enhancedUtils.getSubjectMetadata(subject);
  }
  
  // Fall back to a default set of metadata based on the subject
  const defaultMetadata: Record<string, Record<string, any>> = {
    mathematics: {
      displayName: "Mathematics",
      paperLabel: "Paper",
      sectionLabel: "Section",
      topicLabel: "Topic",
      subtopicLabel: "Problem Type"
    },
    physics: {
      displayName: "Physics",
      paperLabel: "Section",
      sectionLabel: "Topic Area", 
      topicLabel: "Concept",
      subtopicLabel: "Specific Topic"
    }
    // Default metadata for other subjects could be added here
  };
  
  return defaultMetadata[subject] || {};
} 