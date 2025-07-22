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

// 리프레시 api
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  try {
    const res = await instance.post<AuthResponse>("/api/v1/auth/refresh", { refreshToken });
    return res.data;
  } catch (error) {
    console.error("🔁 Refresh Token 요청 실패", error);
    throw error;
  }
};


// 회원가입 시 아이디 중복체크 api
export const checkUserId = (userId: string) => {
  return instance.post<CheckUserIdResponse>("/api/v1/auth/check-userid", {
    userId,
  });
};

// 회원탈퇴
export const withdrawUser = async (payload: {
  userId: string;
  password: string;
}) => {
  const { data } = await instance.delete("/api/v1/user/withdraw", {
    data: payload,
  });
  return data;
};
