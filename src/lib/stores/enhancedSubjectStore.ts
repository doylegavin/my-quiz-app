/**
 * Enhanced subject data store using zustand
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { convertToEnhanced, convertToLegacy } from '../utils/subjectConverter';
import { EnhancedSubject, EnhancedSubjectData } from '@/data/subjects/enhanced-types';
import subjectData from '@/data/subjects';

// Define the store state type
interface EnhancedSubjectState {
  // Store all subjects in enhanced format
  subjects: EnhancedSubjectData;
  
  // Action to load a subject if not already loaded
  loadSubject: (subjectName: string) => EnhancedSubject | null;
  
  // Action to add or update a subject
  updateSubject: (subjectName: string, subjectData: EnhancedSubject) => void;
  
  // Get subject in enhanced format
  getSubject: (subjectName: string) => EnhancedSubject | null;
  
  // Get subject in legacy format for backward compatibility
  getLegacySubject: (subjectName: string) => any;
  
  // Check if a subject exists
  hasSubject: (subjectName: string) => boolean;
}

// Create the store with persistence
export const useEnhancedSubjectStore = create<EnhancedSubjectState>()(
  persist(
    (set, get) => ({
      // Initialize with empty subjects
      subjects: {},
      
      // Load a subject from the legacy format and convert to enhanced
      loadSubject: (subjectName: string) => {
        const { subjects } = get();
        
        // Return if already loaded
        if (subjects[subjectName]) {
          return subjects[subjectName];
        }
        
        // Get from legacy data
        const legacySubjectData = subjectData[subjectName];
        if (!legacySubjectData) {
          console.error(`Subject '${subjectName}' not found in legacy data`);
          return null;
        }
        
        // Convert to enhanced format
        const enhancedSubject = convertToEnhanced(subjectName, legacySubjectData);
        
        // Update store
        set((state) => ({
          subjects: {
            ...state.subjects,
            [subjectName]: enhancedSubject
          }
        }));
        
        return enhancedSubject;
      },
      
      // Update an existing subject or add a new one
      updateSubject: (subjectName: string, subjectData: EnhancedSubject) => {
        set((state) => ({
          subjects: {
            ...state.subjects,
            [subjectName]: subjectData
          }
        }));
      },
      
      // Get a subject in enhanced format
      getSubject: (subjectName: string) => {
        const { subjects, loadSubject } = get();
        
        // Return if already loaded
        if (subjects[subjectName]) {
          return subjects[subjectName];
        }
        
        // Try to load it
        return loadSubject(subjectName);
      },
      
      // Get a subject in legacy format
      getLegacySubject: (subjectName: string) => {
        const { getSubject } = get();
        const enhancedSubject = getSubject(subjectName);
        
        if (!enhancedSubject) {
          return null;
        }
        
        // Convert to legacy format
        return convertToLegacy(enhancedSubject);
      },
      
      // Check if a subject exists
      hasSubject: (subjectName: string) => {
        const { subjects } = get();
        return !!subjects[subjectName];
      },
    }),
    {
      name: 'enhanced-subject-store',
      partialize: (state) => ({ subjects: state.subjects }),
    }
  )
); 