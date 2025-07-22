import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import DropDownButton, {
  type Option,
} from "@/components/common/Button/DropDownButton";
import PreviewCard, { type Preview } from "@/components/Card/PreviewCard";
import Modal from "@/components/common/Modal";
import { deletePost, getDiaryList } from "@/apis/community/community";
import $ from "./Diary.module.scss";
import { FiEdit3 } from "react-icons/fi";
import LoadingSpinner from "@/components/common/Spinner";
import { toast } from "react-toastify";

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
  const [hasMore, setHasNext] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState<number | null>(null);

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
      toast("잠시 후 다시 시도해주세요.");
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
        fetchList(pageRef.current + 1);
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
  }, [observerCallback]);

  const handleSortChange = (sort: SortOption) => {
    setCurrentSort(sort);
  };

  const handleNewDiary = () => {
    navigate("/diary/new");
  };

  const handleDelete = (id: number) => {
    setTargetDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (targetDeleteId == null) return;
    try {
      await deletePost("diary", targetDeleteId);
      toast("삭제되었습니다.");
      pageRef.current = 0;
      fetchList(0, true);
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    } finally {
      setShowDeleteModal(false);
      setTargetDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTargetDeleteId(null);
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
            <LoadingSpinner />
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
          {loading && entries.length > 0 && <LoadingSpinner />}
          <div ref={observerRef} style={{ height: "1px" }} />
        </div>
      </div>
      {showDeleteModal && (
        <Modal onConfirm={confirmDelete} onCancel={cancelDelete}>
          정말로 이 게시글을 삭제하시겠습니까?
        </Modal>
      )}
    </div>
  );
}

export default DiaryListPage;
