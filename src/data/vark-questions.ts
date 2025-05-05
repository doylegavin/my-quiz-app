export interface VARKQuestion {
  id: number;
  question: string;
  options: {
    type: 'V' | 'A' | 'R' | 'K'; // Visual, Auditory, Reading/Writing, Kinesthetic
    text: string;
  }[];
}

export const varkQuestions: VARKQuestion[] = [
  {
    id: 1,
    question: "When learning something new, I prefer to:",
    options: [
      { type: 'V', text: "See visual aids like diagrams, images, or videos" },
      { type: 'A', text: "Listen to someone explain it to me" },
      { type: 'R', text: "Read written instructions or information" },
      { type: 'K', text: "Try it out hands-on and learn by doing" }
    ]
  },
  {
    id: 2,
    question: "When trying to solve a problem, I'm most likely to:",
    options: [
      { type: 'K', text: "Use a trial-and-error approach" },
      { type: 'V', text: "Create a mental picture or visualization of the solution" },
      { type: 'R', text: "Write down all the facts and information" },
      { type: 'A', text: "Talk through the problem with someone else" }
    ]
  },
  {
    id: 3,
    question: "When giving directions to someone, I usually:",
    options: [
      { type: 'R', text: "Write down detailed instructions" },
      { type: 'K', text: "Go with them and physically show the way" },
      { type: 'V', text: "Draw a map or picture" },
      { type: 'A', text: "Explain verbally using landmarks" }
    ]
  },
  {
    id: 4,
    question: "When I'm learning a new skill, I prefer:",
    options: [
      { type: 'A', text: "Listen to an expert explain how to do it" },
      { type: 'K', text: "Jump in and try it myself" },
      { type: 'V', text: "Watch someone demonstrate it first" },
      { type: 'R', text: "Read a manual or instructions" }
    ]
  },
  {
    id: 5,
    question: "If I need to remember something, it helps me to:",
    options: [
      { type: 'V', text: "Visualize it in my mind" },
      { type: 'R', text: "Write it down and review my notes" },
      { type: 'K', text: "Act it out or physically recreate it" },
      { type: 'A', text: "Repeat it out loud several times" }
    ]
  },
  {
    id: 6,
    question: "When I'm shopping for clothes, I tend to:",
    options: [
      { type: 'K', text: "Try on the clothes and see how they feel" },
      { type: 'V', text: "Look at how they appear on me in the mirror" },
      { type: 'A', text: "Discuss options with the sales associate" },
      { type: 'R', text: "Read product descriptions and reviews" }
    ]
  },
  {
    id: 7,
    question: "In my free time, I enjoy:",
    options: [
      { type: 'A', text: "Listening to podcasts or music" },
      { type: 'R', text: "Reading books or articles" },
      { type: 'V', text: "Watching videos or looking at images" },
      { type: 'K', text: "Playing sports or doing hands-on activities" }
    ]
  },
  {
    id: 8,
    question: "When I need to explain a complicated topic to someone, I usually:",
    options: [
      { type: 'V', text: "Create a diagram or use visual examples" },
      { type: 'K', text: "Demonstrate it with objects or physical examples" },
      { type: 'R', text: "Write out an explanation with detailed points" },
      { type: 'A', text: "Explain it verbally with analogies" }
    ]
  },
  {
    id: 9,
    question: "When following a new recipe, I prefer to:",
    options: [
      { type: 'R', text: "Read and follow detailed written instructions" },
      { type: 'V', text: "Look at pictures or watch a video of each step" },
      { type: 'K', text: "Use my intuition and previous cooking experience" },
      { type: 'A', text: "Have someone talk me through the process" }
    ]
  },
  {
    id: 10,
    question: "When I'm in a new place, I usually find my way by:",
    options: [
      { type: 'A', text: "Asking for verbal directions" },
      { type: 'V', text: "Looking at a map or visual landmarks" },
      { type: 'K', text: "Walking around and getting a feel for the place" },
      { type: 'R', text: "Following written directions or using a GPS with text" }
    ]
  },
  {
    id: 11,
    question: "When I'm concentrating, I'm most distracted by:",
    options: [
      { type: 'A', text: "Background noise or conversations" },
      { type: 'V', text: "Movement or visual activity in my surroundings" },
      { type: 'K', text: "Uncomfortable seating or physical discomfort" },
      { type: 'R', text: "Disorganized or unclear written materials" }
    ]
  },
  {
    id: 12,
    question: "When assembling furniture or equipment, I prefer to:",
    options: [
      { type: 'K', text: "Dive in and figure it out as I go" },
      { type: 'V', text: "Follow the diagrams or pictures" },
      { type: 'R', text: "Read the written instructions step by step" },
      { type: 'A', text: "Call customer service for verbal guidance" }
    ]
  },
  {
    id: 13,
    question: "When teaching someone something new, I tend to:",
    options: [
      { type: 'A', text: "Explain it verbally and answer their questions" },
      { type: 'R', text: "Provide written instructions or resources" },
      { type: 'V', text: "Show them diagrams or demonstrate visually" },
      { type: 'K', text: "Guide them through doing it themselves" }
    ]
  },
  {
    id: 14,
    question: "When deciding which movie to watch, I'm most influenced by:",
    options: [
      { type: 'V', text: "Trailers or visual elements like cinematography" },
      { type: 'R', text: "Written reviews and plot summaries" },
      { type: 'A', text: "Recommendations from friends or podcasts" },
      { type: 'K', text: "The emotions or experiences the movie might evoke" }
    ]
  },
  {
    id: 15,
    question: "When studying for an exam, I find it most effective to:",
    options: [
      { type: 'R', text: "Take detailed notes and read course materials" },
      { type: 'A', text: "Discuss the topics with others or use audio recordings" },
      { type: 'V', text: "Use charts, diagrams, or visualization techniques" },
      { type: 'K', text: "Create practical examples or role-play scenarios" }
    ]
  },
  {
    id: 16,
    question: "When I'm angry or upset, I typically:",
    options: [
      { type: 'K', text: "Need to move around or engage in physical activity" },
      { type: 'A', text: "Talk about my feelings with someone" },
      { type: 'R', text: "Write down my thoughts or journal" },
      { type: 'V', text: "Need to see the situation from a different perspective" }
    ]
  }
];

export const interpretResults = (scores: Record<string, number>) => {
  const totalScore = scores.V + scores.A + scores.R + scores.K;
  
  const styles = {
    'V': {
      name: 'Visual',
      percentage: Math.round((scores.V / totalScore) * 100),
      description: 'You learn best through visual aids like diagrams, charts, videos, and demonstrations. You prefer to see information laid out visually rather than explained verbally or in text.',
      strategies: [
        'Use diagrams, charts, and mind maps',
        'Highlight key points in different colors',
        'Watch videos or demonstrations',
        'Visualize concepts in your mind',
        'Use flashcards with images',
        'Convert text information into graphs or diagrams'
      ]
    },
    'A': {
      name: 'Auditory',
      percentage: Math.round((scores.A / totalScore) * 100),
      description: 'You learn best through listening and speaking. You prefer to hear information explained out loud and may benefit from talking through concepts.',
      strategies: [
        'Record and listen to lectures',
        'Participate in discussions and group work',
        'Read material aloud to yourself',
        'Use verbal repetition to memorize',
        'Listen to educational podcasts or audiobooks',
        'Explain concepts to others verbally'
      ]
    },
    'R': {
      name: 'Reading/Writing',
      percentage: Math.round((scores.R / totalScore) * 100),
      description: 'You learn best through written words. You prefer to read information and write notes to process and understand new concepts.',
      strategies: [
        'Take detailed notes in your own words',
        'Rewrite ideas and principles in different ways',
        'Read textbooks, articles, and handouts',
        'Use lists and bullet points to organize thoughts',
        'Write summaries of important material',
        'Use dictionaries, glossaries, and definitions'
      ]
    },
    'K': {
      name: 'Kinesthetic',
      percentage: Math.round((scores.K / totalScore) * 100),
      description: 'You learn best through hands-on experience and physical activity. You prefer to learn by doing rather than by watching or listening.',
      strategies: [
        'Engage in hands-on experiments and activities',
        'Use physical objects to model concepts',
        'Take frequent breaks involving movement',
        'Role-play scenarios related to learning material',
        'Create physical models or manipulatives',
        'Apply concepts to real-world situations'
      ]
    }
  };
  
  // Sort styles by percentage (highest first)
  const sortedStyles = Object.entries(styles)
    .sort(([, a], [, b]) => b.percentage - a.percentage);
  
  // Get primary and secondary learning styles
  const primaryStyle = sortedStyles[0][1];
  const secondaryStyle = sortedStyles[1][1];
  
  return {
    styles,
    sortedStyles: sortedStyles.map(([key, value]) => ({
      key,
      ...value
    })),
    primaryStyle,
    secondaryStyle,
    isMultimodal: sortedStyles[0][1].percentage - sortedStyles[1][1].percentage <= 5,
    totalAnswered: totalScore
  };
}; 