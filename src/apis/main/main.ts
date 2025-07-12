import instance from "../instance";
import type { DiaryBoardDetail } from "@/apis/community/community.type";
import type { NewsItem } from "../news/news.type";
import type { MainPopularCommunityPost } from "./main.type";

export interface MainPageResponse {
  recentDiaries: DiaryBoardDetail[];
  recentNews: NewsItem[];
  popularCommunityPosts: MainPopularCommunityPost[];
}

export const getMainPage = async () => {
  const { data } = await instance.get<MainPageResponse>("/api/v1/main");
  return data;
};
