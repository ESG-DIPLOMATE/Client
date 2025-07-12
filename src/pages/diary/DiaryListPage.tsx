import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import { deletePost, getDiaryList } from "@/apis/community/community";
import $ from "./Diary.module.scss";
import { FiEdit3 } from "react-icons/fi";

type SortOption = "latest" | "likes" | "views";

const sortOptions: readonly Option<SortOption>[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "views", label: "조회순" },
] as const;

function DiaryListPage() {
  const navigate = useNavigate();

  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [entries, setEntries] = useState<Preview[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const pageRef = useRef(0);
  const observerRef = useRef<HTMLDivElement>(null);

  const fetchList = async (page = 0, reset = false) => {
    try {
      setLoading(true);

      const res = await getDiaryList({
        page,
        size: 10,
        sortBy: currentSort,
      });

      const previews: Preview[] = res.data.data.content.map((item) => ({
        id: item.id,
        title: item.title,
        preview: item.description ?? "",
        authorId: item.userId,
        category: item.action,
        date: item.createdAt.slice(0, 10),
        likes: item.likes,
        liked: item.liked,
        owner: item.owner,
      }));

      if (reset) {
        setEntries(previews);
      } else {
        setEntries((prev) => [...prev, ...previews]);
      }

      setHasNext(!res.data.data.pagination.last);
      pageRef.current = page;
    } catch (e) {
      console.error(e);
      alert("실천일지 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pageRef.current = 0;
    fetchList(0, true);
  }, [currentSort]);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNext && !loading) {
        fetchList(pageRef.current + 1);
      }
    },
    [hasNext, loading, currentSort]
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerCallback]);

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };

  const handleNewDiary = () => {
    navigate("/diary/new");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePost("diary", id);
      alert("삭제가 완료되었습니다.");
      pageRef.current = 0;
      fetchList(0, true);
    } catch (e) {
      console.error(e);
      alert("삭제 중 오류가 발생했습니다.");
    }
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
          {loading && entries.length === 0 ? (
            <p>로딩 중...</p>
          ) : entries.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            entries.map((entry) => (
              <PreviewCard
                key={entry.id}
                post={entry}
                type="diary"
                owner={entry.owner}
                onClick={() => navigate(`/diary/${entry.id}`)}
                onDelete={() => handleDelete(entry.id)}
              />
            ))
          )}
          {loading && entries.length > 0 && <p>더 불러오는 중...</p>}
          <div ref={observerRef} style={{ height: "1px" }} />
        </div>
      </div>
    </div>
  );
}

export default DiaryListPage;
