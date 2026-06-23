import { BASE_URL } from "./index";

let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const rawFetch = async (path: string, options: RequestInit = {}) => {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
  });
};

export const refreshAccessToken = async (): Promise<string> => {
  // If a refresh is already in progress, reuse it
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await rawFetch("/auth/refresh", { method: "POST" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        clearAccessToken();
        const message =
          data?.message ||
          (typeof data?.error === "string" ? data.error : null) ||
          "Refresh token invalid";
        throw new Error(message);
      }

      const token = data?.data?.accessToken as string | undefined;
      if (!token) {
        clearAccessToken();
        throw new Error("No access token returned from refresh endpoint");
      }

      setAccessToken(token);
      return token;
    } catch (error) {
      clearAccessToken();
      throw error; // let the original request handle it
    } finally {
      refreshPromise = null; // clear the lock after success or failure
    }
  })();

  return refreshPromise;
};
