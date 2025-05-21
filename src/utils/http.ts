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

// Flag để tránh các request refreshToken đồng thời
let isRefreshing = false;
// Mảng các request đang đợi token mới
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const axiosParams: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === "development"
      ? Platform.OS === "android"
        ? "https://api.sitepro.vn" // Đặc biệt cho Android Emulator
        : "https://api.sitepro.vn" // IP máy thật cho các thiết bị khác
      : "https://api.sitepro.vn",
};

// Tạo instance
const axiosInstance: AxiosInstance = axios.create(axiosParams);

// Xử lý các request đang đợi sau khi có token mới
const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });

  failedQueue = [];
};

// 📌 Interceptor Request: thêm token vào header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = tokenService.getAccessToken();

    // Nếu có token và route không phải là refresh token
    if (token && !config.url?.includes("/auth/user/refresh-token")) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;

      // Nếu token sắp hết hạn và chưa có request refresh nào đang chạy
      if (tokenService.isTokenExpiringSoon() && !isRefreshing) {
        isRefreshing = true;

        try {
          // Thực hiện refresh token
          await tokenService.refreshAccessToken();

          // Cập nhật token mới cho request hiện tại
          const newToken = tokenService.getAccessToken();
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } catch (error) {
          console.error("Lỗi khi refresh token", error);
          // Nếu refresh thất bại, đăng xuất người dùng
          tokenService.clearTokenRefresh(); // Xóa cơ chế refresh token tự động
          store.dispatch(logout());
        } finally {
          isRefreshing = false;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 📌 Interceptor Response: xử lý lỗi 401 và response data
axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi 401 Unauthorized và chưa thử lại
    if (error?.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đưa request vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${tokenService.getAccessToken()}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Đánh dấu request này đã thử refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Thực hiện refresh token
        await tokenService.refreshAccessToken();

        // Cập nhật token mới cho request
        const token = tokenService.getAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        // Báo thành công cho các request đang đợi
        processQueue();

        // Thử lại request ban đầu
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Báo lỗi cho các request đang đợi
        processQueue(refreshError);

        // Nếu refresh thất bại, đăng xuất người dùng
        tokenService.clearTokenRefresh(); // Xóa cơ chế refresh token tự động
        store.dispatch(logout());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
