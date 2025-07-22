// 로그인, 회원가입 요청
export interface AuthRequest {
    userId: string;
    password: string;
  }
  
  // 로그인, 회원가입 응답
  export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    expiresIn: number;
  }  
  
  //중복확인 응답
  export interface CheckUserIdResponse {
    available: boolean;
  }