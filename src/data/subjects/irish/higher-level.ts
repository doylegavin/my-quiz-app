import { LevelData } from '../types';

const irishHigherLevel: LevelData = {
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
            "Reading Poetry",
            "Listening Comprehension (Oral)"
          ],
          "Listening Comprehension": [
            "News Items",
            "Advertisements",
            "Conversations",
            "Announcements",
            "Interviews",
            "Weather Reports",
            "Speeches"
          ],
          "Reading Comprehension": [
            "Literary Extracts",
            "Journalistic Texts",
            "Letters",
            "Advertisements",
            "Informative Texts",
            "Narrative Texts",
            "Descriptive Texts"
          ],
          "Composition": [
            "Essay",
            "Story",
            "Debate",
            "Letter",
            "Speech",
            "Dialogue",
            "Review",
            "Article for Magazine/Newspaper",
            "Discursive Writing"
          ]
        }
      },
      "Paper 2": {
        name: "Paper 2",
        sections: ["Prose", "Poetry", "Additional Literature"],
        topics: {
          "Poetry": [
            "Prescribed Poetry",
            "Unseen Poetry",
            "Poetic Techniques",
            "Themes and Motifs",
            "Cultural Context",
            "Language and Imagery",
            "Social and Historical Contexts"
          ],
          "Prose": [
            "Novel",
            "Short Story",
            "Autobiography",
            "Literary Techniques",
            "Character Analysis",
            "Theme Analysis",
            "Cultural Context",
            "Social and Historical Contexts"
          ],
          "Additional Literature": [
            "An Triail",
            "A Thig Ná Tit Orm",
            "Cáca Milis",
            "Clare sa Spéir",
            "Canary Wharf",
            "Hurlamaboc"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default irishHigherLevel; 