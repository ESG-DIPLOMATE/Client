// Oda 투표 후보 리스트 조회
export interface OdaVoteResponse {
  id: number;
  candidates: OdaVoteCandidate[];
  hasUserVoted: boolean;
  userVotedCandidateId: number | null;
}

// Oda 투표 후보 타입
export interface OdaVoteCandidate {
  id: number;
  odaProject: {
    id: number;
    title: string;
    url: string;
    summary: string;
  };
}

// 실천일지 투표 후보 리스트 조회
export interface DiaryVoteResponse {
  id: number;
  title: string;
  candidates: DiaryVoteCandidate[];
  hasUserVoted: boolean;
  userVotedCandidateId: number | null;
}

// 실천일지 후보 타입
export interface DiaryVoteCandidate {
  candidateId: number;
  diaryId: number;
  diaryTitle: string;
  diaryDescription: string;
  authorName: string;
}

// 투표하기 타입
export interface VoteRequest {
  candidateId: number;
}

// 월별 투표 결과 조회 타입
export interface MonthlyVoteResultResponse {
  id: number;
  // 이달의 외교 실천왕
  title: string;
  candidates: DiaryVoteCandidate[];
  // 의미있는 ODA 사업 투표
  odaVoteTitle: string;
  odaCandidates: OdaVoteCandidate[];
}
