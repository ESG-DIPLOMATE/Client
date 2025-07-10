import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import KeywordChip from "@/components/Chip/KeywordChip";
import $ from "./MyNews.module.scss";
import NewsCard from "@/pages/news/components/NewsCard";

export default function MyNews() {
  const navigate = useNavigate();

  const keywords = ["전체", "ESG", "기후", "문화", "경제", "인권"];
  const [selectedKeyword, setSelectedKeyword] = useState("전체");

  const initialNewsList = [
    {
      id: 1,
      title: "ESG 외교 새 지평을 열다",
      description: "환경, 사회, 지배구조를 다룬 외교 이슈를 소개합니다.",
      category: "ESG",
    },
    {
      id: 2,
      title: "문화 외교의 새로운 흐름",
      description: "K-컬쳐가 외교의 도구로 떠오르고 있습니다.",
      category: "문화",
    },
    {
      id: 3,
      title: "기후변화 협약 주요 쟁점",
      description: "국제사회가 직면한 기후 이슈를 정리했습니다.",
      category: "기후",
    },
  ];

  const [newsList, setNewsList] = useState(initialNewsList);

  const handleBookmarkToggle = (id: number) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  const filteredList =
    selectedKeyword === "전체"
      ? newsList
      : newsList.filter((item) => item.category === selectedKeyword);

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

          {filteredList.length === 0 ? (
            <p className={$.emptyText}>스크랩한 뉴스가 없습니다.</p>
          ) : (
            filteredList.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                description={news.description}
                isBookmarked={true}
                onBookmarkToggle={() => handleBookmarkToggle(news.id)}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
