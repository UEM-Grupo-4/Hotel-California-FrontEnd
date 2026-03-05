import { apiRoutes } from "./apiRoutes";
import { api } from "./axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

type LoginPayload = {
  email: string;
  password: string;
};

export const loginRequest = async ({ email, password }: LoginPayload) => {
  const { data } = await api.post(apiRoutes.login, {
    email,
    password,
  });

  return data;
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginRequest,
    onSuccess: data => {
      const { access, user } = data;

      login(access, user);

      if (user.is_admin) navigate("/admin");
      else if (user.is_club_owner) navigate("/my-courts");
      else navigate("/matches");
    },
  });
};