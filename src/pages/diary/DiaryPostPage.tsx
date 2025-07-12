import PostEditor from "../community/components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import { useNavigate } from "react-router-dom";
import type { PostEditorFormData } from "../community/components/detail";
import { createDiary } from "@/apis/community/community";

const PRACTICE_OPTIONS = [
  { label: "탄소감축", value: "탄소감축" },
  { label: "무역외교", value: "무역외교" },
  { label: "디지털외교", value: "디지털외교" },
  { label: "국제연대", value: "국제연대" },
  { label: "문화교류", value: "문화교류" },
] as const;

export default function DiaryPostPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: PostEditorFormData) => {
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      const res = await createDiary({
        title: data.title,
        content: data.content,
        practiceCategory: data.dropdownValue!,
        images: compressedImages,
      });

      const postId = res.data.postId;
      navigate(`/diary/${postId}`);
    } catch (e) {
      console.error(e);
      alert("작성 실패");
    }
  };

  return (
    <PostEditor
      type="diary"
      title="나의 외교실천일지"
      dropdownLabel="항목"
      dropdownOptions={PRACTICE_OPTIONS}
      onSubmit={handleSubmit}
    />
  );
}
