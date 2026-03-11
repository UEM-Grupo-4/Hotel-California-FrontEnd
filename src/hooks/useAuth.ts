import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { showError } from "../utils/showNotification";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    showError("Se necesitan credenciales");
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
