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

// Response từ API định nghĩa cấu trúc trả về từ backend
export interface ApiResponse<T> {
  rc: {
    code: number;
    desc: string;
  };
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPage: number;
  data: T;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  description: string;
  creator_id: string;
  start_at: string;
  finish_at: string;
  created_at: string;
  updated_at: string;
  nha_thau_thi_cong_name: string;
  nha_thau_thi_cong_id: string;
  tu_van_giam_sat_name: string;
  tu_van_giam_sat_id: string;
  tu_van_thiet_ke_name: string;
  tu_van_thiet_ke_id: string;
  // Các trường thêm để tương thích với UI hiện tại
  progress?: number;
  image?: string;
  status?: "Pending" | "Approved" | "Rejected" | "In Progress";
  approvalDate?: string; // Added
  approvedBy?: string; // Added
}

export interface Construction {
  id: string;
  name: string;
  projectId: string;
}

export interface Contract {
  id: string;
  name: string;
  projectId: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  value: number;
  status: string;
  contractor: string;
}

interface ProjectState {
  projectList: Project[];
  editingProject: Project | null;
  loading: boolean;
  currentRequestId: string | undefined;
  totalCount: number;
  query: {
    filterStatus?: string | null;
  };
  constructions: Construction[];
  contracts: Contract[];
}

const constructionsFakeData = [
  { id: "1", name: "Công trình A", projectId: "1" },
  { id: "2", name: "Công trình B", projectId: "2" },
  { id: "3", name: "Công trình C", projectId: "3" },
];

const contractsFakeData = [
  {
    id: "1",
    name: "Hợp đồng xây dựng nhà A",
    projectId: "1",
    contractNumber: "HD-001",
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    value: 5000000000,
    status: "Đang thực hiện",
    contractor: "Công ty Xây dựng ABC",
  },
  {
    id: "2",
    name: "Hợp đồng thiết kế công trình B",
    projectId: "2",
    contractNumber: "HD-002",
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    value: 2000000000,
    status: "Đã ký",
    contractor: "Công ty Thiết kế XYZ",
  },
  {
    id: "3",
    name: "Hợp đồng giám sát công trình C",
    projectId: "3",
    contractNumber: "HD-003",
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    value: 1000000000,
    status: "Hoàn thành",
    contractor: "Công ty Giám sát DEF",
  },
];

// Initial state with proper typing
const initialState: ProjectState = {
  projectList: [],
  editingProject: null,
  loading: false,
  currentRequestId: undefined,
  totalCount: 0,
  query: {
    filterStatus: null,
  },
  constructions: [],
  contracts: [],
};

// Define the async thunk for fetching Projects with new API structure
export const getProjects = createAsyncThunk<{
  data: Project[];
  totalCount: number;
}>("project/getProjects", async (filters: any, thunkAPI) => {
  try {
    const response = await http.post("/auth/duan/list", {
      ...filters,
    });

    // giả lập độ trễ
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Response from getProjects:", response);

    const { rc, data, totalCount } = response;

    if (rc?.code !== 0) {
      return thunkAPI.rejectWithValue(rc?.desc || "Lỗi không xác định!");
    }

    // Chuyển đổi dữ liệu về định dạng mong muốn
    const projects = data.map((project: any) => ({
      id: project.id,
      code: project.code,
      name: project.name,
      description: project.description,
      creator_id: project.creator_id,
      start_at: project.start_at,
      finish_at: project.finish_at,
      created_at: project.created_at,
      updated_at: project.updated_at,
      nha_thau_thi_cong_name: project.nha_thau_thi_cong_name,
      nha_thau_thi_cong_id: project.nha_thau_thi_cong_id,
      tu_van_giam_sat_name: project.tu_van_giam_sat_name,
      tu_van_giam_sat_id: project.tu_van_giam_sat_id,
      tu_van_thiet_ke_name: project.tu_van_thiet_ke_name,
      tu_van_thiet_ke_id: project.tu_van_thiet_ke_id,
      progress: project.progress ?? 70,
      status: project.status ?? "Pending",
      image:
        project.image ??
        `https://picsum.photos/400/600?random=${project.id + 1}`,
    }));

    return { data: projects, totalCount };
  } catch (error: any) {
    if (error.name === "AxiosError" && error.response?.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
    throw error;
  }
});

// Thunk để lấy chi tiết một dự án bằng ID
export const getProjectById = createAsyncThunk<Project, string>(
  "project/getProjectById",
  async (projectId, thunkAPI) => {
    try {
      // API response được giả định là item không có rc, data wrapper
      const response = await http.get<Project>(`/auth/duan/info/${projectId}`, {
        signal: thunkAPI.signal,
      });
      // Nếu API trả về có cấu trúc rc, data thì cần điều chỉnh lại
      // const { rc, data } = response;
      // if (rc?.code !== 0) {
      //   return thunkAPI.rejectWithValue(rc?.desc || "Lỗi không xác định!");
      // }
      // return data; // Giả sử data là một Project object

      return response; // Giả sử API trả về trực tiếp Project object
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      // Xử lý các lỗi khác, ví dụ 404
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue("Không tìm thấy dự án");
      }
      return thunkAPI.rejectWithValue(
        error.message || "Lỗi không xác định khi lấy chi tiết dự án"
      );
    }
  }
);

export const getConstructions = createAsyncThunk<
  Construction[],
  string | undefined
>("project/getConstructions", async (projectId, thunkAPI) => {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!projectId) {
    return constructionsFakeData;
  }
  const filteredConstructions = constructionsFakeData.filter(
    (construction) => construction.projectId === projectId
  ); // TODO: Replace with actual API call

  // Khi gọi API thực tế
  // const response = await http.get<ApiResponse<Construction[]>>(`constructions?projectId=${projectId}`, {
  //   signal: thunkAPI.signal,
  // });
  // return response.data.data;

  return filteredConstructions;
});

export const getContracts = createAsyncThunk<Contract[], string | undefined>(
  "project/getContracts",
  async (projectId, thunkAPI) => {
    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!projectId) {
      return contractsFakeData;
    }
    const filteredContracts = contractsFakeData.filter(
      (contract) => contract.projectId === projectId
    ); // TODO: Replace with actual API call

    // Khi gọi API thực tế
    // const response = await http.get<ApiResponse<Contract[]>>(`contracts?projectId=${projectId}`, {
    //   signal: thunkAPI.signal,
    // });
    // return response.data.data;

    return filteredContracts;
  }
);

// Define the request body type
// Cập nhật interface cho phù hợp với API mới
interface ProjectRequestBody {
  name: string;
  code?: string;
  description?: string;
  start_at?: string;
  finish_at?: string;
  nha_thau_thi_cong_id?: string;
  tu_van_giam_sat_id?: string;
  tu_van_thiet_ke_id?: string;
  status?: string;
}

export const addProject = createAsyncThunk<Project, ProjectRequestBody>(
  "project/addProject",
  async (body, thunkAPI) => {
    try {
      // Khi làm việc với API thực tế
      // const response = await http.post<ApiResponse<Project>>("projects", body, {
      //   signal: thunkAPI.signal,
      // });
      // return response.data.data;

      // Hiện tại đang sử dụng dữ liệu giả cho ví dụ
      const fakeNewProject: Project = {
        id: Date.now().toString(),
        code: `PRJ-${Date.now()}`,
        name: body.name,
        description: body.description || "",
        creator_id: "current-user-id",
        start_at: body.start_at || new Date().toISOString(),
        finish_at:
          body.finish_at ||
          new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        nha_thau_thi_cong_name: "Nhà thầu demo",
        nha_thau_thi_cong_id: body.nha_thau_thi_cong_id || "",
        tu_van_giam_sat_name: "Tư vấn giám sát demo",
        tu_van_giam_sat_id: body.tu_van_giam_sat_id || "",
        tu_van_thiet_ke_name: "Tư vấn thiết kế demo",
        tu_van_thiet_ke_id: body.tu_van_thiet_ke_id || "",
        progress: 0,
        status: "Pending",
      };
      return fakeNewProject;
    } catch (error: any) {
      if (error.name === "AxiosError" && error.response?.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

interface UpdateProjectParams {
  projectId: string;
  body: Partial<ProjectRequestBody>;
}

export const updateProject = createAsyncThunk<Project, UpdateProjectParams>(
  "project/updateProject",
  async (body, thunkAPI) => {
    try {
      const { rc, item } = await http.put("/auth/duan/update", body, {
        signal: thunkAPI.signal,
      });

      if (rc?.code !== 0) {
        return thunkAPI.rejectWithValue(rc?.desc || "Lỗi không xác định!");
      }

      return item;
    } catch (error) {
      const err = error as any;
      if (err.name === "AxiosError" && err.response?.status === 422) {
        return thunkAPI.rejectWithValue(err.response.data);
      }
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk<any, string>(
  "project/deleteProject",
  async (projectId, thunkAPI) => {
    const response = await http.delete<ApiResponse<any>>(
      `projects/${projectId}`,
      {
        signal: thunkAPI.signal,
      }
    );
    // Vì kiểu trả về đã được khai báo là any trong generics
    return response.data.data as any;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startEditingProject: (state, action: PayloadAction<string>) => {
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
        (
          state,
          action: PayloadAction<{ data: Project[]; totalCount: number }>
        ) => {
          state.projectList = action.payload.data;
          state.totalCount = action.payload.totalCount;
        }
      )
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
        state.editingProject = null; // Xóa dự án cũ đang xem (nếu có)
      })
      .addCase(
        getProjectById.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.loading = false;
          state.editingProject = action.payload;
        }
      )
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        // Có thể lưu lỗi vào state nếu cần hiển thị chi tiết lỗi
        console.error(
          "Lỗi khi lấy chi tiết dự án:",
          action.payload || action.error.message
        );
        state.editingProject = null;
      })
      .addCase(
        getConstructions.fulfilled,
        (state, action: PayloadAction<Construction[]>) => {
          state.constructions = action.payload;
        }
      )
      .addCase(
        getContracts.fulfilled,
        (state, action: PayloadAction<Contract[]>) => {
          state.contracts = action.payload;
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
