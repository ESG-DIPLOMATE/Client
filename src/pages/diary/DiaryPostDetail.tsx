import { useParams } from "react-router-dom";
import PostDetail from "../community/components/detail";
import type { DiaryBoardDetail } from "@/apis/community/community.type";
import { useEffect, useState } from "react";
import { getDiaryBoardDetail } from "@/apis/community/community";

export default function DiaryPostDetail() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<DiaryBoardDetail>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getDiaryBoardDetail(id);
        setData(res.data);
      } catch (e) {
        console.error(e);
        alert("글을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>데이터가 없습니다.</p>;

  return (
    <PostDetail
      owner={data.owner ?? false}
      type="diary"
      title={data.title}
      date={data.createdAt.slice(0, 10).replaceAll("-", ".")}
      authorId={data.userId}
      category={data.action}
      content={data.description ?? ""}
      images={data.diaryImages.map(
        (img) => `https://hihigh.lion.it.kr${img.imageUrl}`
      )}
      likeCount={data.likes}
      liked={data.liked}
      commentCount={data.diaryComments.length}
      comments={data.diaryComments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        authorId: comment.userId,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        owner: comment.owner,
      }))}
    />
  );
}
