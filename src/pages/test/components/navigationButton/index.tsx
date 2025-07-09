import $ from "./NavigationButton.module.scss";

interface NavigationButtonProps {
  variant: "previous" | "next" | "submit";
  onClick: () => void;
  disabled?: boolean;
}

const NavigationButton = ({
  variant,
  onClick,
  disabled = false,
}: NavigationButtonProps) => {
  const getButtonText = () => {
    switch (variant) {
      case "previous":
        return "이전";
      case "next":
        return "다음";
      case "submit":
        return "제출";
      default:
        return "버튼";
    }
  };

  return (
    <button
      className={`${$.btn} ${$[variant]} ${disabled ? $.disabled : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {getButtonText()}
    </button>
  );
};

export default NavigationButton;
