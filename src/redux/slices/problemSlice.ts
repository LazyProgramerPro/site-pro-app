import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { PROBLEMS } from "../../constants/problem";
import { DocumentFile } from "../../types/common";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export interface Problem {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  type: string;
  updatedBy: string;
  createdBy: string;
  createdAt: string;
  completionDate: string;
  assignedTo: { id: number; name: string }[];
  images: string[];
  supportingDocuments: DocumentFile[];
  constructionId: number;
  projectId: number;
}

interface ProblemState {
  problems: Problem[];
  selectedProject: { id: number; name: string } | null;
  selectedConstruction: { id: number; name: string } | null;
  filterStatus: string | null;
  loading: boolean;
  editingProblem: Problem | null;
  query: {
    filterStatus: string | null;
  };
  currentRequestId: string | undefined;
}

export const getProblemList = createAsyncThunk<
  any[],
  { projectId?: number; constructionId?: number; status?: string | null }
>("diary/getProblemList", async ({ projectId, constructionId, status }) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // TODO: Replace with actual API call
  const filteredDiary = PROBLEMS.filter((request) => {
    return (
      (!projectId || request.projectId === projectId) &&
      (!constructionId || request.constructionId === constructionId) &&
      (!status || request.status === status)
    );
  });
  return filteredDiary;
});

const initialState: ProblemState = {
  problems: [],
  selectedProject: null,
  selectedConstruction: null,
  filterStatus: null,
  loading: false,
  editingProblem: null,
  query: {
    filterStatus: null,
  },
  currentRequestId: undefined,
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblems: (state, action: PayloadAction<Problem[]>) => {
      state.problems = action.payload;
    },
    setSelectedProject: (
      state,
      action: PayloadAction<{ id: number; name: string } | null>
    ) => {
      state.selectedProject = action.payload;
    },
    setSelectedConstruction: (
      state,
      action: PayloadAction<{ id: number; name: string } | null>
    ) => {
      state.selectedConstruction = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.filterStatus = action.payload;
      state.query.filterStatus = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    startEditingProblem: (state, action: PayloadAction<number>) => {
      const problem = state.problems.find((p) => p.id === action.payload);
      if (problem) {
        state.editingProblem = problem;
      }
    },
    cancelEditingProblem: (state) => {
      state.editingProblem = null;
    },
    addProblem: (state, action: PayloadAction<Problem>) => {
      state.problems.push(action.payload);
    },
    updateProblem: (state, action: PayloadAction<Problem>) => {
      const index = state.problems.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.problems[index] = action.payload;
      }
    },
    deleteProblem: (state, action: PayloadAction<number>) => {
      state.problems = state.problems.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProblemList.fulfilled, (state, action) => {
        state.loading = false;
        state.problems = action.payload;
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
  setProblems,
  setSelectedProject,
  setSelectedConstruction,
  setFilterStatus,
  setLoading,
  startEditingProblem,
  cancelEditingProblem,
  addProblem,
  updateProblem,
  deleteProblem,
} = problemSlice.actions;

export default problemSlice.reducer;
