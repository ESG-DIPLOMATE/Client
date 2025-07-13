import { useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";

import $ from "./PostDetail.module.scss";
import ImageSlider from "@/components/Slider";
import CommentList from "@/components/common/comment/CommentList";
import CommentInput from "@/components/common/comment/CommentInput";
import AppBar from "@/components/common/Appbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createDiaryComment,
  createDiscussComment,
  createFreeComment,
  deleteDiaryComment,
  deleteDiscussComment,
  deleteFreeComment,
  deletePost,
  editDiaryComment,
  editDiscussComment,
  editFreeComment,
  toggleLike,
} from "@/apis/community/community";
import { toast } from "react-toastify";
import Modal from "@/components/common/Modal";

export interface PostEditorFormData {
  title: string;
  content: string;
  dropdownValue?: string;
  images?: File[];
}

export type Comment = {
  id: number;
  userId: string;
  authorId?: string;
  content: string;
  commentType?: "PROS" | "CONS";
  createdAt: string;
  updatedAt: string;
  owner: boolean;
};

export type PostDetailProps = {
  owner: boolean;
  type: "free" | "diary" | "debate";
  title: string;
  date: string;
  authorId: string;
  category?: string;
  discussTypeDisplay?: string;
  content: string;
  images: string[];
  likeCount: number;
  liked: boolean;
  commentCount: number;
  comments: Comment[];
};

export default function PostDetail({
  owner,
  type,
  title,
  date,
  authorId,
  category,
  discussTypeDisplay,
  content,
  images,
  likeCount,
  liked,
  commentCount,
  comments,
}: PostDetailProps) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : undefined;
  const location = useLocation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!numericId) {
    return <p>잘못된 요청입니다.</p>;
  }
  const handleLike = async () => {
    try {
      const targetTypeMap = {
        free: "FreeBoard",
        debate: "DiscussBoard",
        diary: "Diary",
      };

      const res = await toggleLike(targetTypeMap[type], numericId);
      setIsLiked(res.data.liked);
      setLikeCountState(res.data.likeCount);
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    }
  };

  const handleCommentSubmit = async (
    text: string,
    stance?: "찬성" | "반대"
  ) => {
    try {
      if (type === "debate") {
        await createDiscussComment(Number(id), text, stance!);
      } else if (type === "diary") {
        await createDiaryComment(Number(id), text);
      } else if (type === "free") {
        await createFreeComment(Number(id), text);
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    }
  };

  const handleCommentEdit = async (commentId: number, content: string) => {
    try {
      if (type === "debate") {
        await editDiscussComment(commentId, content);
      } else if (type === "diary") {
        await editDiaryComment(commentId, content);
      } else if (type === "free") {
        await editFreeComment(commentId, content);
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      if (type === "debate") {
        await deleteDiscussComment(commentId);
      } else if (type === "diary") {
        await deleteDiaryComment(commentId);
      } else if (type === "free") {
        await deleteFreeComment(commentId);
      }
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    }
  };
  const editPaths = {
    free: "/free/new",
    debate: "/debate/new",
    diary: "/diary/new",
  };

  const handleBack = () => {
    const from = location.state?.from;
    console.log(from);

    if (from && from === "postPage") {
      navigate(-2);
    } else {
      navigate(-1);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePost(type, numericId);
      toast("삭제되었습니다.");
      navigate(-2);
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={handleBack} />
      </div>
      <div className={$.container}>
        {owner && (
          <div className={$.actions}>
            <button
              onClick={() => navigate(`${editPaths[type]}?id=${numericId}`)}
            >
              수정
            </button>
            <span className={$.divider}>|</span>
            <button onClick={handleDelete}>삭제</button>
          </div>
        )}
        <div className={$.topRow}>
          <span className={$.date}>작성일 | {date}</span>
          {type !== "free" && category && (
            <span className={$.category}>
              {type === "diary"
                ? `항목 | ${category}`
                : `분야 | ${discussTypeDisplay}`}
            </span>
          )}
        </div>
        <div className={$.author}>작성자 | {authorId}</div>
        <h2 className={$.title}>{title}</h2>
        {images.length > 0 && (
          <div className={$.imageWrapper}>
            <ImageSlider images={images} />
          </div>
        )}
        <div className={$.content}>{content}</div>
        <div className={$.meta}>
          <div className={$.left}>
            <div className={$.like} onClick={handleLike}>
              {isLiked ? (
                <AiFillHeart size={20} color="#3B82F6" />
              ) : (
                <AiOutlineHeart size={20} color="#9CA3AF" />
              )}
              <span>{likeCountState}</span>
            </div>
            <div className={$.commentsIcon}>
              <AiOutlineComment size={20} />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
        <CommentInput type={type} onSubmit={handleCommentSubmit} />
        <CommentList
          comments={comments}
          type={type}
          onEdit={handleCommentEdit}
          onDelete={handleCommentDelete}
        />
      </div>
      {showDeleteModal && (
        <Modal onConfirm={confirmDelete} onCancel={cancelDelete}>
          정말로 이 게시글을 삭제하시겠습니까?
        </Modal>
      )}
    </div>
  );
}
