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
        await editDiaryBoard(Number(editId), {
          title: data.title,
          content: data.content,
          practiceCategory: data.dropdownValue!,
          images: compressedImages,
        });
        toast("수정되었습니다!");
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
      toast("작성 실패");
    }
  };

  if (editId && loading) {
    return <p>불러오는 중...</p>;
  }

  return (
    <PostEditor
      type="diary"
      title={editId ? "실천일지 수정하기" : "나의 외교실천일지"}
      dropdownLabel="항목"
      dropdownOptions={PRACTICE_OPTIONS}
      onSubmit={handleSubmit}
      defaultValues={defaultValues ?? undefined}
      submitText={editId ? "수정하기" : "작성 완료"}
    />
  );
}
