import { useState } from "react";
import $ from "./Vote.module.scss";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";

export default function Vote() {
  const navigate = useNavigate();

  const [selectedOda, setSelectedOda] = useState<string | null>(null);
  const [selectedDiary, setSelectedDiary] = useState<string | null>(null);

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const odaList = ["", "", ""];
  const diaryList = ["", "", ""];

  const handleVoteOda = () => {
    console.log("ODA 투표:", selectedOda);
  };

  const handleVoteDiary = () => {
    console.log("일지 투표:", selectedDiary);
  };

  const goToResult = () => {
    navigate("/voteResults");
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>

      <div className={$.Container}>
        <header className={$.header}>
          <h1 className={$.title}>ESG 외교 투표</h1>
        </header>

        <div className={$.descriptionBox}>
          <p className={$.description}>
            이달의 외교 투표는 전 세계를 무대로 펼쳐지는 대한민국의 외교 현장을
            시민의 눈으로 함께 만들어가는 공간입니다.
          </p>

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
            <div className={$.descriptionExpanded}>
              <p className={$.description}>
                <strong>● 외교 실천일지 투표</strong> <br />
                다른 사용자가 작성한 외교 실천 사례 중 인기 있는 10개의
                게시물에서, 이번 달의 가장 인상적인 실천 사례를 선택하세요.
                당신의 선택이 다음 달 베스트 외교 실천 사례를 결정하고,
                참여자에게는 리워드가 주어집니다.
                <br />
                <br />
                <strong>● ODA 사업 사례 투표</strong> <br />
                한국이 추진 중인 개발협력(ODA) 사업 중, 환경, 교육, 보건, 여성
                등 다양한 분야의 주요 사례 중에서 가장 의미 있다고 생각하는
                사례에 투표하세요. 시민들의 선택은 외교 정책의 방향성과 홍보
                콘텐츠에 반영됩니다.
              </p>
            </div>
          )}
        </div>

        <section className={$.section}>
          <h2>6월의 외교/ESG 사례</h2>
          <div className={$.cardList}>
            {odaList.map((_, idx) => (
              <div
                key={idx}
                className={$.card}
                onClick={() => setSelectedOda(String(idx))}
              >
                <input
                  type="radio"
                  name="oda"
                  checked={selectedOda === String(idx)}
                  readOnly
                  className={$.radio}
                />
                <div className={$.placeholderBox}></div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleVoteOda}
            disabled={selectedOda === null}
            variant="primary"
            size="large"
          >
            투표 하기
          </Button>
        </section>

        <section className={$.section}>
          <h2>6월의 외교실천일지 사례</h2>
          <div className={$.cardList}>
            {diaryList.map((_, idx) => (
              <div
                key={idx}
                className={$.card}
                onClick={() => setSelectedDiary(String(idx))}
              >
                <input
                  type="radio"
                  name="diary"
                  checked={selectedDiary === String(idx)}
                  readOnly
                  className={$.radio}
                />
                <div className={$.placeholderBox}></div>
              </div>
            ))}
          </div>
          <Button
            onClick={handleVoteDiary}
            disabled={selectedDiary === null}
            variant="primary"
            size="large"
          >
            투표 하기
          </Button>
        </section>
      </div>

      <div className={$.Footer}>
        <Button onClick={goToResult} variant="secondary" size="large">
          지난달 결과 확인하기
        </Button>
      </div>
    </div>
  );
}
