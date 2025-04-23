import { LevelData } from '../types';

const artHigherLevel: LevelData = {
  art: {
    papers: {
      "Both": {
        name: "All Papers",
        sections: ["Art History and Appreciation", "Practical Coursework", "Practical Examination"],
        topics: {
          "General Art Concepts": [
            "Elements and Principles of Art",
            "Advanced Color Theory",
            "Composition and Visual Dynamics",
            "Critical Analysis of Artworks",
            "Contemporary Art Practices"
          ]
        }
      },
      "Art History": {
        name: "Art History and Appreciation",
        sections: ["Irish Art", "European Art", "Art Appreciation", "International Art"],
        topics: {
          "Irish Art": [
            "Prehistoric and Celtic Art",
            "Early Christian Art in Ireland",
            "Book of Kells and Illuminated Manuscripts",
            "18th and 19th Century Irish Art",
            "Modernism in Irish Art",
            "Contemporary Irish Artists",
            "Irish Architecture and Public Art",
            "The Arts and Crafts Movement in Ireland"
          ],
          "European Art": [
            "Classical Antiquity (Greek and Roman)",
            "Medieval Art and Gothic Architecture",
            "Renaissance Masters and Techniques",
            "Baroque and Rococo Periods",
            "Romanticism and Neoclassicism",
            "Impressionism and Post-Impressionism",
            "Early 20th Century Movements",
            "Modernism and Postmodernism"
          ],
          "Art Appreciation": [
            "Formal Analysis of Artworks",
            "Contextual Studies",
            "Visual Literacy",
            "Meaning and Symbolism",
            "Art Criticism Methods",
            "Comparative Analysis",
            "Gallery and Exhibition Design",
            "Conservation and Curation"
          ],
          "International Art": [
            "Non-Western Art Traditions",
            "Asian Art and Aesthetics",
            "African and Indigenous Art",
            "Global Contemporary Art",
            "Cross-Cultural Influences",
            "Art and Identity",
            "Post-Colonial Perspectives",
            "Digital and New Media Art"
          ]
        }
      },
      "Practical Coursework": {
        name: "Practical Coursework",
        sections: ["Development Work", "Completed Artwork", "Research"],
        topics: {
          "Imaginative Composition": [
            "Concept Development and Research",
            "Advanced Composition Techniques",
            "Narrative and Thematic Approaches",
            "Personal Style Development",
            "Mixed Media Experimentation",
            "Contemporary Contextual References",
            "Process Documentation",
            "Critical Self-Reflection"
          ],
          "Design": [
            "Design Thinking and Methodology",
            "Typography and Layout",
            "Brand Identity Systems",
            "User Experience Design",
            "Information Design",
            "Sustainable Design Practices",
            "Design for Social Change",
            "Digital Design Technologies"
          ],
          "Craftwork": [
            "Advanced Ceramics Techniques",
            "Textile Art and Design",
            "Printmaking Methods",
            "Sculpture and 3D Construction",
            "Installation and Site-Specific Work",
            "Traditional Craft in Contemporary Context",
            "Material Experimentation",
            "Functional vs. Conceptual Craft"
          ]
        }
      },
      "Practical Examination": {
        name: "Practical Examination",
        sections: ["Life Drawing", "Still Life", "Craft"],
        topics: {
          "Life Drawing": [
            "Advanced Figure Drawing",
            "Anatomical Studies",
            "Movement and Gesture",
            "Expression and Emotion",
            "Stylistic Approaches to Figure",
            "Mixed Media Figure Work",
            "Contemporary Figure Representation",
            "Cultural Perspectives on the Figure"
          ],
          "Still Life": [
            "Complex Composition",
            "Linear and Aerial Perspective",
            "Material and Texture Rendering",
            "Light, Shadow and Reflection",
            "Color Harmony and Relationships",
            "Symbolism in Still Life",
            "Contemporary Still Life Approaches",
            "Mixed Media Techniques"
          ],
          "Craft Examination": [
            "Advanced Material Understanding",
            "Innovative Construction Methods",
            "Surface Treatment and Decoration",
            "Form and Function Relationships",
            "Cultural and Historical References",
            "Sustainable Craft Practices",
            "Integration of Digital and Traditional Methods",
            "Conceptual Development in Craft"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default artHigherLevel;