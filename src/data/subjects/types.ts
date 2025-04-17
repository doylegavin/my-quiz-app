export type Paper = {
  name: string;
  sections: string[];
  topics: { [topic: string]: string[] };
};

export type PaperOptions = Record<string, Paper>;

export type Subject = {
  difficulty: string[];
  papers: PaperOptions;
  levels: string[];
};

export type SubjectStructure = Record<string, Subject>;

// Helper type for exporting individual levels
export type LevelData = {
  [subject: string]: Subject;
}; 