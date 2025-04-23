import subjectData from "@/data/subjects";

/**
 * Gets subject data for a specific subject
 * @param subject The subject name
 * @returns The subject data or undefined if not found
 */
export function getSubjectData(subject: string) {
  return subjectData[subject];
} 