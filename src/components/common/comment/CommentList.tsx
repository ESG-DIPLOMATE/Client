import $ from "./CommentList.module.scss";

export type Comment = {
  id: number;
  authorId: string;
  content: string;
  date: string;
  opinion?: "찬성" | "반대";
};

export type CommentListProps = {
  comments: Comment[];
  type: "free" | "debate" | "diary";
};

export default function CommentList({ comments, type }: CommentListProps) {
  return (
    <div className={$.list}>
      {comments.map((comment) => (
        <div key={comment.id} className={$.item}>
          <div className={$.header}>
          <div className={$.tagWrapper}>
              {type === "debate" && comment.opinion && (
              <span
                className={`${$.tag} ${
                  comment.opinion === "찬성" ? $.pro : $.con
                }`}
              >
                {comment.opinion}
              </span>
            )}
            <span className={$.author}>{comment.authorId}</span></div>
            <span className={$.date}>{comment.date}</span>
          </div>
          <div className={$.content}>{comment.content}</div>
        </div>
      ))}
    </div>
  );
}
