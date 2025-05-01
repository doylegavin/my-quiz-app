/**
 * Enhanced Physics subject data
 * This file provides rich metadata for the Physics subject in the enhanced format
 */

import { EnhancedSubject } from '@/data/subjects/enhanced-types';

const enhancedPhysics: EnhancedSubject = {
  name: "Physics",
  description: "The study of matter, energy, and the interaction between them through space and time.",
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  keywords: ["physics", "mechanics", "energy", "waves", "electricity", "magnetism", "quantum"],
  relatedSubjects: ["mathematics", "chemistry", "applied-mathematics"],
  levels: {
    "Higher Level": {
      name: "Higher Level",
      description: "Higher level physics covers advanced concepts in mechanics, electricity, and modern physics.",
      papers: {
        "Paper 1": {
          name: "Paper 1",
          description: "Short questions and structured questions covering the full syllabus.",
          sections: ["Section A", "Section B"],
          topics: {
            "Mechanics": {
              name: "Mechanics",
              description: "The study of motion and forces.",
              keywords: ["motion", "forces", "energy", "momentum", "gravity"],
              subtopics: [
                { 
                  name: "Motion", 
                  keywords: ["kinematics", "velocity", "acceleration", "displacement"],
                  description: "Description of objects in motion."
                },
                { 
                  name: "Forces and Newton's Laws", 
                  keywords: ["newton's laws", "force", "inertia", "action-reaction"],
                  description: "Fundamental principles of dynamics."
                },
                { 
                  name: "Energy and Work", 
                  keywords: ["potential energy", "kinetic energy", "work", "power"],
                  description: "Energy transformation and conservation."
                },
                { 
                  name: "Momentum", 
                  keywords: ["impulse", "collisions", "conservation of momentum"],
                  description: "Principles of momentum in physical interactions."
                }
              ]
            },
            "Waves": {
              name: "Waves",
              description: "The study of wave phenomena including light and sound.",
              keywords: ["wavelength", "frequency", "amplitude", "interference", "diffraction"],
              subtopics: [
                { 
                  name: "Wave Properties", 
                  keywords: ["reflection", "refraction", "diffraction", "interference"],
                  description: "Fundamental properties of waves."
                },
                { 
                  name: "Sound Waves", 
                  keywords: ["pitch", "intensity", "doppler effect", "resonance"],
                  description: "Characteristics and behavior of sound."
                },
                { 
                  name: "Light and Optics", 
                  keywords: ["reflection", "refraction", "lenses", "mirrors", "color"],
                  description: "Properties of light and optical systems."
                },
                { 
                  name: "Electromagnetic Spectrum", 
                  keywords: ["radio waves", "infrared", "ultraviolet", "x-rays", "gamma rays"],
                  description: "Various forms of electromagnetic radiation."
                }
              ]
            },
            "Electricity and Magnetism": {
              name: "Electricity and Magnetism",
              description: "The study of electric charges, currents, and magnetic fields.",
              keywords: ["electric field", "current", "voltage", "magnetic field", "electromagnetic induction"],
              subtopics: [
                { 
                  name: "Electrostatics", 
                  keywords: ["charge", "electric field", "coulomb's law", "potential"],
                  description: "Study of stationary electric charges."
                },
                { 
                  name: "Electric Circuits", 
                  keywords: ["current", "voltage", "resistance", "ohm's law", "power"],
                  description: "Analysis of electric circuits and components."
                },
                { 
                  name: "Magnetism", 
                  keywords: ["magnetic field", "magnetic force", "electromagnets"],
                  description: "Properties and effects of magnetic fields."
                },
                { 
                  name: "Electromagnetic Induction", 
                  keywords: ["induction", "faraday's law", "transformers", "generators"],
                  description: "Generation of electricity through changing magnetic fields."
                }
              ]
            },
            "Modern Physics": {
              name: "Modern Physics",
              description: "Developments in physics since the early 20th century.",
              keywords: ["quantum", "relativity", "nucleus", "particles"],
              subtopics: [
                { 
                  name: "Quantum Physics", 
                  keywords: ["photoelectric effect", "wave-particle duality", "uncertainty principle"],
                  description: "Physics at the atomic and subatomic scale."
                },
                { 
                  name: "Special Relativity", 
                  keywords: ["relativity", "time dilation", "length contraction", "mass-energy"],
                  description: "Einstein's theory on motion near the speed of light."
                },
                { 
                  name: "Nuclear Physics", 
                  keywords: ["nucleus", "radioactivity", "half-life", "nuclear energy"],
                  description: "Structure and processes within atomic nuclei."
                },
                { 
                  name: "Particle Physics", 
                  keywords: ["standard model", "quarks", "leptons", "fundamental forces"],
                  description: "Study of fundamental particles and their interactions."
                }
              ]
            }
          }
        },
        "Paper 2": {
          name: "Paper 2",
          description: "Extended response questions focusing on experiments and practical applications.",
          sections: ["Section A", "Section B"],
          topics: {
            "Experimental Physics": {
              name: "Experimental Physics",
              description: "Laboratory investigations and experiments.",
              keywords: ["experiments", "measurements", "error analysis", "apparatus"],
              subtopics: [
                { 
                  name: "Measurement Techniques", 
                  keywords: ["precision", "accuracy", "uncertainty", "calibration"],
                  description: "Methods for taking accurate measurements."
                },
                { 
                  name: "Data Analysis", 
                  keywords: ["graphs", "errors", "statistics", "uncertainty"],
                  description: "Processing and analyzing experimental data."
                },
                { 
                  name: "Experimental Design", 
                  keywords: ["controls", "variables", "methodology", "apparatus"],
                  description: "Planning and conducting physics experiments."
                }
              ]
            },
            "Applied Physics": {
              name: "Applied Physics",
              description: "Applications of physics in technology and everyday life.",
              keywords: ["technology", "applications", "devices", "engineering"],
              subtopics: [
                { 
                  name: "Electronics", 
                  keywords: ["semiconductors", "transistors", "integrated circuits", "digital"],
                  description: "Electronic components and systems."
                },
                { 
                  name: "Medical Physics", 
                  keywords: ["imaging", "radiation therapy", "ultrasound", "MRI"],
                  description: "Physics applications in medicine and healthcare."
                },
                { 
                  name: "Energy Technology", 
                  keywords: ["renewable energy", "nuclear power", "efficiency", "sustainability"],
                  description: "Physics of energy production and utilization."
                }
              ]
            }
          }
        }
      }
    },
    "Ordinary Level": {
      name: "Ordinary Level",
      description: "Ordinary level physics covers fundamental concepts with less mathematical complexity.",
      papers: {
        "Paper 1": {
          name: "Paper 1",
          description: "Short questions and structured questions covering the full syllabus.",
          sections: ["Section A", "Section B"],
          topics: {
            "Basic Mechanics": {
              name: "Basic Mechanics",
              description: "Introduction to motion and forces.",
              keywords: ["motion", "forces", "energy", "simple machines"],
              subtopics: [
                { 
                  name: "Motion and Speed", 
                  keywords: ["velocity", "acceleration", "distance", "time"],
                  description: "Basic concepts of objects in motion."
                },
                { 
                  name: "Forces", 
                  keywords: ["push", "pull", "friction", "gravity"],
                  description: "Different types of forces and their effects."
                },
                { 
                  name: "Simple Machines", 
                  keywords: ["lever", "pulley", "inclined plane", "mechanical advantage"],
                  description: "Basic mechanical devices that multiply force."
                }
              ]
            },
            "Heat and Temperature": {
              name: "Heat and Temperature",
              description: "Thermal physics and heat transfer.",
              keywords: ["heat", "temperature", "conduction", "expansion"],
              subtopics: [
                { 
                  name: "Temperature Measurement", 
                  keywords: ["thermometer", "celsius", "kelvin", "thermal expansion"],
                  description: "How temperature is measured and its effects."
                },
                { 
                  name: "Heat Transfer", 
                  keywords: ["conduction", "convection", "radiation", "insulation"],
                  description: "Different methods of heat transfer."
                }
              ]
            },
            "Basic Electricity": {
              name: "Basic Electricity",
              description: "Fundamentals of electricity and simple circuits.",
              keywords: ["circuits", "current", "voltage", "resistance"],
              subtopics: [
                { 
                  name: "Electric Circuits", 
                  keywords: ["series", "parallel", "components", "power"],
                  description: "Basic circuit configurations and analysis."
                },
                { 
                  name: "Household Electricity", 
                  keywords: ["safety", "fuses", "appliances", "energy consumption"],
                  description: "Practical aspects of electrical systems in homes."
                }
              ]
            }
          }
        }
      }
    }
  }
};

export default enhancedPhysics; 