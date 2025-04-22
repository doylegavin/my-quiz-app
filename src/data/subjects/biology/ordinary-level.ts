import { LevelData } from '../types';

const biologyOrdinaryLevel: LevelData = {
  biology: {
    papers: {
      "Paper": {
        name: "Biology Paper",
        sections: ["Section A (Short Questions)", "Section B (Experiments)", "Section C (Long Questions)"],
        topics: {
          "Unit 1: Biology - The Study of Life": [
            "Scientific Method",
            "Characteristics of Life",
            "Nutrition",
            "Basic Ecology",
            "Food Chains and Webs",
            "Basic Ecological Techniques"
          ],
          "Unit 2: The Cell": [
            "Basic Cell Structure",
            "Cell Functions",
            "Cell Division",
            "Cell Types",
            "Simple Transport Mechanisms",
            "DNA and RNA"
          ],
          "Unit 3: The Organism": [
            "Classification",
            "Plant and Animal Structure",
            "Feeding and Digestion",
            "Breathing",
            "Blood Circulation",
            "Waste Removal",
            "Plant Responses",
            "Animal Responses",
            "Reproduction"
          ],
          "Experiments": [
            "Food Tests",
            "Enzyme Activity",
            "Photosynthesis",
            "Respiration",
            "Osmosis",
            "Plant Observation",
            "Germination",
            "Basic Dissection",
            "Habitat Study",
            "Microscopy"
          ],
          "Genetics": [
            "Basic Inheritance",
            "Dominant and Recessive Traits",
            "Sex Determination",
            "Common Genetic Disorders",
            "Introduction to Genetic Engineering"
          ],
          "Evolution": [
            "Darwin's Theory",
            "Natural Selection",
            "Adaptation",
            "Human Evolution"
          ],
          "Microbiology": [
            "Bacteria",
            "Viruses",
            "Useful Microorganisms",
            "Harmful Microorganisms",
            "Biotechnology Applications"
          ],
          "Human Systems": [
            "Digestive System",
            "Circulatory System",
            "Respiratory System",
            "Excretory System",
            "Nervous System",
            "Hormones",
            "Reproductive System"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default biologyOrdinaryLevel;