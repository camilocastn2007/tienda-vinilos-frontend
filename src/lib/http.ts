// src/lib/http.ts
/**
 * Centralized HTTP helper for the frontend.
 * Automatically adds the JWT from localStorage to the Authorization header.
 * If a response returns 401 (unauthenticated) it clears the stored token/user
 * and redirects the user to the login page.
 */
export async function apiFetch(
  url: string,
  options: RequestInit = {}
): Promise<any> {
  const token = typeof window !== "undefined" ? localStorage.getItem("vinilos_token") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Clear auth data and force login redirect
    if (typeof window !== "undefined") {
      localStorage.removeItem("vinilos_token");
      localStorage.removeItem("vinilos_user");
      window.dispatchEvent(new Event("auth-change"));
      // Try Next.js router, fallback to location
      try {
        const { useRouter } = await import("next/navigation");
        const router = useRouter();
        router.push("/login");
      } catch (_) {
        window.location.href = "/login";
      }
    }
    throw new Error("Unauthenticated – redirecting to login");
  }

  const data = await response.json();
  if (!response.ok) {
    const errorMsg = data?.message || response.statusText;
    throw new Error(errorMsg);
  }
  return data;
}
