import { useCallback, useMemo, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("user");

      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [refresh, setRefresh] = useState<string | null>(() => localStorage.getItem("refresh"));

  const login = useCallback((token: string, refreshToken: string, user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refreshToken);
    setToken(token);
    setRefresh(refreshToken);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    setToken(null);
    setRefresh(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, refresh, isLogged: !!user, login, logout }),
    [user, token, refresh, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
