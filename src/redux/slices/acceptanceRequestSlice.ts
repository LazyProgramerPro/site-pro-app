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
}

export interface Construction {
  id: number;
  name: string;
  projectId: number;
}

export interface AcceptanceRequest {
  id: number;
  code: string;
  name: string;
  projectId: number;
  constructionId: number;
  contractAppendix: string;
  createdAt: string;
  status: string;
  completionDate: string | null;
  requestedBy: string;
  approvedBy: string | null;
  approvalDate: string | null;
  description: string;
  completionPercent: string;
  paymentAmount: string;
  inspectionDate: string | null;
  observations: string | null;
  supportingDocuments: string[];
  teamMembers: string[];
}

interface AcceptanceRequestState {
  acceptanceRequestList: AcceptanceRequest[];
  editingAcceptanceRequest: AcceptanceRequest | null;
  loading: boolean;
  currentRequestId: string | undefined;
  projects: Project[];
  constructions: Construction[];
  selectedProject: Project | null;
  selectedConstruction: Construction | null;
  query: {
    filterStatus?: string | null;
    // searchTerm?: string | null;
    // skip?: number | null;
    // limit?: number | null;
  };
}

const projectsFakeData = [
  { id: 1, name: "Xây dựng tuyến đường 01" },
  { id: 2, name: "Đường cao tốc Bắc Nam" },
  { id: 3, name: "Dự án cầu vượt" },
];

const constructionsFakeData = [
  { id: 1, name: "Công trình A", projectId: 1 },
  { id: 2, name: "Công trình B", projectId: 2 },
  { id: 3, name: "Công trình C", projectId: 3 },
];

// Add this constant with fake data

// Add this constant with fake data

const fakeAcceptanceRequestList: AcceptanceRequest[] = [
  {
    id: 1,
    code: "AR-2025-001",
    name: "Nghiệm thu hạng mục đường nội bộ",
    projectId: 1,
    constructionId: 1,
    contractAppendix: "Phụ lục 2A",
    createdAt: "2025-01-15T09:30:00Z",
    status: "APPROVED",
    completionDate: "2025-02-10T15:00:00Z",
    requestedBy: "Nguyễn Văn An",
    approvedBy: "Trần Minh Hoàng",
    approvalDate: "2025-02-12T10:15:00Z",
    description:
      "Nghiệm thu hoàn thành đường nội bộ khu A thuộc dự án xây dựng tuyến đường 01",
    completionPercent: "100%",
    paymentAmount: "550,000,000",
    inspectionDate: "2025-02-05T08:00:00Z",
    observations:
      "Công trình hoàn thành đúng tiến độ, đạt chất lượng theo yêu cầu",
    supportingDocuments: [
      "inspection_report_001.pdf",
      "quality_certificate_001.pdf",
    ],
    teamMembers: ["Nguyễn Văn An", "Lê Thị Minh", "Phan Quốc Bảo"],
  },
  {
    id: 2,
    code: "AR-2025-002",
    name: "Nghiệm thu hệ thống thoát nước",
    projectId: 1,
    constructionId: 1,
    contractAppendix: "Phụ lục 3B",
    createdAt: "2025-01-20T11:15:00Z",
    status: "PENDING",
    completionDate: null,
    requestedBy: "Lê Thị Minh",
    approvedBy: null,
    approvalDate: null,
    description:
      "Nghiệm thu hệ thống thoát nước mưa khu A dự án xây dựng tuyến đường 01",
    completionPercent: "85%",
    paymentAmount: "320,000,000",
    inspectionDate: null,
    observations: null,
    supportingDocuments: ["drainage_plan_002.pdf"],
    teamMembers: ["Lê Thị Minh", "Trần Văn Đức"],
  },
  {
    id: 3,
    code: "AR-2025-003",
    name: "Nghiệm thu hạng mục cầu vượt B1",
    projectId: 3,
    constructionId: 3,
    contractAppendix: "Phụ lục 1A",
    createdAt: "2025-01-05T08:45:00Z",
    status: "APPROVED",
    completionDate: "2025-01-30T16:30:00Z",
    requestedBy: "Trần Văn Đức",
    approvedBy: "Phạm Thị Mai",
    approvalDate: "2025-02-01T09:20:00Z",
    description: "Nghiệm thu hoàn thành cầu vượt B1 thuộc dự án cầu vượt",
    completionPercent: "100%",
    paymentAmount: "1,200,000,000",
    inspectionDate: "2025-01-28T10:00:00Z",
    observations: "Đạt tiêu chuẩn kỹ thuật, an toàn theo quy định",
    supportingDocuments: ["structural_test_003.pdf", "safety_report_003.pdf"],
    teamMembers: ["Trần Văn Đức", "Hoàng Minh Tuấn", "Vũ Thị Hương"],
  },
  {
    id: 4,
    code: "AR-2025-004",
    name: "Nghiệm thu đoạn cao tốc Km15-Km30",
    projectId: 2,
    constructionId: 2,
    contractAppendix: "Phụ lục 5C",
    createdAt: "2025-02-10T10:00:00Z",
    status: "IN_PROGRESS",
    completionDate: null,
    requestedBy: "Phạm Quốc Huy",
    approvedBy: null,
    approvalDate: null,
    description: "Nghiệm thu đoạn Km15-Km30 thuộc dự án đường cao tốc Bắc Nam",
    completionPercent: "75%",
    paymentAmount: "3,500,000,000",
    inspectionDate: "2025-02-20T13:30:00Z",
    observations: "Cần hoàn thiện lớp mặt đường và hệ thống biển báo",
    supportingDocuments: ["progress_report_004.pdf"],
    teamMembers: ["Phạm Quốc Huy", "Lê Văn Nam", "Nguyễn Thị Thúy"],
  },
  {
    id: 5,
    code: "AR-2025-005",
    name: "Nghiệm thu hệ thống chiếu sáng",
    projectId: 1,
    constructionId: 1,
    contractAppendix: "Phụ lục 4D",
    createdAt: "2025-02-15T14:20:00Z",
    status: "REJECTED",
    completionDate: null,
    requestedBy: "Nguyễn Văn An",
    approvedBy: "Trần Minh Hoàng",
    approvalDate: "2025-02-18T09:45:00Z",
    description: "Nghiệm thu hệ thống chiếu sáng đường nội bộ khu A",
    completionPercent: "90%",
    paymentAmount: "180,000,000",
    inspectionDate: "2025-02-17T15:00:00Z",
    observations:
      "Không đạt tiêu chuẩn về cường độ ánh sáng, yêu cầu khắc phục",
    supportingDocuments: ["lighting_test_005.pdf", "deficiency_list_005.pdf"],
    teamMembers: ["Nguyễn Văn An", "Vũ Thị Hương"],
  },
  // Add the remaining items with updated projectId and constructionId as numbers
];

// Initial state with proper typing
const initialState: AcceptanceRequestState = {
  acceptanceRequestList: [],
  editingAcceptanceRequest: null,
  loading: false,
  currentRequestId: undefined,
  projects: projectsFakeData, // TODO: Replace with actual data fetching
  constructions: constructionsFakeData, // TODO: Replace with actual data fetching
  selectedProject: null,
  selectedConstruction: null,
  query: {
    filterStatus: null,
    // searchTerm: null,
    // skip: null,
    // limit: null,
  },
};

// Define the async thunk for fetching Projects fake data without API and set timeout
export const getProjects = createAsyncThunk<Project[]>(
  "acceptanceRequest/getProjects",
  async (_, thunkAPI) => {
    console.log("getProjects called");
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return projectsFakeData;
  }
);
// Define the async thunk for fetching Constructions by projectId fake data without API and set timeout
export const getConstructions = createAsyncThunk<
  Construction[],
  number | undefined
>("acceptanceRequest/getConstructions", async (projectId, thunkAPI) => {
  console.log("getConstructions called with projectId:", projectId);
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!projectId) {
    return [];
  }
  const filteredConstructions = constructionsFakeData.filter(
    (construction) => construction.projectId === projectId
  ); // TODO: Replace with actual API call
  return filteredConstructions;
});

// Define the async thunk for fetching Acceptance Requests fake data without API and set timeout
export const getAcceptanceRequestList = createAsyncThunk<
  AcceptanceRequest[],
  { projectId?: number; constructionId?: number; status?: string | null }
>(
  "acceptanceRequest/getAcceptanceRequestList",
  async ({ projectId, constructionId, status }, thunkAPI) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // TODO: Replace with actual API call and makesure projectId, constructionId exists
    const filteredAcceptanceRequests = fakeAcceptanceRequestList.filter(
      (request) =>
        (!projectId || request.projectId === projectId) &&
        (!constructionId || request.constructionId === constructionId) &&
        (!status || request.status === status)
    );
    return filteredAcceptanceRequests;
  }
);

// Define the request body type
interface AcceptanceRequestBody {
  name: string;
  project: string;
  contractAppendix: string;
  description: string;
  // Add other required fields
}

export const addAcceptanceRequest = createAsyncThunk<
  AcceptanceRequest,
  AcceptanceRequestBody,
  {
    rejectValue: any;
  }
>("acceptanceRequest/addAcceptanceRequest", async (body, thunkAPI) => {
  try {
    const response = await http.post<AcceptanceRequest>(
      "acceptanceRequests",
      body,
      {
        signal: thunkAPI.signal,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.name === "AxiosError" && error.response?.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});

interface UpdateAcceptanceRequestParams {
  requestId: number;
  body: Partial<AcceptanceRequestBody>;
}

export const updateAcceptanceRequest = createAsyncThunk<
  AcceptanceRequest,
  UpdateAcceptanceRequestParams,
  {
    rejectValue: any;
  }
>(
  "acceptanceRequest/updateAcceptanceRequest",
  async ({ requestId, body }, thunkAPI) => {
    try {
      const response = await http.put<AcceptanceRequest>(
        `acceptanceRequests/${requestId}`,
        body,
        {
          signal: thunkAPI.signal,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const deleteAcceptanceRequest = createAsyncThunk<any, number>(
  "acceptanceRequest/deleteAcceptanceRequest",
  async (requestId, thunkAPI) => {
    const response = await http.delete(`acceptanceRequests/${requestId}`, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const acceptanceRequestSlice = createSlice({
  name: "acceptanceRequest",
  initialState,
  reducers: {
    startEditingAcceptanceRequest: (state, action: PayloadAction<number>) => {
      const requestId = action.payload;
      const foundRequest =
        state.acceptanceRequestList.find(
          (request) => request.id === requestId
        ) || null;
      state.editingAcceptanceRequest = foundRequest;
    },
    cancelEditingAcceptanceRequest: (state) => {
      state.editingAcceptanceRequest = null;
    },
    setSelectedProject: (state, action: PayloadAction<Project | null>) => {
      state.selectedProject = action.payload;
      // state.selectedConstruction = null;
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
  },
  extraReducers(builder) {
    builder
      .addCase(
        getProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.projects = action.payload;
        }
      )
      .addCase(
        getConstructions.fulfilled,
        (state, action: PayloadAction<Construction[]>) => {
          state.constructions = action.payload;
        }
      )
      .addCase(
        getAcceptanceRequestList.fulfilled,
        (state, action: PayloadAction<AcceptanceRequest[]>) => {
          state.acceptanceRequestList = action.payload;
        }
      )
      .addCase(
        addAcceptanceRequest.fulfilled,
        (state, action: PayloadAction<AcceptanceRequest>) => {
          state.acceptanceRequestList.push(action.payload);
        }
      )
      .addCase(
        updateAcceptanceRequest.fulfilled,
        (state, action: PayloadAction<AcceptanceRequest>) => {
          state.acceptanceRequestList.find((request, index) => {
            if (request.id === action.payload.id) {
              state.acceptanceRequestList[index] = action.payload;
              return true;
            }
            return false;
          });
          state.editingAcceptanceRequest = null;
        }
      )
      .addCase(deleteAcceptanceRequest.fulfilled, (state, action) => {
        const requestId = action.meta.arg;
        const deleteRequestIndex = state.acceptanceRequestList.findIndex(
          (request) => request.id === requestId
        );
        if (deleteRequestIndex !== -1) {
          state.acceptanceRequestList.splice(deleteRequestIndex, 1);
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
      )
      .addDefaultCase((state, action) => {
        // console.log(`action type: ${action.type}`, current(state))
      });
  },
});

export const {
  startEditingAcceptanceRequest,
  cancelEditingAcceptanceRequest,
  setSelectedProject,
  setSelectedConstruction,
  setFilterStatus,
} = acceptanceRequestSlice.actions;
const acceptanceRequestReducer = acceptanceRequestSlice.reducer;
export default acceptanceRequestReducer;
