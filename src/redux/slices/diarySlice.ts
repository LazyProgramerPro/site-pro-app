import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DIARY_MOCK_DATA } from "../../constants/diary";

export interface DiaryEntry {
  id: string;
  title: string;
  date: string;
  status: string;
  updatedBy: string;
  createdBy: string;
}

interface DiaryState {
  projects: string[];
  constructions: { [key: string]: string[] };
  entries: DiaryEntry[];
  selectedProject: string | null;
  selectedConstruction: string | null;
  filterStatus: string | null;
}

const initialState: DiaryState = {
  projects: [...DIARY_MOCK_DATA.PROJECTS],
  constructions: { ...DIARY_MOCK_DATA.CONSTRUCTIONS },
  entries: [...DIARY_MOCK_DATA.DIARY_ENTRIES],
  selectedProject: null,
  selectedConstruction: null,
  filterStatus: null,
};

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string | null>) => {
      state.selectedProject = action.payload;
      state.selectedConstruction = null;
    },
    setSelectedConstruction: (state, action: PayloadAction<string | null>) => {
      state.selectedConstruction = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.filterStatus = action.payload;
    },
    addEntry: (state, action: PayloadAction<DiaryEntry>) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action: PayloadAction<DiaryEntry>) => {
      const index = state.entries.findIndex(
        (entry) => entry.id === action.payload.id
      );
      if (index !== -1) {
        state.entries[index] = action.payload;
      }
    },
    deleteEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(
        (entry) => entry.id !== action.payload
      );
    },
  },
});

export const {
  setSelectedProject,
  setSelectedConstruction,
  setFilterStatus,
  addEntry,
  updateEntry,
  deleteEntry,
} = diarySlice.actions;

export default diarySlice.reducer;
