import type { NewsResponse } from "./news.type";
import instance from "../instance";

//맞춤형 뉴스 조회
export const getPersonalizedNews = async () => {
  const { data } = await instance.get<NewsResponse>(
    "/api/v1/news/personalized",
    {
      params: {
        page: 0,
        size: 3,
      },
    }
  );
  return data;
};

//뉴스 전체 조회
export const getAllNews = async (filter: string, page = 0, size = 20) => {
  const { data } = await instance.get<NewsResponse>("/api/v1/news", {
    params: {
      filter,
      page,
      size,
    },
  });
  return data;
};
