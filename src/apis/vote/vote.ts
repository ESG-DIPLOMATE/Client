import instance from "@/apis/instance";
import type {
  OdaVoteResponse,
  OdaVoteRequest,
  DiaryVoteResponse,
  DiaryVoteRequest,
} from "./vote.type";

// ODA 투표 조회
export const fetchOdaVote = () => {
  return instance.get<OdaVoteResponse>(
    "/api/v1/oda-vote/current/with-user-info"
  );
};

// ODA 투표 참여
export const voteOda = (body: OdaVoteRequest) => {
  return instance.post("/api/v1/oda-vote/vote", body);
};

// 실천일지 투표 조회
export const fetchDiaryVote = () => {
  return instance.get<{
    success: boolean;
    message: string;
    data: DiaryVoteResponse;
  }>("/api/v1/monthly-vote/current");
};

// 실천일지 투표 참여
export const voteDiary = (body: DiaryVoteRequest) => {
  return instance.post("/api/v1/monthly-vote/vote", body);
};
