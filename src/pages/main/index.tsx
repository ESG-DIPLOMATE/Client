import { useNavigate } from "react-router-dom";
import { HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import BackgroundImg from "@/assets/img/BackgroundIllust.png";
import { HiOutlineGlobeAlt, HiOutlineMegaphone } from "react-icons/hi2";

import $ from "./Main.module.scss";
import TextButton from "@/components/common/Button/TextButton";
import TitleCard from "@/components/Card/TitleCard";

function Main() {
  const navigate = useNavigate();

  const handleTestStart = () => {
    navigate("/startTest");
  };

  return (
    <div className={$.container}>
      <div className={$.header}>
        <div className={$.logo}>한터내셔널:나도 외교관</div>
        <div className={$.headerIcons}>
          <HiOutlineUser size={24} onClick={() => navigate("/mypage")} />
        </div>
      </div>
      <img
        src={BackgroundImg}
        className={$.BackgroundImg}
        alt="로그인 외교돌이"
      />

      <div className={$.introBox}>
        <p className={$.introText}>
          외교는 외교관만의 일이 아닙니다. 누구나 일상 속에서 ESG 가치와 외교를
          연결하며 시민 외교관이 될 수 있습니다. 기록하고 공유하며 세상을 바꾸는
          시민 외교에 참여해보세요!
        </p>
      </div>

      <button className={$.testButton} onClick={handleTestStart}>
        글로벌 시민력 테스트 하러가기
      </button>
      <div className={$.voteLinks}>
        <div className={$.voteCard} onClick={() => navigate("/vote")}>
          <HiOutlineGlobeAlt size={28} className={$.voteIcon} />
          <span>이달의 외교 투표하러 가기</span>
        </div>

        <div className={$.voteCard} onClick={() => navigate("/voteResults")}>
          <HiOutlineMegaphone size={28} className={$.voteIcon} />
          <span>지난 달 투표 결과 보기</span>
        </div>
      </div>

      <div className={$.divider} />

      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>외교실천일지</h2>
          <TextButton text="전체보기" onClick={() => navigate("/diary")} />
        </div>
        <div className={$.cardList}>
          <TitleCard title="일지 제목 1" />
          <TitleCard title="일지 제목 2" />
        </div>
      </section>

      <div className={$.divider} />

      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>외교뉴스</h2>
          <TextButton text="전체보기" onClick={() => navigate("/news")} />
        </div>
        <div className={$.cardList}>
          <TitleCard title="뉴스 헤더1" />
          <TitleCard title="뉴스 헤더2" />
        </div>
      </section>

      <div className={$.divider} />

      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>커뮤니티</h2>
          <TextButton text="전체보기" onClick={() => navigate("/community")} />
        </div>
        <div className={$.cardList}>
          <TitleCard title="자유게시판 인기글 제목 1" />
          <TitleCard title="자유게시판 인기글 제목 2" />
        </div>
      </section>
    </div>
  );
}

export default Main;