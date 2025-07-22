import instance from "../instance";
import type { MainPageResponse } from "./main.type";

// 메인 페이지: 실천일지, 커뮤니티 인기글, 뉴스 아이템 조회
export const getMainPage = async () => {
  const { data } = await instance.get<MainPageResponse>("/api/v1/main");
  return data;
};
