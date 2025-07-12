import PostEditor from "../components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import type { PostEditorFormData } from "../components/detail";
import { createDiscussBoard } from "@/apis/community/community";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DISCUSS_OPTIONS = [
  { label: "환경", value: "ENVIRONMENT" },
  { label: "문화", value: "CULTURE" },
  { label: "평화", value: "PEACE" },
  { label: "경제", value: "ECONOMY" },
] as const;

export default function DebatePostPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: PostEditorFormData) => {
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      const res = await createDiscussBoard({
        title: data.title,
        content: data.content,
        discussType: data.dropdownValue!,
        images: compressedImages,
      });

      const postId = res.data.postId;
      toast("업로드되었습니다!");
      navigate(`/debate/${postId}`);
    } catch (e) {
      console.error(e);
      alert("작성 실패");
    }
  };

  return (
    <PostEditor
      type="debate"
      title="외교 토론 작성하기"
      dropdownLabel="분야"
      dropdownOptions={DISCUSS_OPTIONS}
      onSubmit={handleSubmit}
    />
  );
}
