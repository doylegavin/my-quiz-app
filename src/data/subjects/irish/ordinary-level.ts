import { LevelData } from '../types';

const irishOrdinaryLevel: LevelData = {
  irish: {
    papers: {
      "Paper 1": {
        name: "Paper 1",
        sections: ["Oral Examination", "Listening Comprehension", "Written Composition"],
        topics: {
          "Oral Examination": [
            "General Conversation",
            "Role Play",
            "Picture Sequence",
            "Project Discussion",
            "Basic Reading"
          ],
          "Listening Comprehension": [
            "Simple News Items",
            "Advertisements",
            "Basic Conversations",
            "Announcements",
            "Simple Interviews",
            "Weather Reports"
          ],
          "Reading Comprehension": [
            "Simple Literary Extracts",
            "Basic Journalistic Texts",
            "Letters",
            "Advertisements",
            "Informative Texts",
            "Narrative Texts"
          ],
          "Composition": [
            "Short Essay",
            "Story",
            "Informal Letter",
            "Dialogue",
            "Simple Review",
            "Article for School Magazine",
            "Personal Writing"
          ]
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Prose", "Poetry", "Additional Literature"],
        topics: {
          "Poetry": [
            "Prescribed Poetry",
            "Basic Poetic Techniques",
            "Main Themes",
            "Imagery",
            "Personal Response"
          ],
          "Prose": [
            "Short Story",
            "Novel Extracts",
            "Character Analysis",
            "Basic Literary Techniques",
            "Main Themes",
            "Personal Response"
          ],
          "Additional Literature": [
            "An Triail",
            "A Thig Ná Tit Orm",
            "Cáca Milis",
            "Hurlamaboc"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default irishOrdinaryLevel; 