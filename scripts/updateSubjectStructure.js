const fs = require('fs');
const path = require('path');

// Template for subject structure
const createSubjectTemplate = (subjectName, papers, levels) => `import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';
${levels.includes('Foundation Level') ? "import foundationLevel from './foundation-level';" : ''}

export const ${subjectName} = {
  papers: ${JSON.stringify(papers, null, 2)},
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ${JSON.stringify(levels)}
};

export { higherLevel, ordinaryLevel${levels.includes('Foundation Level') ? ', foundationLevel' : ''} };
`;

// Add your subject-specific data here
const subjectsToUpdate = [
  // Language Example: French
  {
    name: 'french',
    path: 'src/data/subjects/french/index.ts',
    papers: {
      "Both": {
        name: "All Components",
        sections: ["Listening", "Reading", "Writing", "Oral"],
        topics: {
          "General Communication": ["Personal Information", "Family", "Education", "Daily Routine", "Leisure Activities"],
          "Grammar": ["Present Tense", "Past Tense", "Future Tense", "Conditional", "Subjunctive"],
          "Comprehension": ["Reading", "Listening", "Cultural Knowledge"],
          "Production": ["Letter Writing", "Essay Writing", "Creative Writing", "Note Making"]
        }
      },
      "Paper 1": {
        name: "Written Paper",
        sections: ["Reading Comprehension", "Written Production"],
        topics: {
          "Reading Comprehension": ["Literary Texts", "Informational Texts", "Authentic Materials"],
          "Written Production": ["Letter/Email", "Essay", "Note/Message", "Creative Writing"]
        }
      },
      "Paper 2": {
        name: "Listening Comprehension",
        sections: ["Short Passages", "Long Passages", "News Items"],
        topics: {
          "Listening Skills": ["Identifying Key Information", "Understanding Context", "Inferring Meaning"],
          "Content Areas": ["Daily Life", "Education", "Current Affairs", "Culture"]
        }
      },
      "Oral": {
        name: "Oral Examination",
        sections: ["General Conversation", "Role Play", "Picture Description"],
        topics: {
          "Speaking Skills": ["Pronunciation", "Fluency", "Vocabulary Range", "Grammatical Accuracy"],
          "Communication": ["Responding to Questions", "Initiating Conversation", "Expressing Opinions"]
        }
      }
    },
    levels: ["Higher Level", "Ordinary Level"]
  },
  
  // Science Example: Physics
  {
    name: 'physics',
    path: 'src/data/subjects/physics/index.ts',
    papers: {
      "Both": {
        name: "All Components",
        sections: ["Mechanics", "Heat", "Waves", "Electricity & Magnetism", "Modern Physics"],
        topics: {
          "Mechanics": ["Motion", "Forces", "Energy", "Momentum", "Circular Motion"],
          "Heat": ["Temperature", "Specific Heat Capacity", "Latent Heat", "Gas Laws", "Thermodynamics"],
          "Waves": ["Wave Properties", "Sound", "Light", "Electromagnetic Spectrum", "Interference"],
          "Electricity & Magnetism": ["Electric Fields", "Circuits", "Magnetic Fields", "Electromagnetic Induction"],
          "Modern Physics": ["Quantum Physics", "Nuclear Physics", "Particle Physics", "Special Relativity"]
        }
      },
      "Section A": {
        name: "Short Questions",
        sections: ["Mechanics", "Heat", "Waves"],
        topics: {
          "Problem Solving": ["Numerical Problems", "Conceptual Questions", "Data Analysis"],
          "Experimental Skills": ["Experimental Design", "Measurement", "Analysis of Results"]
        }
      },
      "Section B": {
        name: "Long Questions",
        sections: ["Electricity & Magnetism", "Modern Physics", "Applied Physics"],
        topics: {
          "Extended Response": ["Theory Application", "Comprehensive Analysis", "Problem Solving"],
          "Real-World Applications": ["Technology", "Industry", "Healthcare", "Energy"]
        }
      }
    },
    levels: ["Higher Level", "Ordinary Level"]
  },
  
  // Practical Subject Example: Engineering
  {
    name: 'engineering',
    path: 'src/data/subjects/engineering/index.ts',
    papers: {
      "Both": {
        name: "All Components",
        sections: ["Materials", "Mechanics", "Manufacturing", "Design"],
        topics: {
          "Materials Science": ["Properties", "Testing", "Selection", "Processing"],
          "Engineering Mechanics": ["Statics", "Dynamics", "Strength of Materials", "Fluid Mechanics"],
          "Manufacturing Technology": ["Processes", "Quality Control", "Automation", "Sustainability"],
          "Design Process": ["Analysis", "Creative Solutions", "Modeling", "Evaluation"]
        }
      },
      "Paper 1": {
        name: "Theory Paper",
        sections: ["Materials", "Mechanics", "Manufacturing", "Design"],
        topics: {
          "Knowledge and Understanding": ["Definitions", "Principles", "Concepts"],
          "Analysis and Application": ["Problem Solving", "Case Studies", "Calculations"]
        }
      },
      "Paper 2": {
        name: "Practical Paper",
        sections: ["Project Work", "Applied Engineering", "Problem Solving"],
        topics: {
          "Technical Drawing": ["Orthographic Projection", "Dimensioning", "Assembly Drawings"],
          "Practical Skills": ["Tools and Equipment", "Workshop Procedures", "Health and Safety"],
          "Project Management": ["Planning", "Implementation", "Evaluation"]
        }
      }
    },
    levels: ["Higher Level", "Ordinary Level"]
  },
  
  // Arts Subject Example: Music
  {
    name: 'music',
    path: 'src/data/subjects/music/index.ts',
    papers: {
      "Both": {
        name: "All Components",
        sections: ["Listening", "Composing", "Performing"],
        topics: {
          "Music Theory": ["Notation", "Harmony", "Structure", "Terminology"],
          "Music History": ["Western Art Music", "Irish Traditional Music", "Popular Music", "World Music"],
          "Performance Skills": ["Technical Ability", "Interpretation", "Expression", "Ensemble Playing"]
        }
      },
      "Paper 1": {
        name: "Listening",
        sections: ["Set Works", "Irish Music", "General Listening"],
        topics: {
          "Analysis Skills": ["Form and Structure", "Instrumentation", "Style and Genre", "Context"],
          "Aural Skills": ["Dictation", "Identification", "Comparison", "Evaluation"]
        }
      },
      "Paper 2": {
        name: "Composing",
        sections: ["Melody Writing", "Harmony", "Counterpoint"],
        topics: {
          "Compositional Techniques": ["Melody", "Harmony", "Rhythm", "Texture"],
          "Style-Based Composition": ["Classical", "Popular", "Traditional", "Contemporary"]
        }
      },
      "Practical": {
        name: "Performing",
        sections: ["Solo Performance", "Group Performance", "Music Technology"],
        topics: {
          "Performance Preparation": ["Practice Techniques", "Repertoire Selection", "Stage Presence"],
          "Technical Skills": ["Instrumental/Vocal Technique", "Sight Reading", "Improvisation"]
        }
      }
    },
    levels: ["Higher Level", "Ordinary Level"]
  }
];

// Function to run the script
const updateSubjectStructures = () => {
  subjectsToUpdate.forEach(subject => {
    try {
      const filePath = path.join(process.cwd(), subject.path);
      const content = createSubjectTemplate(subject.name, subject.papers, subject.levels);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${subject.name}`);
    } catch (error) {
      console.error(`❌ Error updating ${subject.name}:`, error.message);
    }
  });
  console.log('Subject structure update process completed.');
};

// Run the script
updateSubjectStructures(); 