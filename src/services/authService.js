import { apiClient } from "./apiClient";

class AuthService {
  login(email, password) {
    return apiClient.request("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  register(email, password) {
    return apiClient.request("/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  getGoogleLoginUrl() {
    return `${import.meta.env.VITE_API_URL}/auth/google`;
  }
}

export const authService = new AuthService();
