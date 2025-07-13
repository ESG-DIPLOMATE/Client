import { useEffect, useState } from "react";
import $ from "./Vote.module.scss";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import {
  fetchOdaVote,
  fetchDiaryVote,
  voteOda,
  voteDiary,
} from "@/apis/vote/vote";
import type {
  OdaVoteResponse,
  DiaryVoteResponse,
  OdaVoteCandidate,
  DiaryVoteCandidate,
} from "@/apis/vote/vote.type";
import LoadingSpinner from "@/components/common/Spinner";
import KeywordChip from "@/components/Chip/KeywordChip";
import { toast } from "react-toastify";

export default function Vote() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"oda" | "diary">("oda");

  const [odaData, setOdaData] = useState<OdaVoteResponse | null>(null);
  const [diaryData, setDiaryData] = useState<DiaryVoteResponse | null>(null);

  const [selectedOda, setSelectedOda] = useState<string | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<string | null>(null);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const [loading, setLoading] = useState(true);

  const onBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const odaRes = await fetchOdaVote();
        setOdaData(odaRes.data);

        const diaryRes = await fetchDiaryVote();
        setDiaryData(diaryRes.data.data);
      } catch (e) {
        console.error(e);
        toast("잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (odaData?.hasUserVoted) {
      setSelectedOda(String(odaData.userVotedCandidateId));
    }
  }, [odaData]);

  useEffect(() => {
    if (diaryData?.hasUserVoted) {
      setSelectedDiary(String(diaryData.userVotedCandidateId));
    }
  }, [diaryData]);

  const handleVoteOda = async () => {
    if (selectedOda !== null) {
      await voteOda({ candidateId: Number(selectedOda) });
      window.location.reload();
    }
  };

  const handleVoteDiary = async () => {
    if (selectedDiary !== null) {
      await voteDiary({ candidateId: Number(selectedDiary) });
      window.location.reload();
    }
  };

  const goToResult = () => {
    navigate("/voteResults");
  };

  if (loading) {
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className={$.wrapper}>
        <div className={$.PaddingContainer}>
          <AppBar leftRole="back" onClickLeftButton={onBack} />
        </div>

        <div className={$.container}>
          <div className={$.header}>
            <h2>ESG 외교 투표</h2>
          </div>

          <div className={$.description}>
            <div className={$.descriptionContent}>
              <h3>💡 외교 투표란?</h3>
              <p>
                이달의 외교 투표는 전 세계를 무대로 펼쳐지는 대한민국의 외교
                현장을 시민의 눈으로 함께 만들어가는 공간입니다.
              </p>
            </div>

            <div className={$.moreButtonWrapper}>
              {!isDescriptionExpanded && (
                <button
                  className={$.moreButton}
                  onClick={() => setIsDescriptionExpanded(true)}
                >
                  설명 자세히
                </button>
              )}

              {isDescriptionExpanded && (
                <button
                  className={$.moreButton}
                  onClick={() => setIsDescriptionExpanded(false)}
                >
                  설명 숨기기
                </button>
              )}
            </div>

            {isDescriptionExpanded && (
              <div className={$.practiceItems}>
                <div className={$.practiceColumn}>
                  <h4>📝 ODA 사업 사례 투표</h4>
                  <ul>
                    <li>
                      한국이 추진 중인 개발협력(ODA) 사업 중 다양한 분야의 주요
                      사례에서 가장 의미 있다고 생각하는 사례에 투표하세요.
                    </li>
                  </ul>
                  <h4>📝 외교 실천일지 투표</h4>
                  <ul>
                    <li>
                      다른 사용자가 작성한 외교 실천 사례 중 인기 있는
                      게시물에서, 이번 달의 가장 인상적인 실천 사례를
                      선택하세요.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          {/* 탭 UI */}
          <div className={$.tabContainer}>
            <KeywordChip
              label="ODA 투표"
              isActive={activeTab === "oda"}
              onClick={() => setActiveTab("oda")}
            />
            <KeywordChip
              label="외교 실천일지 투표"
              isActive={activeTab === "diary"}
              onClick={() => setActiveTab("diary")}
            />
          </div>

          {/* ODA Vote */}
          {activeTab === "oda" && odaData && (
            <section className={$.section}>
              <div className={$.cardList}>
                {odaData?.candidates.map((item: OdaVoteCandidate) => (
                  <div key={item.id} className={$.card}>
                    <input
                      type="radio"
                      name="oda"
                      checked={selectedOda === String(item.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!odaData.hasUserVoted) {
                          setSelectedOda(String(item.id));
                        }
                      }}
                      readOnly
                      className={$.radio}
                    />
                    <div
                      className={$.cardContent}
                      onClick={() => {
                        if (item.odaProject.url) {
                          window.open(item.odaProject.url, "_blank");
                        }
                      }}
                    >
                      <h3 className={$.cardTitle}>{item.odaProject.title}</h3>
                      <p className={$.cardDescription}>
                        {item.odaProject.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleVoteOda}
                disabled={odaData?.hasUserVoted || selectedOda === null}
                variant="primary"
                size="large"
              >
                {odaData?.hasUserVoted ? "투표 완료" : "투표 하기"}
              </Button>
            </section>
          )}

          {/* Diary Vote */}
          {activeTab === "diary" && diaryData && (
            <section className={$.section}>
              <div className={$.cardList}>
                {diaryData?.candidates.map((item: DiaryVoteCandidate) => (
                  <div key={item.candidateId} className={$.card}>
                    <input
                      type="radio"
                      name="diary"
                      checked={selectedDiary === String(item.candidateId)}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!diaryData.hasUserVoted) {
                          setSelectedDiary(String(item.candidateId));
                        }
                      }}
                      readOnly
                      className={$.radio}
                    />
                    <div
                      className={$.cardContent}
                      onClick={() => {
                        navigate(`/diary/${item.diaryId}`);
                      }}
                    >
                      <h3 className={$.cardTitle}>{item.diaryTitle}</h3>
                      <p className={$.cardDescription}>
                        {item.diaryDescription}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={handleVoteDiary}
                disabled={diaryData?.hasUserVoted || selectedDiary === null}
                variant="primary"
                size="large"
              >
                {diaryData?.hasUserVoted ? "투표 완료" : "투표 하기"}
              </Button>
            </section>
          )}
        </div>
        <div className={$.Footer}>
          <Button onClick={goToResult} variant="secondary" size="large">
            지난달 결과 확인하기
          </Button>
        </div>
      </div>
    </>
  );
}
