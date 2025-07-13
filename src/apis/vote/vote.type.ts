export interface OdaVoteCandidate {
  id: number;
  odaProject: {
    id: number;
    title: string;
    content: string;
    url: string;
    category: string;
    countryName: string;
    projectStartDate: string;
    projectEndDate: string;
    budget: string;
    publishDate: string;
    matchScore: number;
    summary: string;
  };
  voteCount: number;
  votePercentage: number;
  rank: number;
}

export interface OdaVoteResponse {
  id: number;
  year: number;
  month: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  candidates: OdaVoteCandidate[];
  totalVoteCount: number;
  hasUserVoted: boolean;
  userVotedCandidateId: number | null;
}

export interface OdaVoteRequest {
  candidateId: number;
}

export interface DiaryVoteCandidate {
  candidateId: number;
  diaryId: number;
  diaryTitle: string;
  diaryDescription: string;
  diaryAction: string;
  authorName: string;
  diaryCreatedAt: string;
  diaryLikes: number;
  diaryViewCount: number;
  voteCount: number;
  ranking: number;
}

export interface DiaryVoteResponse {
  id: number;
  year: number;
  month: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  totalVotes: number;
  candidates: DiaryVoteCandidate[];
  hasUserVoted: boolean;
  userVotedCandidateId: number | null;
  userVotedAt: string;
}

export interface DiaryVoteRequest {
  candidateId: number;
}
