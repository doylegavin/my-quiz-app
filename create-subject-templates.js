const fs = require('fs');
const path = require('path');

// Lists of subjects by category
const subjects = {
  languages: [
    'french', 'german', 'spanish', 'italian', 'russian', 'japanese', 'arabic',
    'hebrew-studies', 'latin', 'ancient-greek', 'polish', 'mandarin-chinese',
    'portuguese', 'lithuanian'
  ],
  sciences: [
    'biology', 'chemistry', 'physics', 'agricultural-science', 'physics-and-chemistry'
  ],
  business: [
    'accounting', 'business', 'economics'
  ],
  humanities: [
    'history', 'geography', 'politics-and-society', 'religious-education'
  ],
  arts: [
    'art', 'music', 'drama-film-and-theatre-studies'
  ],
  technology: [
    'engineering', 'construction-studies', 'design-and-communication-graphics',
    'technology', 'computer-science'
  ],
  other: [
    'home-economics', 'applied-mathematics', 'mathematical-applications', 'classical-studies'
  ]
};

// Base path for subjects
const basePath = path.join(__dirname, 'src', 'data', 'subjects');

// Create higher level template
function createHigherLevelTemplate(subject) {
  const formattedSubject = formatSubjectName(subject);
  
  return `import { LevelData } from '../types';

const ${subject.replace(/-/g, '')}HigherLevel: LevelData = {
  ${subject.replace(/-/g, '')}: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 1": [],
          "Topic 2": []
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 3": [],
          "Topic 4": []
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default ${subject.replace(/-/g, '')}HigherLevel;`;
}

// Create ordinary level template
function createOrdinaryLevelTemplate(subject) {
  const formattedSubject = formatSubjectName(subject);
  
  return `import { LevelData } from '../types';

const ${subject.replace(/-/g, '')}OrdinaryLevel: LevelData = {
  ${subject.replace(/-/g, '')}: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 1": [],
          "Topic 2": []
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Topic 3": [],
          "Topic 4": []
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default ${subject.replace(/-/g, '')}OrdinaryLevel;`;
}

// Create index template
function createIndexTemplate(subject) {
  const formattedSubject = formatSubjectName(subject);
  
  return `import ${subject.replace(/-/g, '')}HigherLevel from './higher-level';
import ${subject.replace(/-/g, '')}OrdinaryLevel from './ordinary-level';
import { LevelData } from '../types';

const ${subject.replace(/-/g, '')}: LevelData = {
  ${subject.replace(/-/g, '')}: {
    papers: {
      ...${subject.replace(/-/g, '')}HigherLevel.${subject.replace(/-/g, '')}.papers,
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level", "Ordinary Level"]
  }
};

export { ${subject.replace(/-/g, '')}HigherLevel, ${subject.replace(/-/g, '')}OrdinaryLevel };
export default ${subject.replace(/-/g, '')};`;
}

// Format subject name for variable names
function formatSubjectName(subject) {
  return subject.replace(/-/g, '');
}

// Create all files for a subject
function createFilesForSubject(subject) {
  const subjectPath = path.join(basePath, subject);
  
  // Ensure the directory exists
  if (!fs.existsSync(subjectPath)) {
    fs.mkdirSync(subjectPath, { recursive: true });
  }
  
  // Create the files
  fs.writeFileSync(
    path.join(subjectPath, 'higher-level.ts'),
    createHigherLevelTemplate(subject)
  );
  
  fs.writeFileSync(
    path.join(subjectPath, 'ordinary-level.ts'),
    createOrdinaryLevelTemplate(subject)
  );
  
  fs.writeFileSync(
    path.join(subjectPath, 'index.ts'),
    createIndexTemplate(subject)
  );
  
  console.log(`Created templates for ${subject}`);
}

// Create files for all subjects
function createAllSubjectFiles() {
  for (const category in subjects) {
    for (const subject of subjects[category]) {
      createFilesForSubject(subject);
    }
  }
  console.log('All subject templates created successfully!');
}

// Run the script
createAllSubjectFiles(); 