/**
 * Utility functions for interacting with examinations.ie
 */
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ExamPaper {
  id: string;
  year: string;
  title: string;
  subject: string;
  level: string; // Higher, Ordinary, Foundation
  language: string; // English, Irish
  type: string; // Exam Paper, Marking Scheme
  url: string;
  details?: string; // Additional details about the paper
  examType?: string; // Leave Cert, Junior Cert, etc.
}

/**
 * Fetch available exams from examinations.ie based on specified criteria
 */
export async function fetchExamPapers({
  subject,
  year,
  level,
  examType,
  language,
}: {
  subject?: string;
  year?: string;
  level?: string; // 'Higher' | 'Ordinary' | 'Foundation'
  examType?: string; // 'Paper' | 'Marking Scheme'
  language?: string; // 'English' | 'Irish'
}): Promise<ExamPaper[]> {
  try {
    // The examinations.ie site uses a form-based search, so we need to simulate a POST request
    const formData = new URLSearchParams();
    
    // Add search parameters if provided
    if (subject) formData.append('ExamSubject', subject);
    if (year) formData.append('ExamYear', year);
    if (level) formData.append('Level', level);
    if (examType) formData.append('Type', examType);
    if (language) formData.append('Language', language);
    
    // Send the request to examinations.ie
    const response = await axios.post(
      'https://www.examinations.ie/exammaterialarchive/',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // Use cheerio to parse the HTML response
    const $ = cheerio.load(response.data);
    const results: ExamPaper[] = [];

    // Parse the table containing exam papers
    $('table.results tr').each((index, element) => {
      // Skip the header row
      if (index === 0) return;
      
      const cells = $(element).find('td');
      if (cells.length >= 6) {
        const linkElement = $(cells[5]).find('a');
        const url = linkElement.attr('href') || '';
        const paperType = $(cells[4]).text().trim();
        const paperSubject = $(cells[1]).text().trim();
        const paperLevel = $(cells[2]).text().trim();
        const paperLanguage = $(cells[3]).text().trim();
        const paperYear = $(cells[0]).text().trim();
        const paperTitle = linkElement.text().trim();
        
        if (url) {
          results.push({
            id: `${paperYear}-${paperSubject}-${paperLevel}-${paperLanguage}-${paperType}`,
            year: paperYear,
            subject: paperSubject,
            level: paperLevel,
            language: paperLanguage,
            type: paperType,
            title: paperTitle,
            details: paperTitle.replace(paperType, '').trim(),
            url: url.startsWith('http') ? url : `https://www.examinations.ie${url}`,
            examType: getExamTypeFromSubject(paperSubject, paperLevel),
          });
        }
      }
    });

    return results;
  } catch (error) {
    console.error('Error fetching exam papers:', error);
    throw new Error('Failed to fetch exam papers from examinations.ie');
  }
}

/**
 * Download an exam paper PDF from the provided URL
 */
export async function downloadExamPaper(paper: ExamPaper): Promise<Blob> {
  try {
    const response = await axios.get(paper.url, {
      responseType: 'arraybuffer',
    });
    
    return new Blob([response.data], { type: 'application/pdf' });
  } catch (error) {
    console.error('Error downloading exam paper:', error);
    throw new Error('Failed to download exam paper from examinations.ie');
  }
}

/**
 * Infer the exam type (Leaving Cert, Junior Cert, etc.) from the subject and level
 */
function getExamTypeFromSubject(subject: string, level: string): string {
  const leavingCertSubjects = [
    'Accounting', 'Agricultural Economics', 'Agricultural Science', 'Ancient Greek',
    'Applied Mathematics', 'Arabic', 'Art', 'Biology', 'Business', 'Chemistry',
    'Classical Studies', 'Construction Studies', 'Design & Communication Graphics',
    'Economics', 'Engineering', 'English', 'French', 'Geography', 'German', 'Hebrew Studies',
    'History', 'Home Economics', 'Irish', 'Italian', 'Japanese', 'Latin', 'Mathematics',
    'Music', 'Physics', 'Physics and Chemistry', 'Polish', 'Portuguese',
    'Religious Education', 'Russian', 'Spanish', 'Technology'
  ];
  
  const juniorCertSubjects = [
    'Ancient Greek', 'Art, Craft & Design', 'Business Studies', 'Civic, Social & Political Education',
    'Classical Studies', 'English', 'Environmental & Social Studies', 'French', 'Geography',
    'German', 'History', 'Home Economics', 'Irish', 'Italian', 'Latin', 'Materials Technology (Wood)',
    'Mathematics', 'Metalwork', 'Music', 'Religious Education', 'Science', 'Spanish',
    'Technical Graphics', 'Technology'
  ];
  
  if (leavingCertSubjects.includes(subject)) {
    return 'Leaving Cert';
  } else if (juniorCertSubjects.includes(subject)) {
    return 'Junior Cert';
  } else if (subject.includes('Applied')) {
    return 'Leaving Cert Applied';
  } else {
    return 'Other';
  }
}

// Favorites functionality using localStorage
const FAVORITES_KEY = 'favorite_subjects';

/**
 * Get favorite subjects from localStorage
 */
export function getFavoriteSubjects(): string[] {
  if (typeof window === 'undefined') return [];
  
  const favoritesJson = localStorage.getItem(FAVORITES_KEY);
  return favoritesJson ? JSON.parse(favoritesJson) : [];
}

/**
 * Add a subject to favorites
 */
export function addFavoriteSubject(subject: string): string[] {
  if (typeof window === 'undefined') return [];
  
  const favorites = getFavoriteSubjects();
  if (!favorites.includes(subject)) {
    favorites.push(subject);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

/**
 * Remove a subject from favorites
 */
export function removeFavoriteSubject(subject: string): string[] {
  if (typeof window === 'undefined') return [];
  
  const favorites = getFavoriteSubjects();
  const updatedFavorites = favorites.filter(fav => fav !== subject);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
}

/**
 * Toggle a subject's favorite status
 */
export function toggleFavoriteSubject(subject: string): string[] {
  if (typeof window === 'undefined') return [];
  
  const favorites = getFavoriteSubjects();
  if (favorites.includes(subject)) {
    return removeFavoriteSubject(subject);
  } else {
    return addFavoriteSubject(subject);
  }
} 