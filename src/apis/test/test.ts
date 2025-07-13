import instance from "../instance";
import type {
  CitizenTestQuestionsResponse,
  CitizenTestResultResponse,
  SubmitTestRequest,
} from "./test.type";

// 질문 조회
export const getCitizenTestQuestions = () => {
  return instance.get<CitizenTestQuestionsResponse>(
    "/api/v1/citizen-test/questions"
  );
};

// 답변 제출
export const submitCitizenTest = (data: SubmitTestRequest) => {
  return instance.post<CitizenTestResultResponse>(
    "/api/v1/citizen-test/submit",
    data
  );
};

// 내 결과 조회
export const fetchMyTestResult = () => {
  return instance.get<CitizenTestResultResponse>(
    "/api/v1/citizen-test/my-result"
  );
};
