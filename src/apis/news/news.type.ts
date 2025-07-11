export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  url: string;
  publishDate: string;
  category: string;
  categoryDisplay: string;
  matchScore: number;
  scrapped: boolean;
}

// api 전체 응답 통일되면 공통 타입으로 분리하기
export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Filter {
  currentFilter: string;
  currentFilterDisplay: string;
  availableFilters: {
    value: string;
    display: string;
    count: number;
  }[];
}

export interface NewsResponse {
  news: NewsItem[];
  pagination: Pagination;
  filter: Filter;
}
