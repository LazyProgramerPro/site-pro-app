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

// 📌 Interceptor Request: chỉ thêm token vào header, KHÔNG refresh token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token && !config.url?.includes("/auth/user/refresh-token")) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Interceptor Response: chỉ trả về response.data, KHÔNG xử lý refresh token, KHÔNG logout tự động
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
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
