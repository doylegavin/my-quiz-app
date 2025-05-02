/**
 * Enhanced type definitions for subject data structure
 */

// Base interface for subtopics
export interface Subtopic {
  name: string;
  description?: string;
  keywords?: string[];
  examples?: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

// Base interface for topics
export interface Topic {
  name: string;
  description?: string;
  subtopics: Record<string, Subtopic> | Subtopic[];
  keywords?: string[];
}

// Base interface for paper structure
export interface EnhancedPaper {
  name: string;
  description?: string;
  sections: string[];
  topics: Record<string, Topic>;
}

// Base interface for level structure
export interface EnhancedLevel {
  name: string;
  description?: string;
  papers: Record<string, EnhancedPaper>;
}

// Base interface for subject structure
export interface EnhancedSubject {
  name: string;
  description?: string;
  difficulty: string[];
  levels: Record<string, EnhancedLevel>;
  keywords?: string[];
  relatedSubjects?: string[];
  paperLabel?: string;
  sectionLabel?: string;
  topicLabel?: string;
  subtopicLabel?: string;
  metadata?: Record<string, any>;
}

// Type for the overall enhanced subjects data structure
export type EnhancedSubjectData = Record<string, EnhancedSubject>;

// Helper type for compatibility with existing structure
export type LegacySubjectData = {
  papers: Record<string, {
    name: string;
    sections: string[];
    topics: Record<string, string[]>;
  }>;
  difficulty: string[];
  levels: string[];
};

// Conversion utility type
export interface SubjectConverter {
  toEnhanced: (legacy: any) => EnhancedSubject;
  toLegacy: (enhanced: EnhancedSubject) => LegacySubjectData;
} 