import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";

// Define interface for config with abort property
interface ConfigWithAbort extends AxiosRequestConfig {
  abort?: (cancel: (reason?: string) => void) => void;
}

const axiosParams: AxiosRequestConfig = {
  // Set different base URL based on the environment
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/",
};

// Create axios instance with default params
const axiosInstance: AxiosInstance = axios.create(axiosParams);

export const didAbort = (error: unknown): { aborted: boolean } | false =>
  axios.isCancel(error) && { aborted: true };

const getCancelSource = (): CancelTokenSource => axios.CancelToken.source();

export const isApiError = (error: unknown): error is AxiosError =>
  axios.isAxiosError(error);

const withAbort = <T>(fn: Function) => {
  const executor = async (...args: any[]): Promise<AxiosResponse<T>> => {
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
  get: <T = any>(
    url: string,
    config?: ConfigWithAbort
  ) => Promise<AxiosResponse<T>>;
  delete: <T = any>(
    url: string,
    config?: ConfigWithAbort
  ) => Promise<AxiosResponse<T>>;
  post: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<AxiosResponse<T>>;
  patch: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<AxiosResponse<T>>;
  put: <T = any>(
    url: string,
    body: any,
    config?: ConfigWithAbort
  ) => Promise<AxiosResponse<T>>;
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
