import { Outlet, useNavigate } from "react-router-dom";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import AppBar from "@/components/common/Appbar";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import TextButton from "@/components/common/Button/TextButton";
import $ from "../../diary/Diary.module.scss";
import { useState } from "react";

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
            <div className={$.headerActions}></div>
          </div>
          <div className={$.buttonWrapper}>
            <TextButton text="새 토론 글 작성하기" underline icon onClick={handleNewDebate} />
            <div className={$.dropdownWrapper}>
              <DropDownButton
                options={sortOptions}
                value={currentSort}
                onChange={handleSortChange}
                size="small"
              />
            </div>
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
