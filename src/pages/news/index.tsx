import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPersonalizedNews,
  getAllNews,
  toggleNewsScrap,
} from "@/apis/news/news";
import type { NewsItem } from "@/apis/news/news.type";
import KeywordChip from "@/components/Chip/KeywordChip";
import AppBar from "@/components/common/Appbar";
import NewsCard from "./components/NewsCard";
import TextButton from "@/components/common/Button/TextButton";
import $ from "./News.module.scss";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/common/Spinner";

const keywordMap: Record<string, string> = {
  전체: "ALL",
  ESG: "ESG",
  기후: "CLIMATE",
  문화: "CULTURE",
  경제: "ODA",
};

export default function News() {
  const navigate = useNavigate();

  const keywords = ["전체", "ESG", "기후", "문화", "경제"];

  const [newsListforMe, setNewsListforMe] = useState<NewsItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [selectedKeyword, setSelectedKeyword] = useState("ALL");

  const [myCitizenType, setMyCitizenType] = useState<string | null>(null);
  const [myCitizenTypeDisplay, setMyCitizenTypeDisplay] = useState<string>("");

  const pageRef = useRef(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPersonalized = async () => {
      const data = await getPersonalizedNews();

      setMyCitizenType(data.citizenType);
      setMyCitizenTypeDisplay(data.citizenTypeDisplay);

      setNewsListforMe(data.news);
    };
    fetchPersonalized();
  }, []);

  useEffect(() => {
    pageRef.current = 0;
    fetchAllNews(0, true);
  }, [selectedKeyword]);

  const fetchAllNews = async (pageNum = 0, reset = false) => {
    setLoading(true);
    const data = await getAllNews(selectedKeyword, pageNum, 20);

    if (reset) {
      setNewsList(data.news);
    } else {
      setNewsList((prev) => [...prev, ...data.news]);
    }

    setHasNext(data.pagination.hasNext);
    pageRef.current = pageNum;
    setLoading(false);
  };

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting && hasNext && !loading) {
        const nextPage = pageRef.current + 1;
        fetchAllNews(nextPage);
      }
    },
    [hasNext, loading, selectedKeyword]
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [observerRef.current, observerCallback]);

  const handleKeywordClick = (label: string) => {
    setSelectedKeyword(keywordMap[label]);
  };

  const onBack = () => {
    navigate(-1);
  };

  const toggleBookmark = async (id: number, type: "personal" | "all") => {
    try {
      await toggleNewsScrap(id);

      if (type === "personal") {
        setNewsListforMe((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, scrapped: !item.scrapped } : item
          )
        );
      } else if (type === "all") {
        setNewsList((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, scrapped: !item.scrapped } : item
          )
        );
      }
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    }
  };

  const goToTest = () => {
    navigate("/startTest");
  };

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>
      <div className={$.container}>
        <header className={$.header}>
          <h1 className={$.title}>외교뉴스</h1>
        </header>

        <section className={$.sectionRow}>
          <p className={$.subTitle}>맞춤형 외교뉴스</p>

          {myCitizenType === null ? (
            <TextButton
              text="시민력 테스트 하러가기"
              onClick={goToTest}
              underline
            />
          ) : (
            <span className={$.typeName}>{myCitizenTypeDisplay}</span>
          )}
        </section>

        {myCitizenType === null ? (
          <p className={$.description}>
            시민력 테스트를 완료하면 나에게 맞춤형 외교뉴스를 추천받을 수
            있어요.
          </p>
        ) : (
          <>
            <p className={$.description}>
              시민력 테스트 결과에 따라 외교뉴스를 추천해드려요.
            </p>
            <div className={$.cardWrapper}>
              {newsListforMe.map((news) => (
                <NewsCard
                  key={news.id}
                  news={news}
                  onBookmarkToggle={() => toggleBookmark(news.id, "personal")}
                />
              ))}
            </div>
          </>
        )}

        <section className={$.section}>
          <div className={$.newsHeader}>
            <h2>외교뉴스 전체보기</h2>
          </div>
          <div className={$.keywordScroll}>
            {keywords.map((keyword) => (
              <KeywordChip
                key={keyword}
                label={keyword}
                isActive={selectedKeyword === keywordMap[keyword]}
                onClick={() => handleKeywordClick(keyword)}
              />
            ))}
          </div>
          <div className={$.cardWrapper}>
            {newsList.map((news) => (
              <NewsCard
                key={news.id}
                news={news}
                onBookmarkToggle={() => toggleBookmark(news.id, "all")}
              />
            ))}
            {loading && <LoadingSpinner />}
            <div ref={observerRef} style={{ height: "1px" }} />
          </div>
        </section>
      </div>
    </div>
  );
}
