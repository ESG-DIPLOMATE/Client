import instance from "../instance";
import type {
  LevelGuideResponse,
  MyPageResponse,
  MyPostsResponse,
  PostFilter,
  StampHistoryResponse,
} from "./mypage.type";
// 내 정보 조회
export const getMyPage = async () => {
  const { data } = await instance.get<MyPageResponse>("/api/v1/stamp/my-page");
  return data;
};

// 스탬프 히스토리 조회

export const getStampHistory = async () => {
  const { data } = await instance.get<StampHistoryResponse>(
    "/api/v1/stamp/my-level/detailed"
  );
  return data;
};

//레벨, 스탬프 설명 조회
export const getLevelGuide = async () => {
  const { data } = await instance.get<LevelGuideResponse>(
    "/api/v1/stamp/level-guide"
  );
  return data;
};

// 내가 업로드한 글 모아보기
export const getMyPosts = async (filter: PostFilter, page = 0, size = 10) => {
  const { data } = await instance.get<MyPostsResponse>("/api/v1/my-posts/", {
    params: {
      filter,
      page,
      size,
    },
  });
  return data;
};
