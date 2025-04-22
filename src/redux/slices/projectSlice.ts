import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import http from "../../utils/http";

// Define interfaces for better type safety

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export interface Project {
  id: number;
  name: string;
  progress: number;
  dueDate: string;
  image: string;
  status: string;
  approvalDate: string;
  approvedBy: string;
  code: string;
}

export interface Construction {
  id: number;
  name: string;
  projectId: number;
}

interface ProjectState {
  projectList: Project[];
  editingProject: Project | null;
  loading: boolean;
  currentRequestId: string | undefined;
  query: {
    filterStatus?: string | null;
  };
  constructions: Construction[];
}

const projectsFakeData = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `Dự án số ${index + 1}`,
  progress: Math.floor(Math.random() * 101), // Random progress between 0 and 100
  dueDate: new Date(
    Date.now() + Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
  ).toISOString(), // Random future date within a year
  image: `https://via.placeholder.com/150?text=Project+${index + 1}`,
  status: ["Pending", "In Progress", "Completed"][
    Math.floor(Math.random() * 3)
  ], // Random status
  approvalDate: new Date(
    Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
  ).toISOString(), // Random past date within a year
  approvedBy: `User ${Math.floor(Math.random() * 10) + 1}`,
  code: `PRJ-${index + 1}`,
}));

const constructionsFakeData = [
  { id: 1, name: "Công trình A", projectId: 1 },
  { id: 2, name: "Công trình B", projectId: 2 },
  { id: 3, name: "Công trình C", projectId: 3 },
];

// Initial state with proper typing
const initialState: ProjectState = {
  projectList: [],
  editingProject: null,
  loading: false,
  currentRequestId: undefined,
  query: {
    filterStatus: null,
  },
  constructions: [],
};

// Define the async thunk for fetching Projects
export const getProjects = createAsyncThunk<Project[]>(
  "project/getProjects",
  async (_, thunkAPI) => {
    try {
      console.log("getProjects called");
      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return projectsFakeData;
      // const response = await http.get<Project[]>("projects", {
      //   signal: thunkAPI.signal,
      // });
      // return response.data;
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const getConstructions = createAsyncThunk<
  Construction[],
  number | undefined
>("project/getConstructions", async (projectId, thunkAPI) => {
  console.log("getConstructions called", projectId);
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!projectId) {
    return constructionsFakeData;
  }
  const filteredConstructions = constructionsFakeData.filter(
    (construction: Construction) => construction.projectId === projectId
  ); // TODO: Replace with actual API call
  return filteredConstructions;
});

// Define the request body type
interface ProjectRequestBody {
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  budget?: number;
  manager?: string;
  location?: string;
}

export const addProject = createAsyncThunk<Project, ProjectRequestBody>(
  "project/addProject",
  async (body, thunkAPI) => {
    try {
      const response = await http.post<Project>("projects", body, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

interface UpdateProjectParams {
  projectId: number;
  body: Partial<ProjectRequestBody>;
}

export const updateProject = createAsyncThunk<Project, UpdateProjectParams>(
  "project/updateProject",
  async ({ projectId, body }, thunkAPI) => {
    try {
      const response = await http.put<Project>(`projects/${projectId}`, body, {
        signal: thunkAPI.signal,
      });
      return response.data;
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk<any, number>(
  "project/deleteProject",
  async (projectId, thunkAPI) => {
    const response = await http.delete(`projects/${projectId}`, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startEditingProject: (state, action: PayloadAction<number>) => {
      const projectId = action.payload;
      const foundProject =
        state.projectList.find((project) => project.id === projectId) || null;
      state.editingProject = foundProject;
    },
    cancelEditingProject: (state) => {
      state.editingProject = null;
    },
    setFilterStatus: (state, action: PayloadAction<string | null>) => {
      state.query.filterStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projectList = action.payload;
        }
      )
      .addCase(
        getConstructions.fulfilled,
        (state, action: PayloadAction<Construction[]>) => {
          state.constructions = action.payload;
        }
      )
      .addCase(
        addProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projectList.push(action.payload);
        }
      )
      .addCase(
        updateProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projectList.find((project, index) => {
            if (project.id === action.payload.id) {
              state.projectList[index] = action.payload;
              return true;
            }
            return false;
          });
          state.editingProject = null;
        }
      )
      .addCase(deleteProject.fulfilled, (state, action) => {
        const projectId = action.meta.arg;
        const deleteProjectIndex = state.projectList.findIndex(
          (project) => project.id === projectId
        );
        if (deleteProjectIndex !== -1) {
          state.projectList.splice(deleteProjectIndex, 1);
        }
      })
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

export const { startEditingProject, cancelEditingProject, setFilterStatus } =
  projectSlice.actions;
const projectReducer = projectSlice.reducer;
export default projectReducer;
