import type { NewsItem } from "@/apis/news/news.type";
import $ from "./NewsCard.module.scss";
import { RiBookmarkFill } from "react-icons/ri";
import { convertMofaUrl } from "@/utils/convertMofaUrl";

interface NewsCardProps {
  news: NewsItem;
  onBookmarkToggle: (id: number) => void;
}

export default function NewsCard({ news, onBookmarkToggle }: NewsCardProps) {
  const handleClick = () => {
    const pageUrl = convertMofaUrl(news.url);
    if (pageUrl) {
      window.open(pageUrl, "_blank");
    }
  };

  return (
    <div className={$.card} onClick={handleClick}>
      <div className={$.content}>
        <h3 className={$.title}>{news.title}</h3>
        <p className={$.description}>{news.summary}</p>

        <div className={$.meta}>
          <span className={$.category}>{news.categoryDisplay}</span>
          <span className={$.date}>{news.publishDate}</span>
        </div>
      </div>

      <button
        className={$.bookmarkButton}
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle(news.id);
        }}
      >
        <RiBookmarkFill
          size={20}
          color={news.scrapped ? "#007BFF" : "#ADB5BD"} // 파랑 or 회색
        />
      </button>
    </div>
  );
}
