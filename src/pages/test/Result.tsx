import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 경제통상형 from "@/assets/img/경제통상형.png";
import 기후행동형 from "@/assets/img/기후행동형.png";
import 디지털소통형 from "@/assets/img/디지털소통형.png";
import 문화외교형 from "@/assets/img/문화외교형.png";
import 평화중재형 from "@/assets/img/평화중재형.png";
import $ from "./Result.module.scss";
import Button from "@/components/common/Button";
import type {
  CitizenTestResultResponse,
  RecommendedNewsItem,
  RecommendedProgram,
} from "@/apis/test/test.type";
import NewsCard from "../news/components/NewsCard";
import { fetchMyTestResult } from "@/apis/test/test";
import LoadingSpinner from "@/components/common/Spinner";

export default function TestResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState<CitizenTestResultResponse | null>(null);

  const IMAGE_MAP: Record<string, string> = {
    경제통상형,
    기후행동형,
    디지털소통형,
    문화외교형,
    평화중재형,
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await fetchMyTestResult();
        setResult(res.data);
      } catch (e) {
        console.error(e);
        alert("결과를 불러오지 못했습니다.");
      }
    };

    fetchResult();
  }, []);

  const handleRetry = () => {
    navigate("/test");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!result)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={$.wrapper}>
      <p className={$.subTitle}>디지털 세상에서 영향력을 펼치는</p>
      <p className={$.topLabel}>당신의 시민력 유형은?</p>
      <div className={$.cardWrapper}>
        <img
          src={result.description ? IMAGE_MAP[result.description] : ""}
          alt={result.description || ""}
          className={$.typeImage}
        />
        <h1 className={$.typeName}>{result.description}</h1>

        <p className={$.typeDisplayName}>{result.displayName}</p>

        {result.summary && (
          <ul className={$.summaryList}>
            {result.summary.split("👉").map((line, i) => {
              const text = line.trim();
              return text ? <li key={i}>{text}</li> : null;
            })}
          </ul>
        )}
        <div className={$.characteristicsWrapper}>
          {result.characteristics && (
            <>
              <h2 className={$.characteristicsHeader}>특징</h2>

              <div className={$.characteristics}>
                {result.characteristics.split("✅").map((text, i) => {
                  const t = text.trim();
                  return t ? (
                    <div key={i} className={$.characteristicBox}>
                      <p>{t}</p>
                    </div>
                  ) : null;
                })}
              </div>
            </>
          )}
        </div>

        {result.keywords && (
          <>
            <h2 className={$.keywordsHeader}>자주 쓰는 말</h2>
            <div className={$.keywords}>
              {result.keywords
                .split("•")
                .map((k) => k.trim())
                .filter(Boolean)
                .map((k, i) => (
                  <span key={i} className={$.keywordTag}>
                    {k.replace(/["“”]/g, "")}
                  </span>
                ))}
            </div>
          </>
        )}

        {result.recommendedNews?.length > 0 && (
          <section className={$.section}>
            <h2>외교콘텐츠 구독 추천</h2>
            <div className={$.newsList}>
              {result.recommendedNews.map((news: RecommendedNewsItem) => (
                <NewsCard
                  key={news.title}
                  news={{
                    id: 0,
                    newsId: 0,
                    scrapId: 0,
                    scrapedAt: "",
                    category: "",
                    categoryDisplay: "",
                    title: news.title,
                    summary: news.summary,
                    url: news.url,
                    publishDate: news.publishDate,
                    scrapped: false,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {result.recommendedPrograms?.length > 0 && (
          <section className={$.section}>
            <h2>외교활동 추천</h2>
            <div className={$.newsList}>
              {result.recommendedPrograms.map((prog: RecommendedProgram) => (
                <NewsCard
                  key={prog.businessName}
                  news={{
                    id: 0,
                    newsId: 0,
                    scrapId: 0,
                    scrapedAt: "",
                    category: "",
                    categoryDisplay: "",
                    title: prog.businessName,
                    summary: prog.businessPurpose,
                    url: "",
                    publishDate: "",
                    scrapped: false,
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <div className={$.buttonGroup}>
        <Button variant="secondary" onClick={handleRetry}>
          다시 테스트하기
        </Button>
        <Button variant="primary" onClick={handleGoHome}>
          홈으로
        </Button>
      </div>
    </div>
  );
}
