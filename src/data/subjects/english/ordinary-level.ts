import { LevelData } from '../types';

const englishOrdinaryLevel: LevelData = {
  english: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Comprehending", "Composing"],
        topics: {
          "Comprehending": [
            "Visual Texts",
            "Literary Texts",
            "Basic Rhetorical Analysis",
            "Key Stylistic Features",
            "Text Interpretation",
            "Audience and Purpose",
            "Language Analysis",
            "Media Texts"
          ],
          "Composing": [
            "Personal Essay",
            "Short Story",
            "Letter/Email",
            "Diary Entry",
            "Descriptive Writing",
            "Narrative Writing",
            "Speech Writing",
            "Review",
            "Article"
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
            "Basic Poetic Techniques",
            "Imagery",
            "Themes and Messages",
            "Poet's Purpose",
            "Personal Response"
          ],
          "Drama": [
            "Main Characters",
            "Key Themes",
            "Setting",
            "Basic Dramatic Techniques",
            "Key Scenes",
            "Key Relationships",
            "Social Context"
          ],
          "Novel": [
            "Main Characters",
            "Plot Development",
            "Key Themes",
            "Setting",
            "Basic Narrative Techniques",
            "Key Scenes",
            "Social Context"
          ],
          "Comparative Study": [
            "Cultural Context",
            "General Vision and Viewpoint",
            "Literary Genre",
            "Theme or Issue",
            "Basic Comparative Techniques",
            "Character Analysis"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default englishOrdinaryLevel; 