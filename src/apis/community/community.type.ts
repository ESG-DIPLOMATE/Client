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

// 자유게시글 생성 파라미터
export interface CreateFreeBoardParams {
  title: string;
  content: string;
  images?: File[];
}

// 실천일지 생성 파라미터
export interface CreateDiaryParams {
  title: string;
  content: string;
  practiceCategory: string;
  images?: File[];
}

// 토론글 생성 파라미터
export interface CreateDiscussBoardParams {
  title: string;
  content: string;
  discussType: string;
  images?: File[];
}
