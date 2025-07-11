import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

import $ from "./PostDetail.module.scss";
import ImageSlider from "@/components/Slider";
import CommentList from "@/components/common/comment/CommentList";
import CommentInput from "@/components/common/comment/CommentInput";
import AppBar from "@/components/common/Appbar";
import { useNavigate } from "react-router-dom";

export interface PostEditorFormData {
  title: string;
  content: string;
  dropdownValue?: string;
  images?: File[];
}

export type PostDetailProps = {
  isMine: boolean;
  type: "free" | "diary" | "debate";
  title: string;
  date: string;
  authorId: string;
  category?: string;
  content: string;
  images: string[];
  likeCount: number;
  commentCount: number;
  comments: { id: number; authorId: string; content: string; date: string }[];
};

export default function PostDetail({
  isMine,
  type,
  title,
  date,
  authorId,
  category,
  content,
  images,
  likeCount,
  commentCount,
  comments,
}: PostDetailProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
      </div>
      <div className={$.container}>
        {isMine && (
          <div className={$.actions}>
            수정
            <span className={$.divider}>|</span>
            삭제
          </div>
        )}{" "}
        <div className={$.topRow}>
          <span className={$.date}>작성일 | {date}</span>
          {type !== "free" && category && (
            <span className={$.category}>
              {type === "diary" ? `항목 | ${category}` : `분야 | ${category}`}
            </span>
          )}
        </div>
        <div className={$.author}>작성자 | {authorId}</div>
        <h2 className={$.title}>{title}</h2>
        {images.length > 0 && (
          <div className={$.imageWrapper}>
            <ImageSlider images={images} />
          </div>
        )}{" "}
        <div className={$.content}>{content}</div>
        <div className={$.meta}>
          <div className={$.left}>
            <div className={$.like} onClick={handleLike}>
              {isLiked ? (
                <AiFillHeart size={20} color="#3B82F6" />
              ) : (
                <AiOutlineHeart size={20} color="#9CA3AF" />
              )}
              <span>{likeCount}</span>
            </div>
            <div className={$.commentsIcon}>
              <AiOutlineComment size={20} />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
        <CommentInput
          type={type}
          onSubmit={(text, stance) => {
            console.log("댓글 제출", text, stance);
          }}
        />
        <CommentList comments={comments} type={type} />
      </div>
    </div>
  );
}
