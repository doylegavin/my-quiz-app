import { getSubjectPrompt } from '../lib/prompts/subjectPrompts';

/**
 * This script tests the subject-specific prompts without making an actual API call
 * It helps visualize how the prompts will be constructed for different subjects
 */

// Example request data matching what would come from the quiz form
const testRequest = {
  subject: 'mathematics',
  level: 'Higher Level',
  paper: 'Paper 1',
  sections: 'Short Questions',
  difficulty: 'Hard',
  topic: 'Algebra',
  subtopic: 'Cubic Equations'
};

// Get the subject prompt
const subjectPrompt = getSubjectPrompt(testRequest.subject, testRequest.level);

// Build the user prompt with the specific request parameters
let userPrompt = subjectPrompt.userPrompt;

// Append specific parameters if using a subject-specific template
if (userPrompt.includes('difficulty') || userPrompt.includes('subject')) {
  userPrompt += `\n\n${testRequest.difficulty} difficulty on the topic: ${testRequest.topic}.`;
  
  // Add paper information if provided
  if (testRequest.paper && testRequest.paper !== "Both") {
    userPrompt += `\nFocus on ${testRequest.paper} content.`;
  }

  // Add section information if provided
  if (testRequest.sections) {
    userPrompt += `\nInclude ${testRequest.sections} type questions.`;
  }

  // Add subtopic information if provided
  if (testRequest.subtopic) {
    userPrompt += `\nSpecifically focus on the subtopic: ${testRequest.subtopic}.`;
  }
}

// Add example question and solution from the subject template if available
if (subjectPrompt.exampleQuestion && subjectPrompt.exampleSolution) {
  userPrompt += `\n\nExample question: ${subjectPrompt.exampleQuestion}\n\nExample solution: ${subjectPrompt.exampleSolution}`;
}

// Final instructions
userPrompt += `\n\nReturn JSON only, with keys "questions" and "solutions".
No extra text or explanations outside the JSON.`;

// Output the results for debugging
console.log('\n=== Subject-Specific Test ===\n');
console.log('Subject:', testRequest.subject);
console.log('Level:', testRequest.level);
console.log('\n--- Base Instructions ---\n');
console.log(subjectPrompt.baseInstructions.substring(0, 500) + '...');
console.log('\n--- User Prompt ---\n');
console.log(userPrompt.substring(0, 500) + '...');

// Test another subject
const testRequest2 = {
  subject: 'physics',
  level: 'Higher Level',
  paper: 'Paper 1',
  difficulty: 'Hard',
  topic: 'Mechanics',
  subtopic: 'Projectile Motion'
};

// Get the subject prompt for the second test
const subjectPrompt2 = getSubjectPrompt(testRequest2.subject, testRequest2.level);

// Build the user prompt with parameters for the second test
let userPrompt2 = subjectPrompt2.userPrompt;

// Append specific parameters for the second test
userPrompt2 += `\n\n${testRequest2.difficulty} difficulty on the topic: ${testRequest2.topic}.`;
if (testRequest2.paper && testRequest2.paper !== "Both") {
  userPrompt2 += `\nFocus on ${testRequest2.paper} content.`;
}
if (testRequest2.subtopic) {
  userPrompt2 += `\nSpecifically focus on the subtopic: ${testRequest2.subtopic}.`;
}

// Final instructions for the second test
userPrompt2 += `\n\nReturn JSON only, with keys "questions" and "solutions".
No extra text or explanations outside the JSON.`;

// Output the results for the second test
console.log('\n\n=== Subject-Specific Test 2 ===\n');
console.log('Subject:', testRequest2.subject);
console.log('Level:', testRequest2.level);
console.log('\n--- Base Instructions ---\n');
console.log(subjectPrompt2.baseInstructions.substring(0, 500) + '...');
console.log('\n--- User Prompt ---\n');
console.log(userPrompt2.substring(0, 500) + '...');

// Log a message about how to run this script
console.log('\n\nTo run this script: npx ts-node src/scripts/test-prompt.ts'); 