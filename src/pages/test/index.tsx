import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import $ from "./Test.module.scss";
import QuestionCard from "./components/questionCard";
import NavigationButton from "./components/navigationButton";

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function Test() {
  // const navigate = useNavigate();

  // 샘플 질문 데이터 (15개)
  const questions: Question[] = [
    {
      id: 1,
      question: "헌법에서 국민의 기본권으로 명시되지 않은 것은?",
      options: ["자유권", "평등권", "참정권", "사회권", "환경권"],
    },
    {
      id: 2,
      question: "지방자치단체의 종류가 아닌 것은?",
      options: ["특별시", "광역시", "도", "시", "구"],
    },
    {
      id: 3,
      question: "국회의 의결 방법으로 맞지 않는 것은?",
      options: [
        "재적의원 과반수 출석",
        "출석의원 과반수 찬성",
        "위원장 최종 결정",
        "공개 투표",
        "기명 투표",
      ],
    },
    {
      id: 4,
      question: "대통령의 임기는?",
      options: ["4년", "5년", "6년", "7년", "8년"],
    },
    {
      id: 5,
      question: "헌법재판소의 구성원은?",
      options: ["6명", "7명", "8명", "9명", "10명"],
    },
    {
      id: 6,
      question: "선거권 연령은?",
      options: ["18세", "19세", "20세", "21세", "22세"],
    },
    {
      id: 7,
      question: "국민투표 대상이 아닌 것은?",
      options: ["헌법 개정", "주요 정책", "조약", "법률", "예산"],
    },
    {
      id: 8,
      question: "국정감사의 주체는?",
      options: ["대통령", "국무총리", "국회", "대법원", "헌법재판소"],
    },
    {
      id: 9,
      question: "지방자치단체의 장의 임기는?",
      options: ["2년", "3년", "4년", "5년", "6년"],
    },
    {
      id: 10,
      question: "국회의원의 임기는?",
      options: ["2년", "3년", "4년", "5년", "6년"],
    },
    {
      id: 11,
      question: "대법원장의 임기는?",
      options: ["4년", "5년", "6년", "7년", "8년"],
    },
    {
      id: 12,
      question: "지방의회의 의결 정족수는?",
      options: ["3분의 1", "과반수", "3분의 2", "4분의 3", "만장일치"],
    },
    {
      id: 13,
      question: "헌법 개정 발의 요건은?",
      options: [
        "국회의원 3분의 1 이상",
        "국회의원 과반수 이상",
        "국회의원 3분의 2 이상",
        "대통령 단독",
        "국민 10만명 이상",
      ],
    },
    {
      id: 14,
      question: "지방자치단체의 구분이 아닌 것은?",
      options: ["특별시", "광역시", "시", "읍", "면"],
    },
    {
      id: 15,
      question: "국정감사의 기간은?",
      options: ["1개월", "2개월", "3개월", "4개월", "6개월"],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const handleOptionSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
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

  const handleSubmit = () => {
    console.log("답변:", answers);
    alert("테스트가 완료되었습니다!");
    // navigate('/test-result');
  };

  const isLastQuestion = currentQuestion === questions.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const hasSelectedOption = answers[currentQuestion] !== undefined;

  return (
      <div className={$.container}>
        <div className={$.header}>
          {/* <div className={$.titleContainer}>
            <span>국민 누구나 일상에서 외교에 참여할 수 있어요!</span>
            <span>시민 외교관, 함께 해볼까요?</span>
          </div> */}
          <div className={$.mainTitle}>
            <h1>글로벌 시민력 테스트</h1>
            <p>총 15개의 문항을 통해 시민력을 측정합니다.</p>
          </div>
        </div>

        <div className={$.content}>
          <QuestionCard
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            selectedOption={answers[currentQuestion]}
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