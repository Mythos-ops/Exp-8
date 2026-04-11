import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getMyProfile, loginApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setAuthMessage("");

    try {
      const response = await loginApi({ email, password });
      setToken(response.token);
      setUser(response.user);
      setAuthMessage("Authentication successful");
      return { ok: true, data: response };
    } catch (error) {
      setToken("");
      setUser(null);
      setAuthMessage(error.message || "Authentication failed");
      return { ok: false, message: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);
    setAuthMessage("Logged out");
  }, []);

  const verifyToken = useCallback(async () => {
    if (!token) {
      return;
    }

    try {
      const response = await getMyProfile(token);
      setUser(response.user);
    } catch (_error) {
      setToken("");
      setUser(null);
      setAuthMessage("Session expired, please login again");
    }
  }, [token]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      isLoading,
      authMessage,
      login,
      logout
    }),
    [token, user, isLoading, authMessage, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
