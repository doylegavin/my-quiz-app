import data from '@/data/data.json';
import { ExamPaper } from './examinations';

// Define interface for the data structure
interface ExamData {
  [examType: string]: {
    [subject: string]: {
      [year: string]: Array<{
        url: string;
        type: string;
        details: string;
      }>
    }
  }
}

interface SubjectMapping {
  [id: string]: string;
}

// Mapping between internal codes and UI labels
const examTypeMapping: {[key: string]: string} = {
  'lc': 'Leaving Cert',
  'jc': 'Junior Cert',
  'lb': 'Leaving Cert Applied'
};

// Get the subject name from subNumsToNames mapping or use the ID if not found
function getSubjectName(id: string): string {
  const subNumsToNames = (data as any).subNumsToNames as SubjectMapping || {};
  return subNumsToNames[id] || id;
}

// Convert data.json format to our ExamPaper interface
export function getPapersFromStaticData(
  examType: string,
  subject?: string,
  year?: string,
  level?: string,
  language?: string
): ExamPaper[] {
  const results: ExamPaper[] = [];
  
  try {
    // Get the exam section of the data
    const examData = (data as unknown as ExamData)[examType];
    if (!examData) return [];
    
    // Find numeric ID for the given subject name
    let subjectId: string | undefined;
    if (subject) {
      const subNumsToNames = (data as any).subNumsToNames as SubjectMapping || {};
      for (const [id, name] of Object.entries(subNumsToNames)) {
        if (name === subject) {
          subjectId = id;
          break;
        }
      }
    }
    
    // Get subjects to process
    const subjectsToProcess = subjectId 
      ? [subjectId] 
      : Object.keys(examData);
    
    // Iterate through subjects
    for (const subj of subjectsToProcess) {
      if (!examData[subj]) continue;
      
      // Convert subject ID to name
      const subjectName = getSubjectName(subj);
      
      // Get years to process
      const yearsToProcess = year 
        ? [year] 
        : Object.keys(examData[subj]);
      
      // Iterate through years
      for (const yr of yearsToProcess) {
        if (!examData[subj][yr]) continue;
        
        // Process papers for this subject and year
        const papers = examData[subj][yr];
        
        for (const paper of papers) {
          // Extract paper details
          const paperUrl = paper.url;
          
          // Extract language from URL
          const paperLanguage = paperUrl.includes('IV') ? 'Irish' : 'English';
          if (language && paperLanguage !== language) continue;
          
          // Extract level from URL
          const levelMatch: {[key: string]: string} = {
            'AL': 'Higher',
            'GL': 'Ordinary',
            'BL': 'Foundation',
            'CL': 'Common'
          };
          
          // Try to determine level from URL
          let paperLevel = 'Higher'; // Default
          for (const [code, name] of Object.entries(levelMatch)) {
            if (paperUrl.includes(code)) {
              paperLevel = name;
              break;
            }
          }
          
          // Skip if level doesn't match filter
          if (level && paperLevel !== level) continue;
          
          // Create ExamPaper object
          results.push({
            id: `${yr}-${subjectName}-${paperLevel}-${paperLanguage}-${paper.type}`,
            year: yr,
            subject: subjectName,
            level: paperLevel,
            language: paperLanguage,
            type: paper.type,
            title: paper.details,
            details: paper.details,
            url: `https://www.examinations.ie/archive/${paper.type.includes('Marking') ? 'markingschemes' : 'exampapers'}/${yr}/${paperUrl}`,
            examType: examTypeMapping[examType] || 'Other'
          });
        }
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error processing static exam data:', error);
    return [];
  }
}

// Get unique subjects for an exam type
export function getSubjectsForExamType(examType: string): string[] {
  try {
    // Get the subject ID mapping
    const subNumsToNames = (data as any).subNumsToNames as SubjectMapping || {};
    
    // Get subject IDs for this exam type
    const examData = (data as unknown as ExamData)[examType];
    if (!examData) return [];
    
    // Map IDs to names and sort alphabetically
    return Object.keys(examData)
      .map(id => subNumsToNames[id] || id)
      .filter(name => name && name.trim() !== '')
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error('Error getting subjects:', error);
    return [];
  }
} 