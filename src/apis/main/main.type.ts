import type { DiaryBoardDetail } from "../community/community.type";
import type { NewsItem } from "../news/news.type";

export interface MainPopularCommunityPost {
    id: number;
    title: string;
    content: string;
    summary: string;
    authorName: string;
    authorId: string;
    likes: number;
    commentCount: number | null;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    boardType: "FREE" | "DISCUSS";
    boardTypeName: string;
  }

export interface MainPageResponse {
  recentDiaries: DiaryBoardDetail[];
  recentNews: NewsItem[];
  popularCommunityPosts: MainPopularCommunityPost[];
}