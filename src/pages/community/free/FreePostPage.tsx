import { useNavigate } from "react-router-dom";
import PostEditor from "../components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import { createFreeBoard } from "@/apis/community/community";
import type { PostEditorFormData } from "../components/detail";

export default function FreePostPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data: PostEditorFormData) => {
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      const res = await createFreeBoard({
        title: data.title,
        content: data.content,
        images: compressedImages,
      });

      const postId = res.data.postId;
      console.log(postId);

      navigate(`/free/${postId}`);
    } catch (e) {
      console.error(e);
      alert("작성 실패");
    }
  };

  return (
    <PostEditor
      type="free"
      title="자유 게시글 작성하기"
      onSubmit={handleSubmit}
    />
  );
}
