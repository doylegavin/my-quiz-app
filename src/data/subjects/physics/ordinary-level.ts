import { LevelData } from '../types';

const physicsOrdinaryLevel: LevelData = {
  physics: {
    papers: {
      "Paper": {
        name: "Physics Paper",
        sections: ["Section A (Experiments)", "Section B (Short Questions)", "Section C (Long Questions)"],
        topics: {
          "Mechanics": [
            "Scalars and Vectors",
            "Distance and Displacement",
            "Speed and Velocity",
            "Acceleration",
            "Newton's Laws of Motion",
            "Weight and Mass",
            "Momentum",
            "Conservation of Momentum",
            "Energy",
            "Work",
            "Power",
            "Simple Pendulum",
            "Density",
            "Pressure",
            "Archimedes' Principle"
          ],
          "Heat": [
            "Temperature",
            "Thermometers",
            "Heat Energy",
            "Specific Heat Capacity",
            "Latent Heat",
            "Conduction",
            "Convection",
            "Radiation",
            "Heat Transfer",
            "Gas Laws",
            "Simple Heat Engines"
          ],
          "Waves": [
            "Wave Motion",
            "Wave Characteristics",
            "Reflection",
            "Refraction",
            "Simple Diffraction",
            "Simple Interference",
            "Sound Waves",
            "Speed of Sound",
            "Echo",
            "Electromagnetic Spectrum"
          ],
          "Light": [
            "Reflection in Mirrors",
            "Refraction in Lenses",
            "Snell's Law",
            "Total Internal Reflection",
            "Converging Lens",
            "Diverging Lens",
            "Simple Optical Instruments",
            "Color"
          ],
          "Electricity": [
            "Static Electricity",
            "Current",
            "Voltage",
            "Resistance",
            "Ohm's Law",
            "Series and Parallel Circuits",
            "Electrical Power",
            "Electrical Energy",
            "Household Electricity",
            "Safety Features"
          ],
          "Electromagnetism": [
            "Magnets",
            "Magnetic Fields",
            "Magnetic Force",
            "Electromagnets",
            "Electromagnetic Induction",
            "Simple Motors",
            "Simple Generators",
            "Transformers"
          ],
          "Modern Physics": [
            "Atomic Structure",
            "Radioactivity",
            "Alpha, Beta, and Gamma Radiation",
            "Half-life",
            "Nuclear Fission",
            "Nuclear Fusion",
            "Radiation Safety",
            "Basic X-rays",
            "Basic Photoelectric Effect"
          ],
          "Electronic Systems": [
            "Conductors and Insulators",
            "Semiconductors",
            "Diodes",
            "LEDs",
            "Simple Electronic Circuits"
          ],
          "Mandatory Experiments": [
            "Simple Pendulum",
            "Measurement of g",
            "Verification of Boyle's Law",
            "Specific Heat Capacity",
            "Focal Length of a Lens",
            "Verification of Snell's Law",
            "Resistivity",
            "Verification of Ohm's Law",
            "Series and Parallel Circuits",
            "Force on a Current-Carrying Conductor",
            "Measurement of Wavelength of Light",
            "Speed of Sound in Air"
          ]
        }
      }
    },
    difficulty: ["Random", "Easy", "Medium", "Hard"],
    levels: ["Ordinary Level"]
  }
};

export default physicsOrdinaryLevel;