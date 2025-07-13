import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCitizenTestQuestions, submitCitizenTest } from "@/apis/test/test";
import type { TestQuestion, SubmitTestRequest } from "@/apis/test/test.type";

import QuestionCard from "./components/questionCard";
import NavigationButton from "./components/navigationButton";
import $ from "./Test.module.scss";
import LoadingSpinner from "@/components/common/Spinner";

export default function Test() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getCitizenTestQuestions();
        setQuestions(data.questions);
      } catch (e) {
        console.error(e);
        alert("테스트 질문을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (optionIndex: number) => {
    const selectedOptionId = questions[currentQuestion].options[optionIndex].id;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: selectedOptionId,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const payload: SubmitTestRequest = {
      answers: Object.entries(answers).map(([questionId, optionId]) => ({
        questionId: Number(questionId),
        optionId,
      })),
    };

    try {
      await submitCitizenTest(payload);
      navigate("/testResult");
    } catch (e) {
      console.error(e);
      alert("제출 중 오류가 발생했습니다.");
    }
  };

  if (loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  if (questions.length === 0) return <p>질문이 없습니다.</p>;

  const question = questions[currentQuestion];
  const selectedOptionId = answers[question.id];
  const selectedOptionIndex = selectedOptionId
    ? question.options.findIndex((opt) => opt.id === selectedOptionId)
    : null;

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const hasSelectedOption = selectedOptionId !== undefined;

  return (
    <div className={$.container}>
      <div className={$.header}>
        <div className={$.mainTitle}>
          <h1>글로벌 시민력 테스트</h1>
          <p>총 {questions.length}개의 문항을 통해 시민력을 측정합니다.</p>
        </div>
      </div>

      <div className={$.content}>
        <QuestionCard
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          question={question.content}
          options={question.options.map((opt) => opt.optionText)}
          selectedOption={selectedOptionIndex}
          onOptionSelect={handleOptionSelect}
        />

        <div className={$.buttonContainer}>
          <NavigationButton
            variant="previous"
            onClick={handlePrevious}
            disabled={isFirstQuestion}
          />

          {isLastQuestion ? (
            <NavigationButton
              variant="submit"
              onClick={handleSubmit}
              disabled={!hasSelectedOption}
            />
          ) : (
            <NavigationButton
              variant="next"
              onClick={handleNext}
              disabled={!hasSelectedOption}
            />
          )}
        </div>
      </div>
    </div>
  );
}
