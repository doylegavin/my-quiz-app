import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const appliedmathematics = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Mechanics", "Differential Equations", "Probability", "Statistics"],
      topics: {}
    },
    "Section A": {
      name: "Mechanics - Motion",
      sections: ["Uniform Motion", "Projectiles", "Relative Velocity", "Differential Equations"],
      topics: {}
    },
    "Section B": {
      name: "Mechanics - Forces",
      sections: ["Newton's Laws", "Connected Particles", "Simple Harmonic Motion", "Collisions"],
      topics: {}
    },
    "Section C": {
      name: "Applied Mathematics",
      sections: ["Moments of Inertia", "Rigid Body Motion", "Hydrostatics", "Mathematical Modeling"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };