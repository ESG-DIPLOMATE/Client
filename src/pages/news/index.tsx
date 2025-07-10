import { useState } from "react";
import $ from "./News.module.scss";
import KeywordChip from "@/components/Chip/KeywordChip";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import NewsCard from "./components/NewsCard";

export default function News() {
  const navigate = useNavigate();

  const typeName = "평화중재형";

  const keywords = ["전체", "ESG", "기후", "문화", "경제", "인권"];

  const [selectedKeyword, setSelectedKeyword] = useState("전체");
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const onBack = () => {
    navigate(-1);
  };

  const toggleBookmark = (id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const newsListforMe = [
    { id: 1, title: "맞춤형 뉴스 제목 1", description: "맞춤형 뉴스 설명 1" },
    { id: 2, title: "맞춤형 뉴스 제목 2", description: "맞춤형 뉴스 설명 2" },
    { id: 3, title: "맞춤형 뉴스 제목 3", description: "맞춤형 뉴스 설명 3" },
  ];

  const newsList = [
    { id: 1, title: "뉴스 제목 1", description: "뉴스 설명 1" },
    { id: 2, title: "뉴스 제목 2", description: "뉴스 설명 2" },
    { id: 3, title: "뉴스 제목 3", description: "뉴스 설명 3" },
  ];

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
      <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>
      <div className={$.container}>
        <header className={$.header}>
          <h1 className={$.title}>외교뉴스</h1>
        </header>

        <section className={$.section}>
          <p className={$.subTitle}>
            맞춤형 외교뉴스 - <span className={$.typeName}>{typeName}</span>
          </p>
          {newsListforMe.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              description={news.description}
              isBookmarked={bookmarks.includes(news.id)}
              onBookmarkToggle={() => toggleBookmark(news.id)}
            />
          ))}
        </section>

        <section className={$.section}>
          <div className={$.newsHeader}>
            <h2>외교뉴스 전체보기</h2>
          </div>
          <div className={$.keywordScroll}>
            {keywords.map((keyword) => (
              <KeywordChip
                key={keyword}
                label={keyword}
                isActive={selectedKeyword === keyword}
                onClick={() => handleKeywordClick(keyword)}
              />
            ))}
          </div>

          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              description={news.description}
              isBookmarked={bookmarks.includes(news.id)}
              onBookmarkToggle={() => toggleBookmark(news.id)}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
