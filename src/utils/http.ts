import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { Platform } from "react-native";
import { logout } from "../redux/slices/authSlice";
import store from "../redux/store";
import { tokenService } from "../services/token-service";

// Interface cho config có thể abort
interface ConfigWithAbort extends AxiosRequestConfig {
  abort?: (cancel: (reason?: string) => void) => void;
}

const axiosParams: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? Platform.OS === "android"
        ? "https://api.sitepro.vn"
        : "https://api.sitepro.vn"
      : "https://api.sitepro.vn",
};

// Tạo instance
const axiosInstance: AxiosInstance = axios.create(axiosParams);

// 📌 Request Interceptor: Thêm Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    // if (token && !config.url?.includes("/auth/user/refresh-token")) {
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Response Interceptor: Xử lý 401 và auto refresh token
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Nếu lỗi 401 và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // // Không retry nếu đang call API refresh token
      // if (originalRequest.url?.includes("/auth/user/refresh-token")) {
      //   return Promise.reject(error);
      // }

      try {
        // Thử refresh token

        console.log("🔄 Refreshing access token...");
        const refreshSuccess = await tokenService.refreshAccessToken();

        if (refreshSuccess) {
          // Cập nhật token mới vào header và retry request
          const newToken = tokenService.getAccessToken();
          if (newToken && originalRequest.headers) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          }

          // Retry request ban đầu
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const didAbort = (error: unknown): { aborted: boolean } | false =>
  axios.isCancel(error) && { aborted: true };

const getCancelSource = (): CancelTokenSource => axios.CancelToken.source();

export const isApiError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error);

const withAbort = <T>(fn: Function) => {
  const executor = async (...args: any[]): Promise<T> => {
    const originalConfig: ConfigWithAbort = args[args.length - 1];
    const { abort, ...config } = originalConfig;

    if (typeof abort === "function") {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn(url, body, config);
      } else {
        const [url] = args;
        return await fn(url, config);
      }
    } catch (error) {
      console.log("api error", error);

      if (didAbort(error)) {
        (error as any).aborted = true;
      }

      throw error;
    }
  };

  return executor;
};

interface Http {
  get: <T = any>(url: string, config?: ConfigWithAbort) => Promise<T>;
  delete: <T = any>(url: string, config?: ConfigWithAbort) => Promise<T>;
  post: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<T>;
  patch: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<T>;
  put: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<T>;
}

const http = (axios: AxiosInstance): Http => {
  return {
    get: <T = any>(url: string, config: ConfigWithAbort = {}) =>
      withAbort<T>(axios.get)(url, config),
    delete: <T = any>(url: string, config: ConfigWithAbort = {}) =>
      withAbort<T>(axios.delete)(url, config),
    post: <T = any>(url: string, body: any, config: ConfigWithAbort = {}) =>
      withAbort<T>(axios.post)(url, body, config),
    patch: <T = any>(url: string, body: any, config: ConfigWithAbort = {}) =>
      withAbort<T>(axios.patch)(url, body, config),
    put: <T = any>(url: string, body: any, config: ConfigWithAbort = {}) =>
      withAbort<T>(axios.put)(url, body, config),
  };
};

export default http(axiosInstance);
