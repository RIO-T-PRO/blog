const BASE_URL = "/api";

const apiFetch = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {
    // ignore invalid JSON
  }

  if (!res.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${res.status}`;

    throw new Error(message);
  }

  return data as T;
};

export default apiFetch;
