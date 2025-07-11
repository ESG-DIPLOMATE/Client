import instance from "../instance";
import type {
  CommunityPopularResponse,
  CreateDiaryParams,
  CreateDiscussBoardParams,
  CreateFreeBoardParams,
} from "./community.type";

// 커뮤니티 메인 페이지 인기글 리스트 조회
export const getPopularPosts = () => {
  return instance.get<CommunityPopularResponse>("/api/v1/community/");
};

// 자유게시글 생성
export const createFreeBoard = (data: CreateFreeBoardParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  data.images?.forEach((img) => formData.append("images", img));

  return instance.post("/api/v1/free-board/", formData);
};

// 실천일지 생성
export const createDiary = (data: CreateDiaryParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("실천항목", data.practiceCategory);
  data.images?.forEach((img) => formData.append("images", img));

  return instance.post("/api/v1/diary/", formData);
};

// 토론글 생성
export const createDiscussBoard = (data: CreateDiscussBoardParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("discussType", data.discussType);
  data.images?.forEach((img) => formData.append("images", img));

  return instance.post("/api/v1/discuss-board/", formData);
};
