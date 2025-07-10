import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import KeywordChip from "@/components/Chip/KeywordChip";
import PreviewCard from "@/components/Card/PreviewCard";
import $ from "./MyWritings.module.scss";

const dummyPosts = [
  {
    id: 1,
    title: "자유게시판 글 제목",
    content: "자유롭게 쓴 글 내용 미리보기...",
    postType: "FREE_BOARD",
    discussType: null,
    action: "",
    likes: 5,
    viewCount: 100,
    commentCount: 3,
    createdAt: "2025-07-10T16:02:37.713Z",
    updatedAt: "2025-07-10T16:02:37.713Z",
  },
  {
    id: 2,
    title: "토론게시판 글 제목",
    content: "토론 글 내용 미리보기...",
    postType: "DISCUSS_BOARD",
    discussType: "ENVIRONMENT",
    action: "",
    likes: 8,
    viewCount: 230,
    commentCount: 10,
    createdAt: "2025-07-09T12:15:22.000Z",
    updatedAt: "2025-07-09T12:15:22.000Z",
  },
  {
    id: 3,
    title: "실천일지 글 제목",
    content: "오늘 외교 실천한 이야기...",
    postType: "DIARY_BOARD",
    discussType: null,
    action: "탄소감축",
    likes: 2,
    viewCount: 50,
    commentCount: 1,
    createdAt: "2025-07-08T10:00:00.000Z",
    updatedAt: "2025-07-08T10:00:00.000Z",
  },
];

export default function MyWritings() {
  const navigate = useNavigate();
  const filters = ["전체", "자유게시판", "토론게시판", "실천일지"];
  const [selectedFilter, setSelectedFilter] = useState("전체");

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filteredPosts =
    selectedFilter === "전체"
      ? dummyPosts
      : dummyPosts.filter((post) => {
          if (selectedFilter === "자유게시판") {
            return post.postType === "FREE_BOARD";
          }
          if (selectedFilter === "토론게시판") {
            return post.postType === "DISCUSS_BOARD";
          }
          if (selectedFilter === "실천일지") {
            return post.postType === "DIARY_BOARD";
          }
          return true;
        });

  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
      </div>

      <div className={$.container}>
        <header className={$.header}>
          <h1 className={$.title}>내가 작성한 글</h1>
        </header>

        <section className={$.section}>
          <div className={$.keywordScroll}>
            {filters.map((filter) => (
              <KeywordChip
                key={filter}
                label={filter}
                isActive={selectedFilter === filter}
                onClick={() => handleFilterChange(filter)}
              />
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            <p className={$.emptyText}>작성한 글이 없습니다.</p>
          ) : (
            filteredPosts.map((post) => (
              <PreviewCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  preview: post.content,
                  date: new Date(post.createdAt).toLocaleDateString(),
                  authorId: "나",
                  category:
                    post.postType === "DISCUSS_BOARD"
                      ? post.discussType || undefined
                      : post.postType === "DIARY_BOARD"
                      ? post.action || undefined
                      : undefined,
                }}
                type={
                  post.postType === "FREE_BOARD"
                    ? "free"
                    : post.postType === "DISCUSS_BOARD"
                    ? "debate"
                    : "diary"
                }
                onClick={() => {
                  if (post.postType === "FREE_BOARD") {
                    navigate(`/free/${post.id}`);
                  } else if (post.postType === "DISCUSS_BOARD") {
                    navigate(`/debate/${post.id}`);
                  } else if (post.postType === "DIARY_BOARD") {
                    navigate(`/diary/${post.id}`);
                  }
                }}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}