import instance from "../instance";
import type {
  CommunityPopularResponse,
  CommunityPostBase,
  CreateBoardResponse,
  CreateDiaryParams,
  CreateDiscussBoardParams,
  CreateFreeBoardParams,
  DiaryBoardDetailResponse,
  DiscussBoardDetailResponse,
  FreeBoardDetailResponse,
  ToggleLikeResponse,
} from "./community.type";

// 커뮤니티 메인 페이지 인기글 리스트 조회
export const getPopularPosts = () => {
  return instance.get<CommunityPopularResponse>("/api/v1/community/");
};

// 자유게시글 생성
export const createFreeBoard = async (data: CreateFreeBoardParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  data.images?.forEach((img) => formData.append("images", img));

  const { data: responseData } = await instance.post<CreateBoardResponse>(
    "/api/v1/free-board/",
    formData
  );

  return responseData;
};

// 실천일지 생성
export const createDiary = async (data: CreateDiaryParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("실천항목", data.practiceCategory);
  data.images?.forEach((img) => formData.append("images", img));

  const { data: responseData } = await instance.post<CreateBoardResponse>(
    "/api/v1/diary/",
    formData
  );

  return responseData;
};

// 토론글 생성
export const createDiscussBoard = async (data: CreateDiscussBoardParams) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("discussType", data.discussType);
  data.images?.forEach((img) => formData.append("images", img));

  const { data: responseData } = await instance.post<CreateBoardResponse>(
    "/api/v1/discuss-board/",
    formData
  );

  return responseData;
};

// 자유게시판 목록 조회
export const getFreeBoardList = (params: {
  page?: number;
  size?: number;
  sortBy?: string;
}) => {
  return instance.get<CommunityPostBase[]>("/api/v1/free-board/", {
    params,
  });
};

// 자유게시글 상세 조회
export const getFreeBoardDetail = async (id: string | number) => {
  const { data } = await instance.get<FreeBoardDetailResponse>(
    `/api/v1/free-board/${id}`
  );
  return data;
};

//토론 게시판 목록 조회
export const getDiscussBoardList = (params: {
  page?: number;
  size?: number;
  sortBy?: string;
}) => {
  return instance.get<CommunityPostBase[]>("/api/v1/discuss-board/", {
    params,
  });
};

// 토론글 상세 조회
export const getDiscussBoardDetail = async (id: string | number) => {
  const { data } = await instance.get<DiscussBoardDetailResponse>(
    `/api/v1/discuss-board/${id}`
  );
  return data;
};

export interface DiaryListResponse {
  success: boolean;
  message: string;
  data: CommunityPostBase[];
  timestamp: string;
}

// 일지 목록 조회
export const getDiaryList = (params: {
  page?: number;
  size?: number;
  sortBy?: string;
}) => {
  return instance.get<DiaryListResponse>("/api/v1/diary/", {
    params,
  });
};

// 일지 상세 조회
export const getDiaryBoardDetail = async (id: string | number) => {
  const { data } = await instance.get<DiaryBoardDetailResponse>(
    `/api/v1/diary-board/${id}`
  );
  return data;
};

// 게시글 삭제 api 
export const deletePost = (
  type: "free" | "debate" | "diary",
  id: number | string
) => {
  let url = "";

  if (type === "free") {
    url = `/api/v1/free-board/${id}`;
  } else if (type === "debate") {
    url = `/api/v1/discuss-board/${id}`;
  } else if (type === "diary") {
    url = `/api/v1/diary-board/${id}`;
  }

  return instance.delete(url);
};

// 게시글 좋아요 토글
export const toggleLike = (targetType: string, targetId: number) => {
  return instance.post<ToggleLikeResponse>("/api/v1/like/toggle", {
    targetType,
    targetId,
  });
};
