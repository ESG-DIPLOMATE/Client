import instance from "../instance";
import type {
  AuthRequest,
  AuthResponse,
  CheckUserIdResponse,
} from "./auth.type";

// 로그인 api 연동
export const login = (data: AuthRequest) => {
  return instance.post<AuthResponse>("/api/v1/auth/login", data);
};

// 회원가입 api 연동
export const signup = (data: AuthRequest) => {
  return instance.post<AuthResponse>("/api/v1/auth/join", data);
};

// 회원가입 시 아이디 중복체크 api
export const checkUserId = (userId: string) => {
  return instance.post<CheckUserIdResponse>("/api/v1/auth/check-userid", {
    userId,
  });
};
