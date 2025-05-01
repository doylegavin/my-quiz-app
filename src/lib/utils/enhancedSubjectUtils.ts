/**
 * Enhanced subject utility functions that mirror the original subjectUtils.ts
 * but work with the enhanced subject data structure
 */

import { useEnhancedSubjectStore } from '../stores/enhancedSubjectStore';
import { 
  EnhancedSubject, 
  EnhancedLevel, 
  EnhancedPaper, 
  Topic, 
  Subtopic 
} from '@/data/subjects/enhanced-types';
import { 
  getAvailableLevels, 
  getAvailablePapers, 
  getAvailableTopics, 
  getAvailableSubtopics 
} from './subjectConverter';

/**
 * Gets enhanced subject data for a specific subject
 * @param subject The subject name
 * @returns The enhanced subject data or null if not found
 */
export function getEnhancedSubjectData(subject: string): EnhancedSubject | null {
  return useEnhancedSubjectStore.getState().getSubject(subject);
}

/**
 * Maps paper names between display format and internal format (maintained for backward compatibility)
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
 * Gets available levels for a subject
 * @param subject The subject name
 * @returns Array of level names or empty array if subject not found
 */
export function getAvailableLevelsForSubject(subject: string): string[] {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  return getAvailableLevels(enhancedSubject);
}

/**
 * Gets available papers for a subject and level
 * @param subject The subject name
 * @param level The level name
 * @returns Array of paper names or empty array if level not found
 */
export function getAvailablePapersForLevel(subject: string, level: string): string[] {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  return getAvailablePapers(enhancedSubject, level);
}

/**
 * Gets available topics for a subject, level, and paper
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns Array of topic names or empty array if paper not found
 */
export function getAvailableTopicsForPaper(subject: string, level: string, paper: string): string[] {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  return getAvailableTopics(enhancedSubject, level, paper);
}

/**
 * Gets available subtopics for a subject, level, paper, and topic
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @returns Array of subtopic names or empty array if topic not found
 */
export function getAvailableSubtopicsForTopic(
  subject: string, 
  level: string, 
  paper: string, 
  topic: string
): string[] {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  return getAvailableSubtopics(enhancedSubject, level, paper, topic);
}

/**
 * Gets data for a specific topic, including description and keywords
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @returns Topic data or null if not found
 */
export function getTopicData(
  subject: string, 
  level: string, 
  paper: string, 
  topic: string
): Topic | null {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return null;
  
  // Get the topic data from the enhanced structure
  const topicData = enhancedSubject.levels[level]?.papers[paper]?.topics[topic];
  return topicData || null;
}

/**
 * Gets data for a specific subtopic, including description and keywords
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @param topic The topic name
 * @param subtopic The subtopic name
 * @returns Subtopic data or null if not found
 */
export function getSubtopicData(
  subject: string, 
  level: string, 
  paper: string, 
  topic: string, 
  subtopic: string
): Subtopic | null {
  // Get the topic data first
  const topicData = getTopicData(subject, level, paper, topic);
  if (!topicData) return null;
  
  // Get the subtopic data from the topic
  if (Array.isArray(topicData.subtopics)) {
    // If subtopics is an array, find by name
    const foundSubtopic = topicData.subtopics.find(st => 
      typeof st === 'string' ? st === subtopic : st.name === subtopic
    );
    
    if (!foundSubtopic) return null;
    
    // Convert string to Subtopic if needed
    if (typeof foundSubtopic === 'string') {
      const subtopicName = foundSubtopic as string;
      return { 
        name: subtopicName, 
        keywords: [subtopicName.toLowerCase()] 
      };
    }
    return foundSubtopic;
  } else {
    // If subtopics is an object, get by key
    return topicData.subtopics[subtopic] || null;
  }
}

/**
 * Gets a list of keywords for a specific subject, topic, or subtopic
 * Used for search and tags
 * @param subject The subject name
 * @param level Optional level name
 * @param paper Optional paper name
 * @param topic Optional topic name
 * @param subtopic Optional subtopic name
 * @returns Array of keywords
 */
export function getKeywords(
  subject: string,
  level?: string,
  paper?: string,
  topic?: string,
  subtopic?: string
): string[] {
  // Start with subject-level keywords
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  // Start with subject keywords
  let keywords = [...(enhancedSubject.keywords || [])];
  
  // Add level keywords if specified
  if (level && enhancedSubject.levels[level]) {
    keywords.push(level.toLowerCase());
  }
  
  // Add paper keywords if specified
  if (level && paper && enhancedSubject.levels[level]?.papers[paper]) {
    keywords.push(paper.toLowerCase());
  }
  
  // Add topic keywords if specified
  if (level && paper && topic) {
    const topicData = getTopicData(subject, level, paper, topic);
    if (topicData && topicData.keywords) {
      keywords = [...keywords, ...topicData.keywords];
    }
  }
  
  // Add subtopic keywords if specified
  if (level && paper && topic && subtopic) {
    const subtopicData = getSubtopicData(subject, level, paper, topic, subtopic);
    if (subtopicData && subtopicData.keywords) {
      keywords = [...keywords, ...subtopicData.keywords];
    }
  }
  
  return [...new Set(keywords)]; // Remove duplicates
}

/**
 * Gets available sections for a paper
 * @param subject The subject name
 * @param level The level name
 * @param paper The paper name
 * @returns Array of section names or empty array if paper not found
 */
export function getAvailableSections(subject: string, level: string, paper: string): string[] {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  const paperData = enhancedSubject.levels[level]?.papers[paper];
  if (!paperData) return [];
  
  return paperData.sections || [];
}

/**
 * Searches for topics and subtopics based on keywords
 * @param subject The subject name
 * @param searchTerm The search term
 * @returns Array of search results with path information
 */
export function searchSubjectContent(subject: string, searchTerm: string): Array<{
  level: string;
  paper: string;
  topic: string;
  subtopic?: string;
  score: number;
}> {
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) return [];
  
  const results: Array<{
    level: string;
    paper: string;
    topic: string;
    subtopic?: string;
    score: number;
  }> = [];
  
  // Simple search implementation
  const normSearch = searchTerm.toLowerCase();
  
  // Iterate through all levels, papers, topics, and subtopics
  Object.entries(enhancedSubject.levels).forEach(([levelName, level]) => {
    Object.entries(level.papers).forEach(([paperName, paper]) => {
      Object.entries(paper.topics).forEach(([topicName, topic]) => {
        // Check if topic name or keywords match
        const topicKeywords = [...(topic.keywords || []), topic.name.toLowerCase()];
        const topicScore = getSearchScore(topicKeywords, normSearch);
        
        if (topicScore > 0) {
          results.push({
            level: levelName,
            paper: paperName,
            topic: topicName,
            score: topicScore
          });
        }
        
        // Check subtopics
        if (Array.isArray(topic.subtopics)) {
          topic.subtopics.forEach(subtopic => {
            const subtopicName = typeof subtopic === 'string' ? subtopic as string : (subtopic as Subtopic).name;
            const subtopicObj = typeof subtopic === 'string' 
              ? { name: subtopicName, keywords: [subtopicName.toLowerCase()] } 
              : subtopic;
            const subtopicKeywords = [...(subtopicObj.keywords || []), subtopicObj.name.toLowerCase()];
            const subtopicScore = getSearchScore(subtopicKeywords, normSearch);
            
            if (subtopicScore > 0) {
              results.push({
                level: levelName,
                paper: paperName,
                topic: topicName,
                subtopic: subtopicObj.name,
                score: subtopicScore
              });
            }
          });
        } else {
          Object.entries(topic.subtopics).forEach(([subtopicName, subtopic]) => {
            const subtopicKeywords = [...(subtopic.keywords || []), subtopic.name.toLowerCase()];
            const subtopicScore = getSearchScore(subtopicKeywords, normSearch);
            
            if (subtopicScore > 0) {
              results.push({
                level: levelName,
                paper: paperName,
                topic: topicName,
                subtopic: subtopicName,
                score: subtopicScore
              });
            }
          });
        }
      });
    });
  });
  
  // Sort by score (descending)
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Helper function to calculate search relevance score
 * @param keywords Array of keywords to check
 * @param searchTerm The search term
 * @returns Numeric score (higher is better match)
 */
function getSearchScore(keywords: string[], searchTerm: string): number {
  let score = 0;
  
  // Exact match gets highest score
  if (keywords.some(kw => kw === searchTerm)) {
    score += 10;
  }
  
  // Partial matches
  keywords.forEach(kw => {
    if (kw.includes(searchTerm)) {
      score += 5;
    } else if (searchTerm.includes(kw)) {
      score += 3;
    }
  });
  
  return score;
}

/**
 * Gets metadata for a subject (like display names, labels, etc.)
 * @param subject The subject name
 * @returns Metadata object or empty object if not found
 */
export function getSubjectMetadata(subject: string): Record<string, any> {
  const enhancedSubject = getEnhancedSubjectData(subject);
  
  if (!enhancedSubject) return {};
  
  // Extract metadata from the enhanced subject
  return {
    displayName: enhancedSubject.name || subject,
    description: enhancedSubject.description || '',
    paperLabel: enhancedSubject.paperLabel || 'Paper',
    sectionLabel: enhancedSubject.sectionLabel || 'Section',
    topicLabel: enhancedSubject.topicLabel || 'Topic',
    subtopicLabel: enhancedSubject.subtopicLabel || 'Subtopic',
    ...enhancedSubject.metadata
  };
} 