import { apiRoutes } from "./apiRoutes";
import { api } from "./axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  access: string;
  user: User;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post(apiRoutes.login, payload);

  return data;
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: ({ access, user }) => {

      login(access, user);

      if (user) navigate("/admin");
      else navigate("/home");
    },
  });
};