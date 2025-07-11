// 로그인, 회원가입 요청
export interface AuthRequest {
    userId: string;
    password: string;
  }
  
  // 로그인, 회원가입 응답
  export interface AuthResponse {
    accessToken: string;
  }
  
  export interface CheckUserIdResponse {
    available: boolean;
  }