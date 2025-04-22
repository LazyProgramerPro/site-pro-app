export interface DiaryEntry {
  id: number;
  title: string;
  description: string;
  type: {
    id: number;
    name: string;
  };
  capacity: {
    id: number;
    name: string;
  }[];
  safety: {
    id: number;
    name: string;
  };
  environment: {
    id: number;
    name: string;
  };
  weather: string;
  images: string[];
  date: string;
  status: string;
  updatedBy: string;
  createdBy: string;
  createdAt: string;
  completionDate: string;
  approvedBy: {
    id: number;
    name: string;
  };
  approvalDate: string;
  supportingDocuments: {
    id: number;
    name: string;
    url: string;
  }[];
  constructionId: number;
  projectId: number;
}

export interface DiarySection {
  id: string;
  title: string;
  entries: DiaryEntry[];
}
