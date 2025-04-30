export type Paper = {
  name: string;
  sections: string[];
  topics: { [topic: string]: string[] };
};

export type PaperOptions = Record<string, Paper>;

export type Section = {
  name: string;
  type: string;
  topics: { [topic: string]: string[] };
};

export type SectionOptions = Record<string, Section>;

export type Subject = {
  difficulty: string[];
  levels: string[];
  // Allow either papers or sections structure
  papers?: PaperOptions;
  sections?: SectionOptions;
};

export type SubjectStructure = Record<string, Subject>;

// Helper type for exporting individual levels
export type LevelData = {
  [subject: string]: Subject;
}; 