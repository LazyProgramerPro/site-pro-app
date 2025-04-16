import { useState } from "react";
import { ERROR, PENDING, SUCCESS } from "../constants/api-status";
import { useApiStatus } from "./useApiStatus";

interface UseApiConfig<T> {
  initialData?: T;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
}

export function useApi<T = any>(
  fn: (...args: any[]) => Promise<T>,
  config: UseApiConfig<T> = {}
) {
  const { initialData } = config;
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const { status, setStatus, ...normalisedStatuses } = useApiStatus();

  const exec = async (...args: any[]): Promise<ApiResponse<T>> => {
    try {
      setStatus(PENDING);
      const result = await fn(...args);
      setData(result);
      setStatus(SUCCESS);
      return {
        data: result,
        error: null,
      };
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      setStatus(ERROR);
      return {
        error: errorObj,
        data: null,
      };
    }
  };

  return {
    data,
    setData,
    status,
    setStatus,
    error,
    exec,
    ...normalisedStatuses,
  };
}
