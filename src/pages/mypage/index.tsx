import { useNavigate } from "react-router-dom";
import $ from "./Mypage.module.scss";
import AppBar from "@/components/common/Appbar";

export default function Mypage() {
  const navigate = useNavigate();

  const data = {
    userId: "lde7953",
    maskedPassword: "qlalfqjsgh0*****",
    currentLevel: "LEVEL_1",
    currentLevelDisplay: "외교관 Lv.1",
    totalStamps: 7,
    stampsToNextLevel: 3,
    citizenType: "평화중재형",
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
        <div className={$.layout}>
          <div className={$.content}>
            <div className={$.header}>
              <h1 className={$.pageTitle}>내 정보</h1>
              <button
                className={$.logoutButton}
                onClick={() => console.log("로그아웃")}
              >
                로그아웃
              </button>
            </div>
            <section className={$.section}>
              <div className={$.row}>
                <span className={$.label}>아이디</span>
                <span>{data.userId}</span>
              </div>
              <div className={$.row}>
                <span className={$.label}>비밀번호</span>
                <span>{data.maskedPassword}</span>
              </div>
              <div className={$.row}>
                <span className={$.label}>나의 외교 ESG 레벨</span>
                <span>{data.currentLevelDisplay}</span>
              </div>
              <div className={$.row}>
                <span className={$.label}>나의 ESG 스탬프</span>
                <span>총 {data.totalStamps}개</span>
              </div>
              <div className={$.row}>
                <span className={$.label}>Lv.2까지 남은 스탬프</span>
                <span>{data.stampsToNextLevel}개</span>
              </div>
              <div
                className={$.stampHistoryLink}
                onClick={() => navigate("/stampHistory")}
              >
                스탬프 히스토리 →
              </div>
            </section>

            <section className={$.sectionRow}>
              <h2 className={$.sectionTitle}>글로벌 시민력 테스트 결과</h2>
              <p className={$.citizenType}>{data.citizenType}</p>
            </section>

            <section className={$.section}>
              <h2
                className={$.sectionTitle}
                onClick={() => navigate("/mywritings")}
              >
                내가 작성한 글 모아보기
              </h2>
            </section>

            <section className={$.section}>
              <h2
                className={$.sectionTitle}
                onClick={() => navigate("/mynews")}
              >
                스크랩한 외교뉴스
              </h2>
            </section>
          </div>

          <div className={$.withdrawWrapper}>
            <button
              className={$.withdrawButton}
              onClick={() => console.log("탈퇴하기")}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
