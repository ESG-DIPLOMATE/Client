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

// 커뮤니티 조회
export interface CommunityPostBase {
  id: number;
  title: string;
  content?: string; // 자유, 토론
  description?: string; // 실천일지
  action?: string; // 실천일지
  discussType?: string; // 토론
  likes: number;
  liked: boolean;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  images?: File[];
  owner: boolean;
}
export interface BoardImage {
  id: number;
  originalFileName: string;
  imageUrl: string;
  mimeType: string;
  imageOrder: number;
  fileSize: number;
}

export interface BoardListResponse {
  success: boolean;
  message: string;
  data: {
    content: CommunityPostBase[];
    pagination: {
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalCount: number;
      hasMore: boolean;
      hasPrevious: boolean;
      first: boolean;
      last: boolean;
    };
  };
  timestamp: string;
}

export interface FreeBoardDetailResponse {
  success: boolean;
  message: string;
  data: FreeBoardDetail;
  timestamp: string;
}

export interface FreeBoardDetail {
  id: number;
  freeBoardComments: FreeBoardComment[];
  freeBoardImages: BoardImage[];
  updatedAt: string;
  createdAt: string;
  userId: string;
  title: string;
  content: string;
  likes: number;
  liked: boolean;
  viewCount: number;
  owner: boolean;
}
export interface FreeBoardComment {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: boolean;
}

export interface DiscussBoardDetailResponse {
  success: boolean;
  message: string;
  data: DiscussBoardDetail;
  timestamp: string;
}

export interface DiscussBoardDetail {
  id: number;
  title: string;
  content: string;
  discussType: string;
  likes: number;
  liked: boolean;
  viewCount: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner: boolean;
  discussBoardComments: DiscussBoardComment[];
  discussBoardImages: BoardImage[];
}

export interface DiscussBoardComment {
  id: number;
  userId: string;
  content: string;
  commentType: "PROS" | "CONS";
  createdAt: string;
  updatedAt: string;
  owner: boolean;
}

export interface DiaryBoardDetailResponse {
  success: boolean;
  message: string;
  data: DiaryBoardDetail;
  timestamp: string;
}

export interface DiaryBoardDetail {
  id: number;
  title: string;
  description: string;
  action: string;
  likes: number;
  liked: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  owner: boolean;
  diaryComments: DiaryBoardComment[];
  diaryImages: BoardImage[];
}

export interface DiaryBoardComment {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  owner: boolean;
}

export interface CreateBoardResponse {
  success: boolean;
  message: string;
  data: {
    postId: number;
    message: string;
  };
  timestamp: string;
}

export interface ToggleLikeResponse {
  likeCount: number;
  message: string;
  liked: boolean;
}

export type Comment = {
  id: number;
  userId: string;
  content: string;
  commentType?: "PROS" | "CONS";
  createdAt: string;
  updatedAt: string;
  owner: boolean;
};
