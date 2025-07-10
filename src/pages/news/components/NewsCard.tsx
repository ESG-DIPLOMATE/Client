import $ from "./NewsCard.module.scss";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

interface NewsCardProps {
  title: string;
  description: string;
  thumbnail?: string;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

export default function NewsCard({
  title,
  description,
  thumbnail,
  isBookmarked,
  onBookmarkToggle,
}: NewsCardProps) {
  return (
    <div className={$.card}>
      {thumbnail && <img src={thumbnail} alt={title} className={$.thumbnail} />}
      <div className={$.content}>
        <h3 className={$.title}>{title}</h3>
        <p className={$.description}>{description}</p>
      </div>
      <button className={$.bookmarkButton} onClick={onBookmarkToggle}>
        {isBookmarked ? (
          <BsBookmarkFill className={$.bookmarkIcon} />
        ) : (
          <BsBookmark className={$.bookmarkIcon} />
        )}
      </button>
    </div>
  );
}
