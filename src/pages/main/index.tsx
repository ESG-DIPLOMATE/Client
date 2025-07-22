import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineGlobeAlt,
  HiOutlineMegaphone,
} from "react-icons/hi2";
import BackgroundImg from "@/assets/img/BackgroundIllust.png";
import $ from "./Main.module.scss";
import TextButton from "@/components/common/Button/TextButton";
import LineCard from "@/components/Card/LineCard";
import { getMainPage } from "@/apis/main/main";
import NewsCard from "../news/components/NewsCard";
import LoadingSpinner from "@/components/common/Spinner";
import { toast } from "react-toastify";
import type { MainPageResponse } from "@/apis/main/main.type";

function Main() {
  const navigate = useNavigate();

  const [mainData, setMainData] = useState<MainPageResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMainPage();
        setMainData(res);
      } catch (e) {
        console.error(e);
        toast("잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTestStart = () => {
    navigate("/startTest");
  };

  if (loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={$.container}>
      {/* 헤더 */}
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

      {/* 투표링크 */}
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

      {/* 외교 실천일지 */}
      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>외교실천일지</h2>
          <TextButton text="전체보기" onClick={() => navigate("/diary")} />
        </div>
        <div className={$.cardList}>
          {mainData?.recentDiaries.length === 0 && <p>데이터가 없습니다.</p>}
          {mainData?.recentDiaries.map((diary) => (
            <LineCard
              key={diary.id}
              id={diary.id}
              title={diary.title}
              content={diary.description}
              createdAt={diary.createdAt}
              type="diary"
              likeCount={diary.likes}
              commentCount={diary.diaryComments?.length ?? 0}
            />
          ))}
        </div>
      </section>

      {/* <div className={$.divider} /> */}

      {/* 외교 뉴스 */}
      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>외교뉴스</h2>
          <TextButton text="전체보기" onClick={() => navigate("/news")} />
        </div>
        <div className={$.cardList}>
          {mainData?.recentNews.length === 0 && <p>데이터가 없습니다.</p>}
          {mainData?.recentNews.map((news) => (
            <NewsCard key={news.id} news={news} isMain />
          ))}
        </div>
      </section>

      {/* <div className={$.divider} /> */}

      {/* 커뮤니티 */}
      <section className={$.section}>
        <div className={$.sectionHeader}>
          <h2>커뮤니티</h2>
          <TextButton text="전체보기" onClick={() => navigate("/community")} />
        </div>
        <div className={$.cardList}>
          {mainData?.popularCommunityPosts.length === 0 && (
            <p>데이터가 없습니다.</p>
          )}
          {mainData?.popularCommunityPosts.map((post) => {
            const type = post.boardType === "FREE" ? "free" : "debate";

            return (
              <LineCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                createdAt={post.createdAt}
                type={type}
                likeCount={post.likes}
                commentCount={post.commentCount ?? 0}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Main;
