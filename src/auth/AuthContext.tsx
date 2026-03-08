import { createContext } from "react";
import type { User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  refresh: string | null;
  login: (token: string, refresh: string, user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

