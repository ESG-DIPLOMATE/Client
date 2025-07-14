import { useEffect, useState } from "react";
import $ from "./VoteResults.module.scss";
import AppBar from "@/components/common/Appbar";
import { useNavigate } from "react-router-dom";
import { fetchMonthlyVoteResult } from "@/apis/vote/vote";
import type { MonthlyVoteResultResponse } from "@/apis/vote/vote.type";
import LoadingSpinner from "@/components/common/Spinner";
import { toast } from "react-toastify";

export default function VoteResults() {
  const navigate = useNavigate();

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;

  const availableMonths = [7]; // 투표가 시작된 월

  const [year] = useState<number>(thisYear);
  const [month, setMonth] = useState<number>(thisMonth);
  const [data, setData] = useState<MonthlyVoteResultResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onBack = () => {
    navigate(-1);
  };

  const handlePrevMonth = () => {
    if (month === 7) {
      toast("당월에는 투표가 시행되지 않았습니다.");
      return;
    }
    const newMonth = month > 1 ? month - 1 : 12;
    setMonth(newMonth);
  };

  const handleNextMonth = () => {
    if (month === thisMonth) {
      toast("투표가 아직 시행되지 않았습니다.");
      return;
    }
    const newMonth = month < 12 ? month + 1 : 1;
    setMonth(newMonth);
  };

  const fetchData = async () => {
    if (!availableMonths.includes(month)) {
      toast("투표가 시행되지 않았습니다.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetchMonthlyVoteResult(year, month);
      setData(res.data.data);
    } catch (e) {
      console.error(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month]);

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

        {loading ? (
          <LoadingSpinner />
        ) : !data ? (
          <p className={$.emptyMessage}>투표 결과가 없습니다.</p>
        ) : (
          <>
            <section className={$.section}>
              <h2>{data.odaVoteTitle}</h2>
              <div className={$.card}>
                {data.odaCandidates.length > 0 ? (
                  data.odaCandidates.slice(0, 3).map((c, index) => (
                    <div key={c.id} className={$.placeholderBox}>
                      <span className={$.rank}>{index + 1}</span>
                      <div className={$.voteTextBox}>
                        <span className={$.voteTitle}>{c.odaProject.title}</span>
                        <span className={$.voteDescription}>
                          {c.odaProject.summary}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={$.emptyMessage}>ODA 투표 결과가 없습니다.</p>
                )}
              </div>
            </section>

            <section className={$.section}>
              <h2>{data.title}</h2>
              <div className={$.card}>
                {data.candidates.length > 0 ? (
                  data.candidates.slice(0, 3).map((c, index) => (
                    <div key={c.candidateId} className={$.placeholderBox}>
                      <span className={$.rank}>{index + 1}</span>
                      <div className={$.voteTextBox}>
                        <span className={$.voteTitle}>{c.diaryTitle}</span>
                        <span className={$.voteDescription}>
                          작성자: {c.authorName}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={$.emptyMessage}>외교 실천일지 투표 결과가 없습니다.</p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
