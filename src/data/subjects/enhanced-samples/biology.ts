/**
 * Enhanced Biology subject data
 * This file provides rich metadata for the Biology subject in the enhanced format
 */

import { EnhancedSubject } from '@/data/subjects/enhanced-types';

const enhancedBiology: EnhancedSubject = {
  name: "Biology",
  description: "The study of living organisms, their structure, function, growth, origin, evolution, and distribution.",
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  keywords: ["biology", "life science", "organisms", "living", "cells", "ecology", "genetics"],
  relatedSubjects: ["chemistry", "physics", "agricultural-science"],
  levels: {
    "Higher Level": {
      name: "Higher Level",
      description: "Higher level biology covers advanced concepts in cellular biology, genetics, and ecology.",
      papers: {
        "Paper 1": {
          name: "Paper 1",
          description: "Short questions and structured questions covering the full syllabus.",
          sections: ["Section A", "Section B", "Section C"],
          topics: {
            "Cell Biology": {
              name: "Cell Biology",
              description: "The study of cell structure and function.",
              keywords: ["cells", "organelles", "mitosis", "meiosis", "cell membrane"],
              subtopics: [
                { 
                  name: "Cell Structure and Function", 
                  keywords: ["organelles", "cytoplasm", "nucleus", "cell membrane"],
                  description: "Study of cell components and their roles."
                },
                { 
                  name: "Cell Division", 
                  keywords: ["mitosis", "meiosis", "chromosomes", "cell cycle"],
                  description: "Study of how cells reproduce and divide."
                },
                { 
                  name: "Cell Metabolism", 
                  keywords: ["respiration", "photosynthesis", "enzymes"],
                  description: "Biochemical processes within cells."
                }
              ]
            },
            "Human Physiology": {
              name: "Human Physiology",
              description: "The study of how the human body works.",
              keywords: ["organs", "systems", "homeostasis", "hormones"],
              subtopics: [
                { 
                  name: "Circulatory System", 
                  keywords: ["heart", "blood vessels", "blood", "circulation"],
                  description: "Structure and function of the heart and blood vessels."
                },
                { 
                  name: "Respiratory System", 
                  keywords: ["lungs", "breathing", "gas exchange", "respiration"],
                  description: "Study of breathing and gas exchange."
                },
                { 
                  name: "Digestive System", 
                  keywords: ["digestion", "enzymes", "absorption", "nutrients"],
                  description: "Process of food breakdown and nutrient absorption."
                },
                { 
                  name: "Nervous System", 
                  keywords: ["brain", "nerves", "neurons", "synapses", "reflexes"],
                  description: "Neural communication and processing."
                }
              ]
            },
            "Genetics": {
              name: "Genetics",
              description: "The study of genes, heredity, and variation.",
              keywords: ["genes", "DNA", "RNA", "inheritance", "mutation"],
              subtopics: [
                { 
                  name: "Mendelian Genetics", 
                  keywords: ["inheritance", "alleles", "dominant", "recessive"],
                  description: "Basic principles of inheritance."
                },
                { 
                  name: "Molecular Genetics", 
                  keywords: ["DNA", "RNA", "transcription", "translation"],
                  description: "Structure and function of genetic material."
                },
                { 
                  name: "Genetic Engineering", 
                  keywords: ["biotechnology", "cloning", "GMO", "CRISPR"],
                  description: "Manipulation of genetic material for various applications."
                }
              ]
            },
            "Ecology": {
              name: "Ecology",
              description: "The study of interactions between organisms and their environment.",
              keywords: ["ecosystem", "habitat", "population", "community", "biodiversity"],
              subtopics: [
                { 
                  name: "Ecosystems", 
                  keywords: ["biotic", "abiotic", "energy flow", "food webs"],
                  description: "Study of ecological communities and their environment."
                },
                { 
                  name: "Population Dynamics", 
                  keywords: ["growth", "density", "competition", "predation"],
                  description: "Factors affecting population size and distribution."
                },
                { 
                  name: "Conservation Biology", 
                  keywords: ["biodiversity", "preservation", "extinction", "habitat loss"],
                  description: "Protection and management of biological resources."
                }
              ]
            },
            "Evolution": {
              name: "Evolution",
              description: "The study of changes in organisms over time.",
              keywords: ["natural selection", "adaptation", "speciation", "Darwin"],
              subtopics: [
                { 
                  name: "Natural Selection", 
                  keywords: ["survival", "fitness", "adaptation", "selection pressure"],
                  description: "The mechanism of evolutionary change."
                },
                { 
                  name: "Evidence for Evolution", 
                  keywords: ["fossil record", "comparative anatomy", "genetics", "biogeography"],
                  description: "Scientific support for evolutionary theory."
                },
                { 
                  name: "Human Evolution", 
                  keywords: ["hominids", "Homo sapiens", "ancestry", "primates"],
                  description: "The evolutionary history of humans."
                }
              ]
            }
          }
        },
        "Paper 2": {
          name: "Paper 2",
          description: "Extended response questions on specific areas of the syllabus.",
          sections: ["Section A", "Section B"],
          topics: {
            "Practical Activities": {
              name: "Practical Activities",
              description: "Laboratory and fieldwork investigations.",
              keywords: ["experiments", "investigation", "observation", "data collection"],
              subtopics: [
                { 
                  name: "Laboratory Techniques", 
                  keywords: ["microscopy", "dissection", "culture", "staining"],
                  description: "Methods used in biological investigations."
                },
                { 
                  name: "Experimental Design", 
                  keywords: ["variables", "controls", "hypothesis", "methodology"],
                  description: "Planning and conducting biological experiments."
                },
                { 
                  name: "Data Analysis", 
                  keywords: ["statistics", "graphs", "interpretation", "results"],
                  description: "Processing and analyzing experimental data."
                }
              ]
            },
            "Applied Biology": {
              name: "Applied Biology",
              description: "Applications of biological knowledge in various fields.",
              keywords: ["biotechnology", "agriculture", "medicine", "environment"],
              subtopics: [
                { 
                  name: "Biotechnology", 
                  keywords: ["fermentation", "genetic engineering", "microbiology"],
                  description: "Application of biological processes for practical purposes."
                },
                { 
                  name: "Environmental Management", 
                  keywords: ["sustainability", "conservation", "pollution", "remediation"],
                  description: "Managing ecosystems and natural resources."
                },
                { 
                  name: "Medical Applications", 
                  keywords: ["pharmacology", "pathology", "immunology", "therapy"],
                  description: "Biological aspects of human health and disease."
                }
              ]
            }
          }
        }
      }
    },
    "Ordinary Level": {
      name: "Ordinary Level",
      description: "Ordinary level biology covers fundamental concepts with less depth than Higher Level.",
      papers: {
        "Paper 1": {
          name: "Paper 1",
          description: "Short questions and structured questions covering the full syllabus.",
          sections: ["Section A", "Section B"],
          topics: {
            "Basic Cell Biology": {
              name: "Basic Cell Biology",
              description: "Introduction to cells and their functions.",
              keywords: ["cells", "organelles", "cell types"],
              subtopics: [
                { 
                  name: "Cell Structure", 
                  keywords: ["animal cell", "plant cell", "organelles"],
                  description: "Basic components of cells."
                },
                { 
                  name: "Cell Processes", 
                  keywords: ["diffusion", "osmosis", "active transport"],
                  description: "How materials move in and out of cells."
                }
              ]
            },
            "Human Biology": {
              name: "Human Biology",
              description: "Study of human body systems and health.",
              keywords: ["anatomy", "physiology", "health"],
              subtopics: [
                { 
                  name: "Digestive System", 
                  keywords: ["digestion", "enzymes", "nutrition"],
                  description: "How food is processed in the body."
                },
                { 
                  name: "Respiratory System", 
                  keywords: ["breathing", "lungs", "gas exchange"],
                  description: "How we breathe and exchange gases."
                }
              ]
            },
            "Basic Genetics": {
              name: "Basic Genetics",
              description: "Introduction to heredity and variation.",
              keywords: ["inheritance", "genes", "traits"],
              subtopics: [
                { 
                  name: "Inheritance", 
                  keywords: ["dominant", "recessive", "punnett squares"],
                  description: "How traits are passed from parents to offspring."
                },
                { 
                  name: "DNA Structure", 
                  keywords: ["nucleotides", "double helix", "genes"],
                  description: "The basic structure of genetic material."
                }
              ]
            }
          }
        }
      }
    }
  }
};

export default enhancedBiology; 