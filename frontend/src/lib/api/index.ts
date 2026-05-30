const BASE_URL = "/api";

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T | null> => {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));

      console.error(
        (err as { error?: string; message?: string }).error ??
          (err as { error?: string; message?: string }).message ??
          `Request failed: ${res.status}`,
      );

      return null;
    }

    return (await res.json()) as T;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export default apiFetch;
