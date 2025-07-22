import type { Pagination } from "../api.type";

// 개별 뉴스 아이템
export interface NewsItem {
  id: number;
  scrapId: number;
  newsId: number;
  title: string;
  summary: string;
  url: string;
  publishDate: string
  category: string;
  categoryDisplay: string;
  scrapped?: boolean;
}

// 뉴스 필터 정보
export interface Filter {
  currentFilter: string;
  currentFilterDisplay: string;
  availableFilters: {
    value: string;
    display: string;
    count: number;
  }[];
}

// 전체 뉴스 조회 응답
export interface NewsResponse {
  news: NewsItem[];
  pagination: Pagination;
  filter: Filter;
}

// 맞춤형 뉴스 응답
export interface PersonalizedNewsResponse {
  news: NewsItem[];
  pagination: Pagination;
  filter: Filter;
  citizenType: string | null;
  citizenTypeDisplay: string;
}

// 스크랩한 뉴스 조회 응답
export interface MyScrapResponse {
  scraps: NewsItem[];
  pagination: Pagination;
}
