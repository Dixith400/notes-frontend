class TokenStorage {
  // Local storage is wrapped so auth changes happen in one predictable place.
  get() {
    return localStorage.getItem("token");
  }

  set(token) {
    localStorage.setItem("token", token);
  }

  clear() {
    localStorage.removeItem("token");
  }
}

export const tokenStorage = new TokenStorage();
