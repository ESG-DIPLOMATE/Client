import axios from "axios";
import { refreshToken as refreshTokenAPI } from "@/apis/auth/auth";

const instance = axios.create({
  baseURL: "https://hihigh.lion.it.kr",
});

// 토큰 재발급 요청 여부 관리
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest?.url?.includes("/auth/refresh")) {
      console.error("리프레시 요청 실패, handleUnauthorized 실행");
      handleUnauthorized();
      return Promise.reject(error);
    }

    if (error.response?.status === 500) {
      window.location.href = "/error";
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          handleUnauthorized();
          return Promise.reject(error);
        }

        const res = await refreshTokenAPI(refreshToken);

        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);

        onRefreshed(res.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("refreshToken 요청 실패", refreshError);
        handleUnauthorized(); // ✅ 여기로 진입하게 됨
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


function handleUnauthorized() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
}

export default instance;
