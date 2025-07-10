import { useState } from "react";
import $ from "./PreviewCard.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export interface Preview {
  id: number;
  category?: string;
  title: string;
  preview: string;
  authorId?: string;
  date: string;
}

interface PreviewCardProps {
  post: Preview;
  type: "free" | "diary" | "debate";
  onClick?: () => void;
}

const PreviewCard = ({ post, type, onClick }: PreviewCardProps) => {
  const isMine = !post.authorId;
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <div className={$.postCard} onClick={onClick}>
      <div className={$.header}>
        <div className={$.headerLeft}>
          {type === "debate" && post.category && (
            <span className={$.category}>{post.category}</span>
          )}
          <span className={$.title}>{post.title}</span>
        </div>

        {!isMine && (
          <div className={$.heartIcon} onClick={handleLike}>
            {isLiked ? (
              <AiFillHeart size={20} color="#3B82F6" />
            ) : (
              <AiOutlineHeart size={20} color="#9CA3AF" />
            )}
          </div>
        )}
      </div>

      <div className={$.preview}>{post.preview}</div>

      <div className={$.footer}>
        <div className={$.left}>
          {post.authorId && <span className={$.author}>{post.authorId}</span>}
          <span className={$.date}>{post.date}</span>
        </div>

        <div className={$.right}>
          {isMine && (
            <div className={$.actions}>
              <button>수정</button>
              <span className={$.divider}>|</span>
              <button>삭제</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
