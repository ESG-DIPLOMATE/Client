import $ from "./KeywordChip.module.scss";

interface KeywordChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function KeywordChip({
  label,
  isActive,
  onClick,
}: KeywordChipProps) {
  return (
    <button
      className={`${$.chip} ${isActive ? $.active : ""}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
