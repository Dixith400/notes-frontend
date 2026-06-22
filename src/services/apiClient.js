import { tokenStorage } from "../utils/tokenStorage";

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(path, options = {}) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        ...this.getDefaultHeaders(options.body),
        ...this.getAuthHeader(),
        ...options.headers,
      },
    });

    return response.json();
  }

  getDefaultHeaders(body) {
    return body ? { "Content-Type": "application/json" } : {};
  }

  getAuthHeader() {
    const token = tokenStorage.get();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_URL);
