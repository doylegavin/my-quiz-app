/**
 * Index for enhanced subject data samples
 * This module registers the enhanced sample data with the enhanced subject store
 */

import { useEnhancedSubjectStore } from '@/lib/stores/enhancedSubjectStore';
import enhancedMathematics from './mathematics';
import enhancedBiology from './biology';
import enhancedPhysics from './physics';

// Direct imports from original subject files
import mathHigherLevel from '@/data/subjects/mathematics/higher-level';
import { convertLevelDataToEnhanced } from '@/lib/utils/subjectConverter';

// Note: Do not import README.md here

/**
 * Register all enhanced subject samples with the store
 * Call this function during app initialization to preload enhanced subject data
 */
export function registerEnhancedSubjects() {
  const { updateSubject } = useEnhancedSubjectStore.getState();
  
  // Register each enhanced subject
  updateSubject('mathematics', enhancedMathematics);
  updateSubject('biology', enhancedBiology);
  updateSubject('physics', enhancedPhysics);
  
  // Register original subject level files directly
  // This ensures detailed data from files like mathematics/higher-level.ts is used
  const mathHigherLevelEnhanced = convertLevelDataToEnhanced('mathematics', 'Higher Level', mathHigherLevel);
  updateSubject('mathematicsHL', mathHigherLevelEnhanced);
  
  // Additional subjects can be registered here in the future
  // etc.
  
  console.log('Enhanced subject data registered successfully');
  console.log('Available subjects:', Object.keys(useEnhancedSubjectStore.getState().subjects));
}

// Export enhanced subjects for direct access if needed
export {
  enhancedMathematics,
  enhancedBiology,
  enhancedPhysics,
  mathHigherLevel
}; 