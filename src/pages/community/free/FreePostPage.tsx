import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostEditor from "../components/PostEditor";
import { compressImages } from "@/utils/imageCompressor";
import {
  createFreeBoard,
  getFreeBoardDetail,
  editFreeBoard,
} from "@/apis/community/community";
import type { PostEditorFormData } from "../components/detail";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/common/Spinner";
import $ from "../../main/Main.module.scss";

export default function FreePostPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isEdit = Boolean(id);

  const [defaultValues, setDefaultValues] = useState<PostEditorFormData | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getFreeBoardDetail(id!);
        const post = res.data;
        setDefaultValues({
          title: post.title,
          content: post.content,
          images: [],
        });
      } catch (e) {
        console.error(e);
        toast("잠시 후 다시 시도해주세요.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEdit, navigate]);

  const handleSubmit = async (data: PostEditorFormData) => {
    setLoading(true);
    try {
      const compressedImages = data.images
        ? await compressImages(data.images)
        : undefined;

      if (isEdit) {
        await editFreeBoard(Number(id), {
          title: data.title,
          content: data.content,
          images: compressedImages,
        });
        toast("수정 완료되었습니다!");
        navigate(`/free/${id}`);
      } else {
        const res = await createFreeBoard({
          title: data.title,
          content: data.content,
          images: compressedImages,
        });
        const newPostId = res.data.postId;
        navigate(`/free/${newPostId}`);
      }
    } catch (e) {
      console.error(e);
      toast("잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  if (isEdit && loading)
    return (
      <div className={$.loadingOverlay}>
        <LoadingSpinner />
      </div>
    );

  return (
    <PostEditor
      type="free"
      title={isEdit ? "자유 게시글 수정하기" : "자유 게시글 작성하기"}
      onSubmit={handleSubmit}
      defaultValues={defaultValues || undefined}
      submitText={isEdit ? "수정하기" : "작성완료"}
      loading={loading}
    />
  );
}
