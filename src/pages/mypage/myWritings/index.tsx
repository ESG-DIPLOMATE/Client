import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@/components/common/Appbar";
import KeywordChip from "@/components/Chip/KeywordChip";
import PreviewCard from "@/components/Card/PreviewCard";
import Modal from "@/components/common/Modal";
import $ from "./MyWritings.module.scss";
import { getMyPosts } from "@/apis/mypage/mypage";
import type { MyPost, PostFilter } from "@/apis/mypage/mypage.type";
import { deletePost } from "@/apis/community/community";
import LoadingSpinner from "@/components/common/Spinner";
import { toast } from "react-toastify";

const filterLabelToQuery: Record<string, PostFilter> = {
  전체: "ALL",
  자유게시판: "FREE",
  토론게시판: "DISCUSS",
  실천일지: "DIARY",
};

const filters = ["전체", "자유게시판", "토론게시판", "실천일지"];

export default function MyWritings() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>("전체");
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [targetDeletePost, setTargetDeletePost] = useState<{
    id: number;
    type: "free" | "debate" | "diary";
  } | null>(null);

  const fetchPosts = async (filterLabel: string) => {
    try {
      setLoading(true);
      const query = filterLabelToQuery[filterLabel];
      const res = await getMyPosts(query, 0, 20);
      setPosts(res.posts);
    } catch (error) {
      console.error("내 게시글 가져오기 실패", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedFilter);
  }, [selectedFilter]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleDeleteRequest = (
    id: number,
    type: "free" | "debate" | "diary"
  ) => {
    setTargetDeletePost({ id, type });
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!targetDeletePost) return;
    try {
      await deletePost(targetDeletePost.type, targetDeletePost.id);
      toast("삭제되었습니다.");
      fetchPosts(selectedFilter);
    } catch (error) {
      console.error("삭제 실패", error);
      toast("잠시 후 다시 시도해주세요.");
    } finally {
      setShowDeleteModal(false);
      setTargetDeletePost(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTargetDeletePost(null);
  };

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

          {loading ? (
            <LoadingSpinner />
          ) : posts.length === 0 ? (
            <p className={$.emptyText}>작성한 글이 없습니다.</p>
          ) : (
            posts.map((post) => {
              const postType =
                post.postType === "FREE_BOARD"
                  ? "free"
                  : post.postType === "DISCUSS_BOARD"
                  ? "debate"
                  : "diary";

              return (
                <PreviewCard
                  key={post.id}
                  owner={true}
                  post={{
                    id: post.id,
                    title: post.title,
                    preview: post.content,
                    owner: post.owner,
                    date: new Date(post.createdAt).toLocaleDateString(),
                    authorId: "나",
                    category:
                      post.postType === "DISCUSS_BOARD"
                        ? post.discussType || undefined
                        : post.postType === "DIARY"
                        ? post.action || undefined
                        : undefined,
                  }}
                  type={postType}
                  onClick={() => {
                    navigate(`/${postType}/${post.id}`, {
                      state: { from: "prev" },
                    });
                  }}
                  onDelete={() => handleDeleteRequest(post.id, postType)}
                />
              );
            })
          )}
        </section>
      </div>
      {showDeleteModal && (
        <Modal onConfirm={confirmDelete} onCancel={cancelDelete}>
          정말로 이 게시글을 삭제하시겠습니까?
        </Modal>
      )}
    </div>
  );
}
