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
  refresh: string;
  user: User;
};

export const loginRequest = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(apiRoutes.login, payload);

  return data;
};

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginRequest,
    onSuccess: ({ access, refresh, user }) => {

      login(access, refresh, user);

      navigate("/admin");
    },

  });
};