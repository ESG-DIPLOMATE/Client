import { useState } from "react";
import $ from "./VoteResults.module.scss";
import AppBar from "@/components/common/Appbar";
import { useNavigate } from "react-router-dom";

export default function VoteResults() {
  const navigate = useNavigate();

  const [month, setMonth] = useState<number>(5);

  const handlePrevMonth = () => {
    setMonth((prev) => (prev > 1 ? prev - 1 : 12));
  };

  const handleNextMonth = () => {
    setMonth((prev) => (prev < 12 ? prev + 1 : 1));
  };

  const onBack = () => {
    navigate(-1);
  };

  // mock placeholders
  const odaResults = ["", "", ""];
  const diaryResults = ["", "", ""];

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>

      <div className={$.Container}>
        <header className={$.header}>
          <h1 className={$.title}>ESG 외교 투표 결과</h1>
        </header>

        <div className={$.monthSelector}>
          <button onClick={handlePrevMonth}>〈</button>
          <span>{month}월</span>
          <button onClick={handleNextMonth}>〉</button>
        </div>

        <section className={$.section}>
          <h2>{month}월의 외교/ESG 사례</h2>
          <div className={$.card}>
            {odaResults.map((_, idx) => (
              <div key={idx} className={$.placeholderBox}>
                <span className={$.rank}>{idx + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={$.section}>
          <h2>{month}월의 외교실천일지 사례</h2>
          <div className={$.card}>
            {diaryResults.map((_, idx) => (
              <div key={idx} className={$.placeholderBox}>
                <span className={$.rank}>{idx + 1}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
