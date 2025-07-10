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

export default function StampHistory() {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const data = {
    totalStamps: 15,
    currentLevelDisplay: "외교관 Lv.1",
    stampsToNextLevel: 5,
    stampStatistics: {
      totalStamps: 15,
      diaryWriteStamps: 5,
      diaryLikeStamps: 3,
      voteStamps: 7,
    },
    dailyStampHistory: [
      {
        date: "2025.06.22",
        stamps: [
          { stampType: "실천일지 작성", stampCount: 1 },
          { stampType: "공감", stampCount: 1 },
        ],
      },
      {
        date: "2025.06.11",
        stamps: [
          { stampType: "실천일지 작성", stampCount: 1 },
          { stampType: "공감", stampCount: 1 },
          { stampType: "투표", stampCount: 1 },
        ],
      },
    ],
  };

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={onBack} />
      </div>
      <div className={$.Container}>
        <p className={$.intro}>
          스탬프는 다음 세 가지 활동을 통해 얻을 수 있어요.
          <br />
          스탬프를 모아 외교 ESG 레벨을 올려보세요!
        </p>

        <ul className={$.activityList}>
          <li>실천일지 작성하기</li>
          <li>일지에 대한 좋아요 획득하기</li>
          <li>ESG 투표 참여</li>
        </ul>

        <hr className={$.divider} />

        <section className={$.section}>
          <h2 className={$.sectionTitle}>
            <BiMedal className={$.icon} />
            외교 ESG 스탬프 획득 히스토리
          </h2>
          <div className={$.row}>
            <span className={$.label}>나의 ESG 스탬프</span>
            <span>총 {data.totalStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiPencil className={$.inlineIcon} /> 실천일지 작성
            </span>
            <span>{data.stampStatistics.diaryWriteStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiLike className={$.inlineIcon} /> 좋아요
            </span>
            <span>{data.stampStatistics.diaryLikeStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>
              <BiCheckShield className={$.inlineIcon} /> 투표
            </span>
            <span>{data.stampStatistics.voteStamps}개</span>
          </div>
          <div className={$.row}>
            <span className={$.label}>Lv.2까지 남은 스탬프</span>
            <span>{data.stampsToNextLevel}개</span>
          </div>
        </section>

        <hr className={$.divider} />

        <section className={$.section}>
          <h2 className={$.sectionTitle}>일자별 히스토리</h2>
          {data.dailyStampHistory.map((day) => (
            <div key={day.date} className={$.dayHistory}>
              <p className={$.date}>
                <BiCalendar className={$.inlineIcon} />
                {day.date}
              </p>
              {day.stamps.map((s, i) => (
                <div key={i} className={$.stampRow}>
                  <span>{s.stampType}</span>
                  <span>+ {s.stampCount}</span>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
