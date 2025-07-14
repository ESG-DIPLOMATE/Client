import type { NewsItem } from "@/apis/news/news.type";
import $ from "./NewsCard.module.scss";
import { RiBookmarkFill } from "react-icons/ri";
import { convertMofaUrl } from "@/utils/convertMofaUrl";

interface NewsCardProps {
  news: NewsItem;
  isMain?: boolean;
  onBookmarkToggle?: (id: number) => void;
}

export default function NewsCard({
  news,
  isMain,
  onBookmarkToggle,
}: NewsCardProps) {
  const handleClick = () => {
    const pageUrl = convertMofaUrl(news.url);
    if (pageUrl) {
      window.open(pageUrl, "_blank");
    }
  };

  return (
    <div className={$.card} onClick={handleClick}>
      <div className={$.content}>
        <div className={$.titleWrapper}>
          <h3 className={$.title} style={{ width: isMain ? "100%" : "90%" }}>
            {news.title}
          </h3>

          {news.scrapped !== undefined && onBookmarkToggle && !isMain && (
            <button
              className={$.bookmarkButton}
              onClick={(e) => {
                e.stopPropagation();
                onBookmarkToggle(news.id);
              }}
            >
              <RiBookmarkFill
                size={20}
                color={news.scrapped ? "#007BFF" : "#ADB5BD"}
              />
            </button>
          )}
        </div>
        <p className={$.description}>{news.summary}</p>

        <div className={$.meta}>
          <span className={$.category}>{news.categoryDisplay}</span>
          <span className={$.date}>{news.publishDate}</span>
        </div>
      </div>
    </div>
  );
}
