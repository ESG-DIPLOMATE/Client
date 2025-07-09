import { useState } from "react";
import $ from "./News.module.scss";
import KeywordChip from "@/components/Chip/KeywordChip";

export default function News() {
  const typeName = "평화중재형";

  const keywords = ["전체", "ESG", "기후", "문화", "경제", "인권"];

  const [selectedKeyword, setSelectedKeyword] = useState("전체");

  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword);
  };

  return (
    <div className={$.wrapper}>
      <header className={$.header}>
        <h1 className={$.title}>외교뉴스</h1>
      </header>

      <section className={$.section}>
        <p className={$.subTitle}>
          맞춤형 외교뉴스 -<span className={$.typeName}>{typeName}</span>
        </p>
        <div className={$.card}>
          <div className={$.placeholderBox}></div>
          <div className={$.placeholderBox}></div>
        </div>
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

        <div className={$.card}>
          <div className={$.placeholderBox}></div>
          <div className={$.placeholderBox}></div>
          <div className={$.placeholderBox}></div>
        </div>
      </section>
    </div>
  );
}
