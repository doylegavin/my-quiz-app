import { LevelData } from '../types';

const biologyHigherLevel: LevelData = {
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
            "General Principles of Ecology",
            "Ecosystem Organization",
            "Ecology Techniques"
          ],
          "Unit 2: The Cell": [
            "Cell Structure",
            "Cell Metabolism",
            "Cell Division - Mitosis and Meiosis",
            "Cell Diversity",
            "Cell Growth and Development",
            "Transport Mechanisms",
            "Genetic Information"
          ],
          "Unit 3: The Organism": [
            "Diversity of Organisms",
            "Organisation of the Vascular Structures",
            "Transport and Nutrition",
            "Breathing System and Gas Exchange",
            "Circulation",
            "Excretion",
            "Responses and Coordination in Plants",
            "Homeostasis",
            "Responses and Coordination in Animals",
            "Reproduction and Growth"
          ],
          "Experiments": [
            "Food Tests",
            "Enzyme Activity",
            "Isolation of DNA",
            "Photosynthesis and Respiration",
            "Osmosis and Diffusion",
            "Transpiration",
            "Germination",
            "Dissection Techniques",
            "Habitat Study and Ecosystem Analysis",
            "Bacterial Growth",
            "Microscopy",
            "Enzyme Immobilization",
            "Micropropagation",
            "Selective Breeding"
          ],
          "Genetics": [
            "Mendel's Laws",
            "Monohybrid and Dihybrid Crosses",
            "Sex Determination",
            "Genetic Disorders",
            "Genetic Engineering",
            "Gene Technology",
            "Applications of Genetics"
          ],
          "Evolution": [
            "Darwin's Theory",
            "Evidence for Evolution",
            "Natural Selection",
            "Speciation",
            "Human Evolution",
            "Modern Synthesis"
          ],
          "Microbiology": [
            "Bacterial Structure",
            "Viral Structure",
            "Microbial Growth",
            "Industrial Applications",
            "Pathogenic Microorganisms",
            "Biotechnology"
          ],
          "Plant Physiology": [
            "Plant Tissues",
            "Transport in Plants",
            "Plant Nutrition",
            "Plant Hormones",
            "Plant Reproduction",
            "Tropisms"
          ],
          "Human Physiology": [
            "Digestive System",
            "Circulatory System",
            "Respiratory System",
            "Excretory System",
            "Nervous System",
            "Endocrine System",
            "Immune System",
            "Reproductive System"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Higher Level"]
  }
};

export default biologyHigherLevel;