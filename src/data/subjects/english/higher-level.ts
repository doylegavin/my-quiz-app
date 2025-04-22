import { LevelData } from '../types';

const englishHigherLevel: LevelData = {
  english: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Comprehending", "Composing"],
        topics: {
          "Comprehending": [
            "Visual Texts",
            "Literary Texts",
            "Rhetorical Analysis",
            "Stylistic Features",
            "Comparative Analysis",
            "Critical Analysis",
            "Language and Style",
            "Author's Purpose",
            "Audience Awareness"
          ],
          "Composing": [
            "Personal Essay",
            "Short Story",
            "Speech",
            "Debate",
            "Formal Letter/Email",
            "Diary Entry",
            "Descriptive Writing",
            "Discursive Writing",
            "Narrative Writing",
            "Persuasive Writing"
          ]
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Single Text", "Comparative Study", "Poetry"],
        topics: {
          "Poetry": [
            "Prescribed Poetry",
            "Unseen Poetry",
            "Poetic Techniques",
            "Tone and Mood",
            "Imagery",
            "Symbolism",
            "Rhyme and Rhythm",
            "Structure and Form",
            "Themes and Concerns",
            "Poetic Voice",
            "Cultural Context"
          ],
          "Drama": [
            "Characterization",
            "Themes and Issues",
            "Setting",
            "Dramatic Techniques",
            "Language and Style",
            "Stagecraft",
            "Social/Political/Cultural Context",
            "Key Scenes",
            "Dramatic Tension"
          ],
          "Novel": [
            "Characterization",
            "Plot and Structure",
            "Themes and Issues",
            "Setting",
            "Narrative Techniques",
            "Language and Style",
            "Social/Political/Cultural Context",
            "Key Scenes",
            "Symbolism and Motifs"
          ],
          "Comparative Study": [
            "Cultural Context",
            "General Vision and Viewpoint",
            "Literary Genre",
            "Theme or Issue",
            "Comparative Techniques",
            "Character Relationships",
            "Cross-text Connections",
            "Social Commentary"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default englishHigherLevel; 