export interface DiaryEntry {
  id: string;
  projectName: string; // Dự án
  constructionName: string; // Công trình
  title: string;
  date: Date;
  content: string;
  images?: string[];
}

export interface DiarySection {
  id: string;
  title: string;
  entries: DiaryEntry[];
}
