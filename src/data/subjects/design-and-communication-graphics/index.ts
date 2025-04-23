import higherLevel from './higher-level';
import ordinaryLevel from './ordinary-level';

export const designandcommunicationgraphics = {
  papers: {
    "Both": {
      name: "All Components",
      sections: ["Plane and Descriptive Geometry", "Communication of Design", "Computer Graphics"],
      topics: {}
    },
    "Paper 1": {
      name: "Short Answer Questions",
      sections: ["Plane Geometry", "Solid Geometry", "Projection Systems", "Descriptive Geometry"],
      topics: {}
    },
    "Paper 2": {
      name: "Long Answer Questions",
      sections: ["Building Applications", "Engineering Applications", "Communication of Design"],
      topics: {}
    },
    "Project": {
      name: "Student Assignment",
      sections: ["Design Brief", "Research and Analysis", "Design Development", "Communication Graphics"],
      topics: {}
    }
  },
  difficulty: ["Random", "Easy", "Medium", "Hard"],
  levels: ["Higher Level", "Ordinary Level"]
};

export { higherLevel, ordinaryLevel };