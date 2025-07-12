import { useState } from "react";
import $ from "./PreviewCard.module.scss";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toggleLike } from "@/apis/community/community";

export interface Preview {
  id: number;
  category?: string;
  title: string;
  preview: string;
  authorId?: string;
  date: string;
  likes?: number;
  liked?: boolean;
  owner: boolean;
}

interface PreviewCardProps {
  post: Preview;
  type: "free" | "diary" | "debate";
  owner: boolean;
  onClick?: () => void;
  onDelete?: () => void;
}

const discussTypeMap: Record<string, string> = {
  ENVIRONMENT: "환경",
  CULTURE: "문화",
  ECONOMY: "경제",
  PEACE: "평화",
};

const PreviewCard = ({
  post,
  type,
  owner,
  onClick,
  onDelete,
}: PreviewCardProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const targetTypeMap = {
        free: "FreeBoard",
        debate: "DiscussBoard",
        diary: "Diary",
      };
      const res = await toggleLike(targetTypeMap[type], post.id);
      setIsLiked(res.data.liked);
    } catch (e) {
      console.error(e);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

  const displayCategory =
    type === "debate" && post.category
      ? discussTypeMap[post.category] || post.category
      : post.category;

  return (
    <div className={$.postCard} onClick={onClick}>
      <div className={$.header}>
        <div className={$.headerLeft}>
          {type === "debate" && displayCategory && (
            <span className={$.category}>{displayCategory}</span>
          )}
          <span className={$.title}>{post.title}</span>
        </div>

        {!owner && (
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
          {owner && (
            <div className={$.actions}>
              <button>수정</button>
              <span className={$.divider}>|</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.();
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
