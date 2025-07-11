import { useNavigate } from "react-router-dom";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import AppBar from "@/components/common/Appbar";
import $ from "../../diary/Diary.module.scss";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

type SortOption = "latest" | "likes" | "views";

const posts: Preview[] = [
  {
    id: 1,
    title: "내가 쓴 글",
    preview: "자유롭게 의견 나누어 봅시다.",
    date: "2025-07-10",
  },
  {
    id: 2,
    title: "다른 사람이 쓴 글",
    preview: "이곳은 자유게시판입니다.",
    authorId: "otherUser",
    date: "2025-07-09",
  },
];

const sortOptions: readonly Option<"latest" | "likes" | "views">[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "views", label: "조회순" },
] as const;

function FreeListPage() {
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [entries, setEntries] = useState<Preview[]>([...posts]);

  const handleNewPost = () => {
    navigate("/free/new");
  };

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);

    const sorted = [...entries];
    //api 연동하고 수정해야 함
    if (sort === "latest") {
      sorted.sort((a, b) => b.date.localeCompare(a.date));
    } else if (sort === "views") {
      sorted.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sort === "likes") {
      sorted.sort((a, b) => a.title.localeCompare(b.title, "ko"));
    }

    setEntries(sorted);
  };
  return (
    <div className={$.wrapper}>
      <div className={$.PaddingContainer}>
        <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
      </div>
      <div className={$.container}>
        <div className={$.header}>
          <h2>외교 자유 게시판</h2>
          <div className={$.headerActions}>
            <button className={$.writeButton} onClick={handleNewPost}>
              <FiEdit3 size={20} color="#4c9eff" />
            </button>
          </div>
        </div>

        <div className={$.description}>
          <div className={$.descriptionContent}>
            <h3>💡 외교 자유 게시판은</h3>
            <p>
              외교 이야기는 물론, 일상에서 느낀 점이나 관심사 등 어떤 주제든
              편하게 올릴 수 있는 공간입니다.
            </p>
            <p style={{ marginTop: "10px" }}>
              외교, 사회, 문화에 대한 자유로운 생각이나 일상의 소소한 이야기들을
              공유해보세요!
            </p>
          </div>
        </div>

        <div className={$.viewAllSection}>
          <div className={$.header}>
            <span className={$.viewAllText}>게시글 둘러보기</span>
            <div className={$.dropdownWrapper}>
              <DropDownButton
                options={sortOptions}
                value={currentSort}
                onChange={handleSortChange}
                size="small"
              />
            </div>
          </div>
          <div className={$.divider}></div>
        </div>

        <div className={$.diaryList}>
          {posts.map((entry) => (
            <PreviewCard
              key={entry.id}
              post={entry}
              type="free"
              onClick={() => navigate(`/free/${entry.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FreeListPage;
