import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import { getFreeBoardList, deletePost } from "@/apis/community/community";
import $ from "../../diary/Diary.module.scss";
import { FiEdit3 } from "react-icons/fi";

type SortOption = "latest" | "likes" | "views";

const sortOptions: readonly Option<SortOption>[] = [
  { value: "latest", label: "최신순" },
  { value: "likes", label: "좋아요순" },
  { value: "views", label: "조회순" },
] as const;

function FreeListPage() {
  const navigate = useNavigate();
  const [currentSort, setCurrentSort] = useState<SortOption>("latest");
  const [entries, setEntries] = useState<Preview[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchList = async (page: number, reset = false) => {
    try {
      setLoading(true);

      const res = await getFreeBoardList({
        page,
        size: 10,
        sortBy: currentSort,
      });

      const previews: Preview[] = res.data.data.content.map((item) => ({
        id: item.id,
        title: item.title,
        preview: item.content || "",
        authorId: item.userId,
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

      setHasMore(!res.data.data.pagination.last);
      pageRef.current = page;
    } catch (e) {
      console.error(e);
      alert("게시글 목록을 불러오지 못했습니다.");
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

      if (entry.isIntersecting && hasMore && !loading) {
        const nextPage = pageRef.current + 1;
        fetchList(nextPage);
      }
    },
    [hasMore, loading, currentSort]
  );

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 1.0,
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [observerRef, observerCallback]);

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };

  const handleNewPost = () => {
    navigate("/free/new");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deletePost("free", id);
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
                type="free"
                owner={entry.owner}
                onClick={() => navigate(`/free/${entry.id}`)}
                onDelete={() => handleDelete(entry.id)}
              />
            ))
          )}
          {loading && entries.length > 0 && <p>더 불러오는 중...</p>}
          <div ref={observerRef} style={{ height: "1px" }}></div>
        </div>
      </div>
    </div>
  );
}

export default FreeListPage;
