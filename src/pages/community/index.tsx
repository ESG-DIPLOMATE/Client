import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import $ from "./Community.module.scss";
import type {
  PopularDiscussBoard,
  PopularFreeBoard,
} from "@/apis/community/community.type";
import { getPopularPosts } from "@/apis/community/community";
import TitleCard from "@/components/Card/TitleCard";

export default function Community() {
  const navigate = useNavigate();
  const [freePosts, setFreePosts] = useState<PopularFreeBoard[]>([]);
  const [discussPosts, setDiscussPosts] = useState<PopularDiscussBoard[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getPopularPosts();
        setFreePosts(res.data.popularFreeBoards);
        setDiscussPosts(res.data.popularDiscussBoards);
      } catch (e) {
        console.error("커뮤니티 인기글 조회 에러", e);
      }
    })();
  }, []);

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
      </div>

      <div className={$.container}>
        <h2>나도 외교관 커뮤니티</h2>
        <p className={$.description}>
          나도 외교관 커뮤니티는 일상 속에서 외교를 실천하고, 자유롭게 자신의
          생각을 나누며 소통할 수 있는 공간입니다.
          <br />
          <br />
          외교와 관련된 일상 이야기부터 개인의 소소한 경험, 생각을 자유롭게
          남기고 의견을 공유해보세요.
        </p>

        <section className={$.section}>
          <div className={$.sectionTitle} onClick={() => navigate("/free")}>
            자유 게시판
          </div>

          {freePosts.map((post) => (
            <TitleCard key={post.id} title={post.title} />
          ))}
        </section>

        <section className={$.section}>
          <div className={$.sectionTitle} onClick={() => navigate("/debate")}>
            토론 게시판
          </div>

          {discussPosts.map((post) => (
            <TitleCard key={post.id} title={post.title} />
          ))}
        </section>

        <section className={$.section}>
          <div className={$.sectionTitle} onClick={() => navigate("/my-posts")}>
            내가 작성한 글 모아보기
          </div>
        </section>
      </div>
    </div>
  );
}
