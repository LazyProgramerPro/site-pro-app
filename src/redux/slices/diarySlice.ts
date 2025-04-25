import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { DIARY_MOCK_DATA } from "../../constants/diary";
import { DocumentFile } from "../../types/common";

// Define types for async thunks
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export interface DiaryEntry {
  id: number;
  title: string;
  date: string;
  status: string;
  updatedBy: string;
  createdBy: string;
  description: string;
  type: { id: number; name: string };
  capacity: { id: number; name: string }[];
  safety: { id: number; name: string };
  environment: { id: number; name: string };
  weather: string;
  images: string[];
  createdAt: string;
  completionDate: string;
  approvedBy: { id: number; name: string };
  approvalDate: string;
  supportingDocuments: DocumentFile[];
  constructionId: number;
  projectId: number;
}
export interface Project {
  id: number;
  name: string;
}

export interface Construction {
  id: number;
  name: string;
  projectId: number;
}

interface DiaryState {
  projects: { id: number; name: string }[];
  constructions: { id: number; name: string; projectId: number }[];
  entries: DiaryEntry[];
  selectedProject: Project | null;
  selectedConstruction: Construction | null;
  filterStatus: string | null;
  loading: boolean;
  error: string | null;
  currentRequestId: string | undefined;
  editingDiary: DiaryEntry | null;
  query: {
    filterStatus?: string | null;
    searchTerm?: string | null;
    skip?: number | null;
    limit?: number | null;
  };
}

// Helper type to convert readonly mock data to mutable
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P];
};

const initialState: DiaryState = {
  projects: [...DIARY_MOCK_DATA.PROJECTS],
  constructions: [...DIARY_MOCK_DATA.CONSTRUCTIONS],
  entries: [],
  selectedProject: null,
  selectedConstruction: null,
  filterStatus: null,
  loading: false,
  error: null,
  currentRequestId: undefined,
  editingDiary: null,
  query: {
    filterStatus: null,
    // searchTerm: null,
    // skip: null,
    // limit: null,
  },
};

export const getDiaryList = createAsyncThunk<
  any[],
  { projectId?: number; constructionId?: number; status?: string | null }
>("diary/getDiaryList", async ({ projectId, constructionId, status }) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // TODO: Replace with actual API call
  const filteredDiary = DIARY_MOCK_DATA.DIARY_ENTRIES.filter((request) => {
    return (
      (!projectId || request.projectId === projectId) &&
      (!constructionId || request.constructionId === constructionId) &&
      (!status || request.status === status)
    );
  });
  return filteredDiary;
});

// Async thunks
export const addDiaryEntry = createAsyncThunk<DiaryEntry, DiaryEntry>(
  "diary/addDiaryEntry",
  async (entry, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return entry;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDiaryEntry = createAsyncThunk<DiaryEntry, DiaryEntry>(
  "diary/updateDiaryEntry",
  async (entry, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return entry;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDiaryEntry = createAsyncThunk<number, number>(
  "diary/deleteDiaryEntry",
  async (entryId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return entryId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
      state.selectedConstruction = null;
    },
    setSelectedConstruction: (
      state,
      action: PayloadAction<Construction | null>
    ) => {
      state.selectedConstruction = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.query.filterStatus = action.payload;
    },
    startEditingDiaryRequest: (state, action: PayloadAction<number>) => {
      const diaryEntry = state.entries.find(
        (entry) => entry.id === action.payload
      );
      if (diaryEntry) {
        state.editingDiary = diaryEntry;
      }
    },
    cancelEditingDiary: (state) => {
      state.editingDiary = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get diary list
      .addCase(getDiaryList.fulfilled, (state, action) => {
        state.entries = action.payload;
      })

      // Add entry
      .addCase(addDiaryEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
      })

      // Update entry
      .addCase(updateDiaryEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex(
          (entry) => entry.id === action.payload.id
        );
        if (index !== -1) {
          state.entries[index] = action.payload;
        }
      })

      // Delete entry
      .addCase(deleteDiaryEntry.fulfilled, (state, action) => {
        state.entries = state.entries.filter(
          (entry) => entry.id !== action.payload
        );
      })

      // Loading state matchers
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        }
      );
  },
});

export const {
  setSelectedProject,
  setSelectedConstruction,
  setFilterStatus,
  startEditingDiaryRequest,
  cancelEditingDiary,
} = diarySlice.actions;

export default diarySlice.reducer;
