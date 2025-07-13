import { useState } from "react";
import $ from "./CommentList.module.scss";

export type Comment = {
  id: number;
  userId: string;
  content: string;
  commentType?: "PROS" | "CONS";
  createdAt: string;
  updatedAt: string;
  owner: boolean;
};

export type CommentListProps = {
  comments: Comment[];
  type: "free" | "debate" | "diary";
  onEdit?: (commentId: number, content: string) => void;
  onDelete?: (commentId: number) => void;
};

export default function CommentList({
  comments,
  type,
  onEdit,
  onDelete,
}: CommentListProps) {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");

  return (
    <div className={$.list}>
      {comments.map((comment) => {
        const opinion =
          comment.commentType === "PROS"
            ? "찬성"
            : comment.commentType === "CONS"
            ? "반대"
            : undefined;

        const isEditing = editingCommentId === comment.id;

        return (
          <div key={comment.id} className={$.item}>
            <div className={$.header}>
              <div className={$.tagWrapper}>
                {type === "debate" && opinion && (
                  <span
                    className={`${$.tag} ${opinion === "찬성" ? $.pro : $.con}`}
                  >
                    {opinion}
                  </span>
                )}
                <span className={$.author}>{comment.userId}</span>
              </div>
              <span className={$.date}>
                {comment.createdAt.slice(0, 10).replaceAll("-", ".")}
              </span>
            </div>

            <div className={$.content}>
              {isEditing ? (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className={$.textarea}
                />
              ) : (
                comment.content
              )}
            </div>

            <div className={$.right}>
              {comment.owner && (
                <div className={$.actions}>
                  {!isEditing ? (
                    <>
                      <button
                        onClick={() => {
                          setEditingCommentId(comment.id);
                          setEditContent(comment.content);
                        }}
                      >
                        수정
                      </button>
                      <span className={$.divider}>|</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete?.(comment.id);
                        }}
                      >
                        삭제
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        if (editContent.trim() === "") {
                          return;
                        }
                        onEdit?.(comment.id, editContent);
                        setEditingCommentId(null);
                        setEditContent("");
                      }}
                    >
                      완료
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
