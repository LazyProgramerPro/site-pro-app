/**
 * A utility function to handle async operations with structured error handling
 * @template T The type of data expected in the response
 * @param fn An async function that returns an object with a data property
 * @returns An object containing either the response data or an error
 */
export async function withAsync<T = any>(
  fn: () => Promise<{ data: T }>
): Promise<{
  response: T | null;
  error: Error | null;
}> {
  try {
    if (typeof fn !== "function")
      throw new Error("The first argument must be a function");

    const { data } = await fn();
    return {
      response: data,
      error: null,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error : new Error(String(error)),
      response: null,
    };
  }
}
