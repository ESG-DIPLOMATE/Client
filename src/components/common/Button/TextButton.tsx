import { HiOutlinePencilSquare } from "react-icons/hi2";
import $ from "./TextButton.module.scss";

interface TextButtonProps {
  text?: string;
  onClick: () => void;
}

export default function TextButton({ text, onClick }: TextButtonProps) {
  return (
    <button className={$.newPostBtn} onClick={onClick}>
      <HiOutlinePencilSquare size={18} />
      <span>{text}</span>
    </button>
  );
}
