import { HiOutlinePencilSquare } from "react-icons/hi2";
import $ from "./TextButton.module.scss";

interface TextButtonProps {
  text: string;
  onClick: () => void;
  underline?: boolean;
  icon?: boolean;
}

export default function TextButton({
  text,
  onClick,
  underline = false,
  icon = false,
}: TextButtonProps) {
  return (
    <button
      className={`${$.newPostBtn} ${underline ? $.underline : ""}`}
      onClick={onClick}
    >
      {icon && <HiOutlinePencilSquare size={18} />}
      <span>{text}</span>
    </button>
  );
}
