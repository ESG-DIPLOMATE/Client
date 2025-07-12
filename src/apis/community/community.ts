import instance from "../instance";
import type {
  BoardListResponse,
  CommunityPopularResponse,
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

  data.images?.forEach((img) => {
    formData.append("images", img);
  });

  const { data: responseData } = await instance.post<CreateBoardResponse>(
    "/api/v1/free-board/",
    formData,
    {
      params: {
        title: data.title,
        content: data.content,
      },
    }
  );

  return responseData;
};

// 실천일지 생성
export const createDiary = async (data: CreateDiaryParams) => {
  const formData = new FormData();

  data.images?.forEach((img) => {
    formData.append("images", img);
  });

  const response = await instance.post<CreateBoardResponse>(
    "/api/v1/diary/",
    formData,
    {
      params: {
        title: data.title,
        content: data.content,
        실천항목: data.practiceCategory,
      },
    }
  );

  return response.data;
};

// 토론글 생성
export const createDiscussBoard = async (data: CreateDiscussBoardParams) => {
  const formData = new FormData();

  data.images?.forEach((img) => {
    formData.append("images", img);
  });

  const { data: responseData } = await instance.post<CreateBoardResponse>(
    "/api/v1/discuss-board/",
    formData,
    {
      params: {
        title: data.title,
        content: data.content,
        discussType: data.discussType,
      },
      headers: {
        "Content-Type": undefined,
      },
    }
  );

  return responseData;
};

// 자유게시판 목록 조회
export const getFreeBoardList = (params: {
  page?: number;
  size?: number;
  sortBy?: string;
}) => {
  return instance.get<BoardListResponse>("/api/v1/free-board/", {
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
  return instance.get<BoardListResponse>("/api/v1/discuss-board/", {
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

// 일지 목록 조회
export const getDiaryList = (params: {
  page?: number;
  size?: number;
  sortBy?: string;
}) => {
  return instance.get<BoardListResponse>("/api/v1/diary/", {
    params,
  });
};

// 일지 상세 조회
export const getDiaryBoardDetail = async (id: string | number) => {
  const { data } = await instance.get<DiaryBoardDetailResponse>(
    `/api/v1/diary/${id}`
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
    url = `/api/v1/diary/${id}`;
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

// 토론 댓글 작성
export const createDiscussComment = async (
  postId: number,
  comment: string,
  opinion: "찬성" | "반대"
) => {
  const commentType = opinion === "찬성" ? "PROS" : "CONS";

  const { data } = await instance.post(
    `/api/v1/discuss-board/${postId}/comment`,
    {
      comment,
      commentType,
    }
  );

  return data;
};

// 토론 댓글 삭제
export const deleteDiscussComment = async (commentId: number) => {
  await instance.delete(`/api/v1/discuss-board/comment/${commentId}`);
};

//토론 댓글 수정
export const editDiscussComment = async (
  commentId: number,
  comment: string
) => {
  const { data } = await instance.put(
    `/api/v1/discuss-board/comment/${commentId}`,
    {
      comment,
    }
  );

  return data;
};

//일지 댓글 생성
export const createDiaryComment = async (postId: number, comment: string) => {
  const { data } = await instance.post(`/api/v1/diary/${postId}/comment`, {
    comment,
  });

  return data;
};

//일지 댓글 수정
export const editDiaryComment = async (commentId: number, comment: string) => {
  const { data } = await instance.put(`/api/v1/diary/comment/${commentId}`, {
    comment,
  });

  return data;
};

//일지 댓글 삭제
export const deleteDiaryComment = async (commentId: number) => {
  await instance.delete(`/api/v1/diary/comment/${commentId}`);
};
