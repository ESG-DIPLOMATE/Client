import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import $ from "./LineCard.module.scss";

interface LineCardProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  type: "free" | "debate";
  likeCount: number;
  commentCount: number;
}

export default function LineCard({
  id,
  title,
  content,
  createdAt,
  type,
  likeCount,
  commentCount,
}: LineCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className={$.card} onClick={handleClick}>
      <div className={$.topRow}>
        <span className={$.title}>{title}</span>
      </div>
      <div className={$.content}>{content}</div>
      <div className={$.bottomRow}>
        <span className={$.date}>
          {createdAt.slice(5, 10).replace("-", "/")}
        </span>
        <div className={$.icons}>
          <span className={$.icon}>
            <AiOutlineHeart size={16} /> {likeCount}
          </span>
          <span className={$.icon}>
            <AiOutlineComment size={16} /> {commentCount}
          </span>
        </div>
      </div>
    </div>
  );
}
