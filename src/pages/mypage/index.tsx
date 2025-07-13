import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "./Mypage.module.scss";
import AppBar from "@/components/common/Appbar";
import { getMyPage } from "@/apis/mypage/mypage";
import type { MyPageResponse } from "@/apis/mypage/mypage.type";
import TextButton from "@/components/common/Button/TextButton";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/common/Spinner";
import Modal from "@/components/common/Modal";
import { withdrawUser } from "@/apis/auth/auth";

export default function Mypage() {
  const navigate = useNavigate();

  const [data, setData] = useState<MyPageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyPage();
        setData(res);
      } catch (error) {
        console.error("마이페이지 데이터 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  if (loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  if (!data) {
    return <div className={$.wrapper}>데이터를 불러올 수 없습니다.</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast("로그아웃 되었습니다.");
    navigate("/login");
  };

  const handleWithdrawClick = () => {
    setShowModal(true);
  };

  const handleConfirmWithdraw = async () => {
    try {
      await withdrawUser({
        userId: data.userId,
        password,
      });
      toast("회원 탈퇴가 완료되었습니다.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast("비밀번호가 맞지 않습니다.");
      return;
    } finally {
      //
    }
    setShowModal(false);
    setPassword("");
  };

  const handleCancelWithdraw = () => {
    setShowModal(false);
    setPassword("");
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
              <TextButton text="로그아웃" onClick={handleLogout} underline />
            </div>
            <section className={$.section}>
              <div className={$.row}>
                <span className={$.label}>아이디</span>
                <span>{data.userId}</span>
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
                <span className={$.label}>레벨업까지 남은 스탬프</span>
                <span>{data.stampsToNextLevel}개</span>
              </div>
              <div
                className={$.stampHistoryLink}
                onClick={() => navigate("stampHistory")}
              >
                스탬프 히스토리 →
              </div>
            </section>

            <section className={$.sectionRow}>
              <h2 className={$.sectionTitle}>글로벌 시민력 테스트 결과</h2>
              {data.citizenType === "미진단" ? (
                <TextButton
                  text="테스트 하러가기"
                  onClick={() => navigate("/startTest")}
                />
              ) : (
                <TextButton
                  text={data.citizenType}
                  onClick={() => navigate("/testResult")}
                  underline
                />
              )}
            </section>

            <section className={$.section}>
              <h2
                className={$.sectionTitle}
                onClick={() => navigate("mywritings")}
              >
                내가 작성한 글 모아보기
              </h2>
            </section>

            <section className={$.section}>
              <h2 className={$.sectionTitle} onClick={() => navigate("mynews")}>
                스크랩한 외교뉴스
              </h2>
            </section>
          </div>

          <div className={$.withdrawWrapper}>
            <button className={$.withdrawButton} onClick={handleWithdrawClick}>
              탈퇴하기
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          onConfirm={handleConfirmWithdraw}
          onCancel={handleCancelWithdraw}
        >
          <div className={$.modalContent}>
            <span style={{ margin: "auto" }}>
              본인 확인을 위해 비밀번호를 입력해주세요.
            </span>
            <label>
              아이디
              <input
                type="text"
                value={data.userId}
                readOnly
                className={$.input}
              />
            </label>
            <label>
              비밀번호
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={$.input}
              />
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
}
