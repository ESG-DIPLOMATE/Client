import { useState } from "react";
import $ from "./PreviewCard.module.scss";
import { AiFillHeart } from "react-icons/ai";
import { toggleLike } from "@/apis/community/community";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
      toast("잠시 후 다시 시도해주세요.");
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`${editPaths[type]}?id=${post.id}`);
  };

  const displayCategory =
    type === "debate" && post.category
      ? discussTypeMap[post.category] || post.category
      : post.category;

  const editPaths = {
    free: "/free/new",
    debate: "/debate/new",
    diary: "/diary/new",
  };

  return (
    <div className={$.postCard} onClick={onClick}>
      <div className={$.header}>
        <div className={$.headerLeft}>
          {type === "debate" && displayCategory && (
            <span className={$.category}>{displayCategory}</span>
          )}
          <span className={$.title}>{post.title}</span>
        </div>

        <div className={$.heartIcon} onClick={handleLike}>
          <AiFillHeart size={20} color={isLiked ? "#3B82F6" : "#9CA3AF"} />
        </div>
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
              <button onClick={handleEdit}>수정</button>
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
