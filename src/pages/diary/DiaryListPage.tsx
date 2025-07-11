import { useState } from "react";
import AppBar from "@/components/common/Appbar";
import $ from "./Diary.module.scss";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import { useNavigate } from "react-router-dom";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import { FiEdit3 } from "react-icons/fi";

type SortOption = "latest" | "likes" | "views";

const diaryEntries: Preview[] = [
  {
    id: 1,
    title: "내 실천일지",
    preview: "오늘 외교 관련 행사에 다녀왔습니다...",
    date: "2025-07-10",
  },
  {
    id: 2,
    title: "또 다른 일지",
    preview: "외교 활동 보고서를 작성 중입니다...",
    date: "2025-07-09",
  },
  {
    id: 3,
    title: "동현이의 실천일지",
    preview: "오늘 유엔 관련 뉴스 스크랩을 했습니다.",
    authorId: "donghyun",
    date: "2025-07-08",
  },
  {
    id: 4,
    title: "지윤이의 외교 기록",
    preview: "외교 행사에서 만난 사람들과 교류했어요.",
    authorId: "jiyoon",
    date: "2025-07-07",
  },
];

const sortOptions: readonly Option<SortOption>[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "views", label: "조회순" },
] as const;

function DiaryListPage() {
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [entries, setEntries] = useState<Preview[]>([...diaryEntries]);

  const handleNewDiary = () => {
    navigate("/diary/new");
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
          <h2>외교 실천일지</h2>
          <div className={$.headerActions}>
            <button className={$.writeButton} onClick={handleNewDiary}>
              <FiEdit3 size={20} color="#4c9eff" />
            </button>
          </div>
        </div>

        <div className={$.description}>
          <div className={$.descriptionContent}>
            <h3>💡 외교 실천일지란?</h3>
            <p>
              외교 실천일지는 시민 여러분이 일상에서 실천할 수 있는 외교 활동을
              기록하고 공유하는 공간입니다. 작은 실천이 모여 더 나은 세상을
              만들어가는 여정을 함께 해보세요.
            </p>
          </div>

          <div className={$.practiceItems}>
            <div className={$.practiceColumn}>
              <h4>📝 실천 항목과 예시</h4>
              <ul>
                <li>
                  <strong>탄소감축</strong> - 텀블러 사용, 대중교통 이용
                </li>
                <li>
                  <strong>무역외교</strong> - 공정무역 제품 구매
                </li>
                <li>
                  <strong>디지털외교</strong> - 외교 콘텐츠 공유
                </li>
                <li>
                  <strong>국제연대</strong> - 국제 NGO 기부, 봉사활동
                </li>
                <li>
                  <strong>문화교류</strong> - 한국 문화 소개, 외국 문화 체험
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={$.viewAllSection}>
          <div className={$.header}>
            <span className={$.viewAllText}>실천일지 둘러보기</span>
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
              type="diary"
              onClick={() => navigate(`/diary/${entry.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DiaryListPage;
