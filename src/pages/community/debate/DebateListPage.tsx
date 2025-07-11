import { Outlet, useNavigate } from "react-router-dom";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import AppBar from "@/components/common/Appbar";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import $ from "../../diary/Diary.module.scss";
import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";

type SortOption = "latest" | "likes" | "views";

const debates: Preview[] = [
  {
    id: 1,
    category: "환경",
    title: "지구온난화 대책",
    preview: "기후 위기 대응 어떻게 생각하시나요?",
    authorId: "debater01",
    date: "2025-07-10",
  },
  {
    id: 2,
    category: "문화",
    title: "한류 확산의 영향",
    preview: "문화 교류에 한류가 미치는 영향은 무엇일까요?",
    date: "2025-07-09",
  },
];

const sortOptions: readonly Option<SortOption>[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "views", label: "조회순" },
] as const;

function DebateListPage() {
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [entries, setEntries] = useState<Preview[]>([...debates]);

  const handleNewDebate = () => {
    navigate("/debate/new");
  };

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);

    const sorted = [...entries];
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
    <>
      <div className={$.wrapper}>
        <div className={$.PaddingContainer}>
          <AppBar leftRole="back" onClickLeftButton={() => navigate(-1)} />
        </div>
        <div className={$.container}>
          <div className={$.header}>
            <h2>외교 토론 게시판</h2>
            <div className={$.headerActions}>
              <button className={$.writeButton} onClick={handleNewDebate}>
                <FiEdit3 size={20} color="#4c9eff" />
              </button>
            </div>
          </div>

          <div className={$.description}>
            <div className={$.descriptionContent}>
              <h3>💡 외교 자유 게시판은</h3>
              <p>
                <strong>환경·문화·평화·경제</strong> 4개 분야의 국제 이슈에 대해
                누구나 자유롭게 의견을 나누고, 서로의 시각을 넓힐 수 있는
                공간입니다.
              </p>
              <p style={{ marginTop: "10px" }}>
                내가 가진 생각이나 궁금증, 제안하고 싶은 아이디어를 올려보세요.
                다양한 의견이 모여 세상에 작은 변화를 만들어갈 수 있습니다!
              </p>
            </div>
          </div>

          <div className={$.viewAllSection}>
            <div className={$.header}>
              <span className={$.viewAllText}>외교 토론 참여하기</span>
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
            {entries.map((entry) => (
              <PreviewCard
                key={entry.id}
                post={entry}
                type="debate"
                onClick={() => navigate(`/debate/${entry.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
}
export default DebateListPage;
