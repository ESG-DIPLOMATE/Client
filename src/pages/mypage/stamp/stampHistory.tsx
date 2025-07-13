import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "./StampHistory.module.scss";
import AppBar from "@/components/common/Appbar";
import {
  BiPencil,
  BiLike,
  BiCheckShield,
  BiCalendar,
  BiMedal,
} from "react-icons/bi";
import { getStampHistory, getLevelGuide } from "@/apis/mypage/mypage";
import type {
  StampHistoryResponse,
  LevelGuideResponse,
} from "@/apis/mypage/mypage.type";
import LoadingSpinner from "@/components/common/Spinner";

export default function StampHistory() {
  const navigate = useNavigate();

  const [stampData, setStampData] = useState<StampHistoryResponse | null>(null);
  const [guideData, setGuideData] = useState<LevelGuideResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const onBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stampRes, guideRes] = await Promise.all([
          getStampHistory(),
          getLevelGuide(),
        ]);
        setStampData(stampRes);
        setGuideData(guideRes);
      } catch (e) {
        console.error("스탬프 데이터 불러오기 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  if (!stampData || !guideData) {
    return <div className={$.wrapper}>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>
      <div className={$.Container}>
        <p className={$.intro}>{guideData.description}</p>

        <ul className={$.activityList}>
          {guideData.stampEarningMethods.map((method, index) => (
            <li key={index}>{method.description}</li>
          ))}
        </ul>
        {guideData.levels.length > 0 && (
          <div className={$.levelGuideScroll}>
            {guideData.levels.map((level) => (
              <div key={level.level} className={$.levelBox}>
                <span className={$.levelName}>{level.name}</span>
                <span className={$.levelRange}>{level.requiredStamps}</span>
              </div>
            ))}
          </div>
        )}

        <hr className={$.divider} />

        {/* 나의 스탬프 현황 */}
        <section className={$.section}>
          <h2 className={$.sectionTitle}>
            <BiMedal className={$.icon} />
            외교 ESG 스탬프 획득 히스토리
          </h2>
          <div className={$.row}>
            <span className={$.label}>나의 ESG 스탬프</span>
            <span>총 {stampData.totalStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiPencil className={$.inlineIcon} /> 실천일지 작성
            </span>
            <span>{stampData.stampStatistics.diaryWriteStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiLike className={$.inlineIcon} /> 좋아요
            </span>
            <span>{stampData.stampStatistics.diaryLikeStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiCheckShield className={$.inlineIcon} /> 투표
            </span>
            <span>{stampData.stampStatistics.voteStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>Lv.2까지 남은 스탬프</span>
            <span>{stampData.stampsToNextLevel}개</span>
          </div>
        </section>

        {/* 일자별 히스토리 (스탬프가 있을 때만 보여줌) */}
        {stampData.totalStamps > 0 && (
          <>
            <hr className={$.divider} />

            <section className={$.section}>
              <h2 className={$.sectionTitle}>일자별 히스토리</h2>
              {stampData.dailyStampHistory.map((day) => (
                <div key={day.date} className={$.dayHistory}>
                  <p className={$.date}>
                    <BiCalendar className={$.inlineIcon} />
                    {day.date}
                  </p>
                  {day.stamps.map((s) => (
                    <div key={s.id} className={$.stampRow}>
                      <span>{s.stampTypeDescription}</span>
                      <span>+ {s.stampCount}</span>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
