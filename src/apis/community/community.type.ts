//커뮤니티 메인 인기글 조회
export interface PopularFreeBoard {
  id: number;
  title: string;
  content: string;
  likes: number;
  viewCount: number;
  userId: string;
  createdAt: string;
  commentCount: number;
}

export interface PopularDiscussBoard {
  id: number;
  title: string;
  content: string;
  discussType: string;
  likes: number;
  viewCount: number;
  userId: string;
  createdAt: string;
  commentCount: number;
}

export interface CommunityPopularResponse {
  popularFreeBoards: PopularFreeBoard[];
  popularDiscussBoards: PopularDiscussBoard[];
}
