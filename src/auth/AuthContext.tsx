import { createContext, useContext } from "react";
import type { User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext);
