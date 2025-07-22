// 테스트 문항 타입
export interface TestQuestion {
  id: number;
  // content: 질문
  content: string;
  // options: 선택지
  options: {
    id: number;
    optionText: string;
  }[];
}

// 테스트 문항 리스트 조회 api 타입
export interface CitizenTestQuestionsResponse {
  questions: TestQuestion[];
}

// 테스트 답안 제출 api 타입
export interface SubmitTestRequest {
  answers: {
    questionId: number;
    optionId: number;
  }[];
}

// 테스트 결과 조회 api 타입
export interface CitizenTestResultResponse {
  displayName: string;
  description: string;
  characteristics?: string;
  keywords?: string;
  summary?: string;
  recommendedNews: RecommendedNewsItem[];
  recommendedPrograms: RecommendedProgram[];
}

// 결과 조회시 외교뉴스 추천
export interface RecommendedNewsItem {
  title: string;
  url: string;
  publishDate: string;
  summary: string;
}

// 결과 조회시 외교활동(프로그램) 추천
export interface RecommendedProgram {
  businessName: string;
  businessPurpose: string;
}
