import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import KeywordChip from "@/components/Chip/KeywordChip";
import NewsCard from "@/pages/news/components/NewsCard";

import { getMyScraps } from "@/apis/news/news";
import type { NewsItem } from "@/apis/news/news.type";

import $ from "./MyNews.module.scss";
import LoadingSpinner from "@/components/common/Spinner";

export default function MyNews() {
  const navigate = useNavigate();

  const keywords = ["전체", "ESG", "기후", "문화", "경제", "인권"];
  const [selectedKeyword, setSelectedKeyword] = useState("전체");

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMyScraps();
  }, []);

  const fetchMyScraps = async () => {
    setLoading(true);
    const data = await getMyScraps(0, 20);
    setNewsList(data.scraps);
    setLoading(false);
  };

  const handleBookmarkToggle = (id: number) => {
    setNewsList((prev) => prev.filter((item) => item.newsId !== id));
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const filteredList =
    selectedKeyword === "전체"
      ? newsList
      : newsList.filter((item) => item.categoryDisplay === selectedKeyword);

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
      </div>

      <div className={$.container}>
        <header className={$.header}>
          <h1 className={$.title}>스크랩한 외교뉴스</h1>
        </header>

        <section className={$.section}>
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

          {loading ? (
            <LoadingSpinner />
          ) : filteredList.length === 0 ? (
            <p className={$.emptyText}>스크랩한 뉴스가 없습니다.</p>
          ) : (
            <div className={$.newsList}>
              {filteredList.map((news) => (
                <NewsCard
                  key={news.newsId}
                  news={news}
                  onBookmarkToggle={() => handleBookmarkToggle(news.newsId)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
