import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import $ from "./LikeCommentBar.module.scss";

interface Props {
  likes: number;
  comments: number;
}

export default function LikeCommentBar({ likes, comments }: Props) {
  return (
    <div className={$.bar}>
      <div className={$.item}>
        <AiOutlineHeart size={20} className={$.icon} />
        <span>{likes}</span>
      </div>
      <div className={$.item}>
        <AiOutlineComment size={20} className={$.icon} />
        <span>{comments}</span>
      </div>
    </div>
  );
}
