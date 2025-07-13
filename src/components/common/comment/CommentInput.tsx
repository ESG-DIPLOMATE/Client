import { useState } from "react";
import Button from "@/components/common/Button";
import $ from "./CommentInput.module.scss";

export type CommentInputProps = {
  type: "free" | "debate" | "diary";
  onSubmit: (text: string, stance?: "찬성" | "반대") => void;
};

export default function CommentInput({ type, onSubmit }: CommentInputProps) {
  const [text, setText] = useState("");
  const [stance, setStance] = useState<"찬성" | "반대" | null>(null);

  const handleSubmit = () => {
    onSubmit(text, stance || undefined);
    setText("");
    setStance(null);
  };

  return (
    <div className={$.wrapper}>
      {type === "debate" && (
        <div className={$.stanceBtns}>
          <Button
            variant={stance === "찬성" ? "primary" : "secondary"}
            size="small"
            onClick={() => setStance("찬성")}
          >
            찬성
          </Button>
          <Button
            variant={stance === "반대" ? "primary" : "secondary"}
            size="small"
            onClick={() => setStance("반대")}
          >
            반대
          </Button>
        </div>
      )}
      <textarea
        className={$.textarea}
        rows={3}
        placeholder="댓글을 입력하세요."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="primary"
        size="small"
        onClick={handleSubmit}
        disabled={text.trim() === "" || (type === "debate" && stance === null)}
      >
        {type === "debate" ? "의견 달기" : "댓글 달기"}
      </Button>
    </div>
  );
}
