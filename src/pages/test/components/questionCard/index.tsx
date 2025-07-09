import $ from "./QuestionCard.module.scss";

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  options: string[];
  selectedOption: number | null;
  onOptionSelect: (optionIndex: number) => void;
}

const QuestionCard = ({
  questionNumber,
  totalQuestions,
  question,
  options,
  selectedOption,
  onOptionSelect,
}: QuestionCardProps) => {
  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className={$.container}>
      <div className={$.header}>
        <div className={$.questionNumber}>문항 {questionNumber}번</div>
        <div className={$.progressBar}>
          <div className={$.progressTrack}>
            <div
              className={$.progressFill}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className={$.content}>
        <div className={$.questionText}>{question}</div>

        <div className={$.optionsContainer}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${$.optionItem} ${
                selectedOption === index ? $.selected : ""
              }`}
              onClick={() => onOptionSelect(index)}
            >
              <div className={$.optionRadio}>
                {selectedOption === index && (
                  <div className={$.radioSelected} />
                )}
              </div>
              <span className={$.optionText}>{option}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
