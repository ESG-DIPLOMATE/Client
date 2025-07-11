// 내 정보 조회 응답 타입
export interface MyPageResponse {
  userId: string;
  maskedPassword: string;
  currentLevel: string;
  currentLevelDisplay: string;
  totalStamps: number;
  stampsToNextLevel: number;
  citizenType: string;
  isMaxLevel: boolean;
}

// 내가 올린 글 모아보기 응답 타입
export interface MyPost {
  id: number;
  title: string;
  content: string;
  postType: "FREE_BOARD" | "DISCUSS_BOARD" | "DIARY_BOARD";
  discussType?: "ENVIRONMENT" | "CULTURE" | "PEACE" | "ECONOMY";
  action?: string;
  likes: number;
  viewCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyPostsResponse {
  posts: MyPost[];
  totalCount: number;
  filter: string;
}

export type PostFilter = "ALL" | "FREE" | "DISCUSS" | "DIARY";

// 스탬프 히스토리 타입
export interface StampHistoryResponse {
  totalStamps: number;
  currentLevelDisplay: string;
  stampsToNextLevel: number;
  stampStatistics: {
    diaryWriteStamps: number;
    diaryLikeStamps: number;
    voteStamps: number;
  };
  dailyStampHistory: DailyStampHistory[];
}

export interface DailyStampHistory {
  date: string;
  stamps: DailyStamp[];
}

export interface DailyStamp {
  id: number;
  stampTypeDescription: string;
  stampCount: number;
}

//레벨, 스탬프 설명 타입
export interface LevelGuideResponse {
  message: string;
  description: string;
  levels: LevelInfo[];
  stampEarningMethods: StampEarningMethod[];
}

export interface LevelInfo {
  requiredStamps: string;
  level: number;
  name: string;
}

export interface StampEarningMethod {
  stamps: number;
  description: string;
  activity: string;
}
