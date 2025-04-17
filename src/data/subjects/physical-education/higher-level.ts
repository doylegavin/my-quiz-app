import { LevelData } from '../types';

const physicalEducationHigherLevel: LevelData = {
  physicalEducation: {
    papers: {
      "Strand 1": {
        name: "Strand 1",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Physical Activity and Health": [
            "Health Benefits of Physical Activity",
            "Physical Activity Guidelines",
            "Health-Related Fitness Components",
            "Skill-Related Fitness Components",
            "Fitness Testing",
            "Training Principles",
            "Training Methods"
          ],
          "Sports Psychology": [
            "Motivation",
            "Attribution Theory",
            "Goal Setting",
            "Self-Efficacy",
            "Confidence",
            "Arousal and Performance",
            "Stress Management Techniques"
          ],
          "Biomechanics": [
            "Movement Analysis",
            "Linear Motion",
            "Angular Motion",
            "Projectile Motion",
            "Forces",
            "Levers",
            "Balance and Stability"
          ],
          "Performance Analysis": [
            "Skill Acquisition",
            "Learning Theories",
            "Stages of Learning",
            "Practice Methods",
            "Feedback",
            "Transfer of Learning"
          ],
          "Sociocultural Aspects": [
            "Sport in Society",
            "Physical Activity Participation",
            "Barriers to Participation",
            "Sport Policy",
            "Ethics in Sport",
            "Inclusivity",
            "Media and Sport"
          ]
        }
      },
      "Strand 2": {
        name: "Strand 2",
        sections: ["Short Questions", "Long Questions"],
        topics: {
          "Personal Performance": [
            "Activity Selection",
            "Personal Development Plan",
            "Skill Development",
            "Performance Analysis",
            "Training Log",
            "Reflection and Evaluation"
          ],
          "Practical Application": [
            "Technical Execution",
            "Tactical Understanding",
            "Decision Making",
            "Rules and Regulations",
            "Fair Play",
            "Teamwork",
            "Leadership"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default physicalEducationHigherLevel; 