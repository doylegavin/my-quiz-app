/**
 * Enhanced prompt generation utilities that leverage the enhanced subject data structure
 */

import { getSubjectPrompt as getOriginalSubjectPrompt } from './subjectPrompts';
import { getEnhancedSubjectData, getTopicData, getSubtopicData, getKeywords } from '../utils/enhancedSubjectUtils';
import { SubjectPromptTemplate } from './subjectPrompts';

/**
 * Gets a subject-specific prompt, enhanced with topic and subtopic details
 * @param subject The subject name
 * @param level The level name
 * @param paper Optional paper name
 * @param topic Optional topic name
 * @param subtopic Optional subtopic name
 * @returns Enhanced subject prompt template
 */
export function getEnhancedSubjectPrompt(
  subject: string,
  level: string,
  paper?: string,
  topic?: string,
  subtopic?: string
): SubjectPromptTemplate {
  // Get the base subject prompt
  const basePrompt = getOriginalSubjectPrompt(subject, level);
  
  // Get enhanced subject data for enriching the prompt
  const enhancedSubject = getEnhancedSubjectData(subject);
  if (!enhancedSubject) {
    return basePrompt;
  }
  
  // Create a new prompt template based on the original
  const enhancedPrompt: SubjectPromptTemplate = {
    baseInstructions: basePrompt.baseInstructions,
    userPrompt: basePrompt.userPrompt,
    exampleQuestion: basePrompt.exampleQuestion,
    exampleSolution: basePrompt.exampleSolution
  };
  
  // Enhance with subject keywords
  const keywords = getKeywords(subject, level, paper, topic, subtopic);
  
  // Enhance with topic-specific instructions if available
  if (paper && topic) {
    const topicData = getTopicData(subject, level, paper, topic);
    
    if (topicData) {
      // Add topic description to base instructions if available
      if (topicData.description) {
        enhancedPrompt.baseInstructions += `\n\nTOPIC DETAILS: ${topicData.description}`;
      }
      
      // Add topic keywords to base instructions
      if (topicData.keywords && topicData.keywords.length > 0) {
        enhancedPrompt.baseInstructions += `\n\nTOPIC KEYWORDS: ${topicData.keywords.join(', ')}`;
      }
      
      // Add subtopic details if available
      if (subtopic) {
        const subtopicData = getSubtopicData(subject, level, paper, topic, subtopic);
        
        if (subtopicData) {
          // Add subtopic description to base instructions if available
          if (subtopicData.description) {
            enhancedPrompt.baseInstructions += `\n\nSUBTOPIC DETAILS: ${subtopicData.description}`;
          }
          
          // Add subtopic keywords to base instructions
          if (subtopicData.keywords && subtopicData.keywords.length > 0) {
            enhancedPrompt.baseInstructions += `\n\nSUBTOPIC KEYWORDS: ${subtopicData.keywords.join(', ')}`;
          }
          
          // Add subtopic examples to user prompt if available
          if (subtopicData.examples && subtopicData.examples.length > 0) {
            enhancedPrompt.userPrompt += `\n\nRELEVANT EXAMPLES:`;
            subtopicData.examples.forEach((example, index) => {
              enhancedPrompt.userPrompt += `\n${index + 1}. ${example}`;
            });
          }
          
          // Add difficulty-specific instructions if available
          if (subtopicData.difficulty) {
            enhancedPrompt.userPrompt += `\n\nSPECIFIC DIFFICULTY LEVEL: ${subtopicData.difficulty}`;
          }
        }
      }
    }
  }
  
  // Add general keywords to the prompt
  if (keywords.length > 0) {
    enhancedPrompt.userPrompt += `\n\nKEYWORDS TO INCORPORATE: ${keywords.join(', ')}`;
  }
  
  return enhancedPrompt;
}

/**
 * Generates a subject-specific prompt with specific difficulty
 * @param subject The subject name
 * @param level The level name
 * @param difficulty The difficulty level
 * @param paper Optional paper name
 * @param topic Optional topic name
 * @param subtopic Optional subtopic name
 * @returns Enhanced prompt template with difficulty-specific instructions
 */
export function getDifficultySpecificPrompt(
  subject: string,
  level: string,
  difficulty: string,
  paper?: string,
  topic?: string,
  subtopic?: string
): SubjectPromptTemplate {
  // Get the enhanced subject prompt
  const enhancedPrompt = getEnhancedSubjectPrompt(subject, level, paper, topic, subtopic);
  
  // Add difficulty-specific instructions
  const difficultyInstructions = getDifficultyInstructions(difficulty);
  
  // Create a new prompt template with difficulty instructions
  return {
    ...enhancedPrompt,
    userPrompt: `${enhancedPrompt.userPrompt}\n\n${difficultyInstructions}`
  };
}

/**
 * Gets difficulty-specific instructions for prompts
 * @param difficulty The difficulty level
 * @returns Difficulty-specific instruction text
 */
function getDifficultyInstructions(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return `DIFFICULTY: Easy\n\nCreate questions that:\n- Focus on fundamental concepts\n- Require straightforward application of knowledge\n- Can be solved using a single technique\n- Have minimal steps to the solution\n- Use clear, explicit language\n- Are suitable for learners who are just beginning to understand the topic`;
      
    case 'medium':
      return `DIFFICULTY: Medium\n\nCreate questions that:\n- Require understanding of intermediate concepts\n- Involve 2-3 steps to reach the solution\n- May combine multiple related concepts\n- Test deeper understanding beyond basic recall\n- Include some inference or analysis\n- Are appropriate for students with a solid grasp of fundamentals`;
      
    case 'hard':
      return `DIFFICULTY: Hard\n\nCreate questions that:\n- Challenge advanced understanding of the subject\n- Require complex problem-solving strategies\n- Involve multiple steps and techniques\n- May need creative approaches or insight\n- Test the ability to apply knowledge in novel situations\n- Could include subtle details that require careful attention\n- Are suitable for students with mastery of the subject area`;
      
    case 'random':
    default:
      return `DIFFICULTY: Mixed\n\nCreate a variety of questions that span different difficulty levels, from straightforward application to complex problem-solving. Include a balance of easy, medium, and hard questions to test different aspects of understanding.`;
  }
}