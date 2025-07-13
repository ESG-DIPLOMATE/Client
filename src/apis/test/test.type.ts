export interface TestOption {
  id: number;
  optionText: string;
  optionOrder: number;
}

export interface TestQuestion {
  id: number;
  content: string;
  questionOrder: number;
  options: TestOption[];
}

export interface CitizenTestQuestionsResponse {
  questions: TestQuestion[];
  totalQuestions: number;
  message: string;
}

export interface TestAnswer {
  questionId: number;
  optionId: number;
}

export interface SubmitTestRequest {
  answers: TestAnswer[];
}

export interface RecommendedNewsItem {
  title: string;
  url: string;
  publishDate: string;
  summary: string;
  matchScore: number;
}

export interface RecommendedProgram {
  countryName: string;
  businessName: string;
  businessPurpose: string;
  businessTarget: string;
  unitBusiness: string;
  businessYear: number;
  matchScore: number;
}

export interface CitizenTestResultResponse {
  resultType: string;
  displayName: string;
  description: string;
  detailedDescription?: string;
  characteristics?: string;
  keywords?: string;
  summary?: string;
  imageUrl?: string;
  recommendedNews: RecommendedNewsItem[];
  recommendedPrograms: RecommendedProgram[];
  message: string;
}
