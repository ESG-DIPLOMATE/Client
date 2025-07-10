import instance from "../instance";
import type { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from "./auth.type";


export const login = (data: LoginRequest) => {
  return instance.post<LoginResponse>("/api/v1/auth/login", data);
};

export const signup = (data: SignupRequest) => {
  return instance.post<SignupResponse>("/api/v1/auth/join", data);
};

export const checkUserId = (userId: string) => {
  return instance.post("/api/v1/auth/check-userid", {
    userId,
  });
};