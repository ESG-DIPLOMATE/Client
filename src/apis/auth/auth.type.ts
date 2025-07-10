// 로그인 요청
export interface LoginRequest {
    userId: string;
    password: string;
  }
  
  // 로그인 응답
  export interface LoginResponse {
    accessToken: string;
  }
  
  // 회원가입 요청
  export interface SignupRequest {
    userId: string;
    password: string;
  }
  
  // 회원가입 응답
  export interface SignupResponse {
    accessToken: string;
  }