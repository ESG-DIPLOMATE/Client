import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostEditor from "../community/components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import {
  createDiary,
  editDiaryBoard,
  getDiaryBoardDetail,
} from "@/apis/community/community";
import type { PostEditorFormData } from "../community/components/detail";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/common/Spinner";
import $ from "../main/Main.module.scss";

const PRACTICE_OPTIONS = [
  { label: "탄소감축", value: "탄소감축" },
  { label: "무역외교", value: "무역외교" },
  { label: "디지털외교", value: "디지털외교" },
  { label: "국제연대", value: "국제연대" },
  { label: "문화교류", value: "문화교류" },
] as const;

export default function DiaryPostPage() {
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
        const res = await getDiaryBoardDetail(editId);
        const post = res.data;

        setDefaultValues({
          title: post.title,
          content: post.description,
          dropdownValue: post.action,
          images: [],
        });
      } catch (e) {
        console.error(e);
        toast("잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [editId]);

  const handleSubmit = async (data: PostEditorFormData) => {
    setLoading(true);
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      if (editId) {
        await editDiaryBoard(Number(editId), {
          title: data.title,
          content: data.content,
          practiceCategory: data.dropdownValue!,
          images: compressedImages,
        });
        toast("수정 완료되었습니다!");
        navigate(`/diary/${editId}`);
      } else {
        const res = await createDiary({
          title: data.title,
          content: data.content,
          practiceCategory: data.dropdownValue!,
          images: compressedImages,
        });

        const postId = res.data.postId;
        toast("업로드되었습니다!");
        navigate(`/diary/${postId}`);
      }
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (editId && loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  return (
    <PostEditor
      type="diary"
      title={editId ? "실천일지 수정하기" : "나의 외교실천일지"}
      dropdownLabel="항목"
      dropdownOptions={PRACTICE_OPTIONS}
      onSubmit={handleSubmit}
      defaultValues={defaultValues ?? undefined}
      submitText={editId ? "수정하기" : "작성 완료"}
      loading={loading}
    />
  );
}
