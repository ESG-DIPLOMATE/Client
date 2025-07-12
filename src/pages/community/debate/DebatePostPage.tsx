import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostEditor from "../components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import {
  createDiscussBoard,
  editDiscussBoard,
  getDiscussBoardDetail,
} from "@/apis/community/community";
import type { PostEditorFormData } from "../components/detail";
import { toast } from "react-toastify";

const DISCUSS_OPTIONS = [
  { label: "환경", value: "ENVIRONMENT" },
  { label: "문화", value: "CULTURE" },
  { label: "평화", value: "PEACE" },
  { label: "경제", value: "ECONOMY" },
] as const;

export default function DebatePostPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");

  const [defaultValues, setDefaultValues] = useState<PostEditorFormData | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!editId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getDiscussBoardDetail(editId);
        const post = res.data;

        setDefaultValues({
          title: post.title,
          content: post.content,
          dropdownValue: post.discussType,
          images: [],
        });
      } catch (e) {
        console.error(e);
        toast("글 정보를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [editId]);

  const handleSubmit = async (data: PostEditorFormData) => {
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      if (editId) {
        await editDiscussBoard(Number(editId), {
          title: data.title,
          content: data.content,
          discussType: data.dropdownValue!,
          images: compressedImages,
        });
        toast("수정되었습니다!");
        navigate(`/debate/${editId}`);
      } else {
        const res = await createDiscussBoard({
          title: data.title,
          content: data.content,
          discussType: data.dropdownValue!,
          images: compressedImages,
        });

        const postId = res.data.postId;
        toast("업로드되었습니다!");
        navigate(`/debate/${postId}`);
      }
    } catch (e) {
      console.error(e);
      toast("작성 실패");
    }
  };

  if (editId && loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <PostEditor
      type="debate"
      title={editId ? "외교 토론 수정하기" : "외교 토론 작성하기"}
      dropdownLabel="분야"
      dropdownOptions={DISCUSS_OPTIONS}
      onSubmit={handleSubmit}
      defaultValues={defaultValues ?? undefined}
      submitText={editId ? "수정하기" : "작성 완료"}
    />
  );
}
