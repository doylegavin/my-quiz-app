import { LevelData } from '../types';

const artOrdinaryLevel: LevelData = {
  art: {
    papers: {
      "Section 1": {
        name: "Art History and Appreciation",
        sections: ["Irish Art", "European Art", "Art Appreciation"],
        topics: {
          "Irish Art": [
            "Celtic Art and Artifacts",
            "Early Christian Art in Ireland",
            "Book of Kells and Illuminated Manuscripts",
            "19th Century Irish Art",
            "20th Century Irish Artists",
            "Notable Irish Buildings and Monuments",
            "Irish Crafts and Design"
          ],
          "European Art": [
            "Ancient Greek and Roman Art",
            "Medieval Art",
            "Renaissance Art",
            "Impressionism",
            "Modern Art Movements",
            "Famous European Artists",
            "European Architecture"
          ],
          "Art Appreciation": [
            "Elements of Art (Line, Shape, Color)",
            "Principles of Design",
            "Analyzing Artworks",
            "Art in Society",
            "Gallery and Museum Visits",
            "Visual Culture and Media",
            "Public Art"
          ]
        }
      },
      "Section 2": {
        name: "Practical Coursework",
        sections: ["Life Drawing", "Still Life", "Imaginative Composition", "Design"],
        topics: {
          "Life Drawing": [
            "Basic Figure Drawing",
            "Portraiture",
            "Proportion and Scale",
            "Gesture Drawing",
            "Tonal Studies",
            "Drawing Techniques"
          ],
          "Still Life": [
            "Composition Basics",
            "Object Studies",
            "Light and Shadow",
            "Color and Texture",
            "Perspective Drawing",
            "Still Life Arrangements"
          ],
          "Imaginative Composition": [
            "Developing Ideas",
            "Visual Storytelling",
            "Personal Expression",
            "Theme-Based Artwork",
            "Mixed Media Exploration",
            "Compositional Techniques"
          ],
          "Design": [
            "Graphic Design Basics",
            "Typography",
            "Logo Design",
            "Poster Design",
            "Packaging Design",
            "Color in Design"
          ]
        }
      },
      "Section 3": {
        name: "Practical Examination",
        sections: ["Drawing", "Painting", "Craft", "Design"],
        topics: {
          "Drawing": [
            "Linear Drawing",
            "Tonal Studies",
            "Texture in Drawing",
            "Perspective",
            "Observation Drawing",
            "Mark-Making Techniques"
          ],
          "Painting": [
            "Color Mixing",
            "Watercolor Techniques",
            "Acrylic Painting",
            "Brushwork",
            "Painting Composition",
            "Expressive Painting"
          ],
          "Craft": [
            "Basic Ceramics",
            "Simple Printmaking",
            "Textile Work",
            "Paper Craft",
            "3D Construction",
            "Mixed Media"
          ],
          "Design": [
            "Design Process",
            "Functional Design",
            "Visual Communication",
            "Material Studies",
            "Design Presentation",
            "Problem-Solving in Design"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default artOrdinaryLevel;