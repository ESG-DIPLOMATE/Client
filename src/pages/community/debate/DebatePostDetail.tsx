import { useParams } from "react-router-dom";
import PostDetail from "../components/detail";
import { getDiscussBoardDetail } from "@/apis/community/community";
import type { DiscussBoardDetail } from "@/apis/community/community.type";
import { useEffect, useState } from "react";

export default function DebatePostDetail() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<DiscussBoardDetail>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getDiscussBoardDetail(id);
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
      owner={data.owner}
      type="debate"
      title={data.title}
      date={data.createdAt.slice(0, 10).replaceAll("-", ".")}
      authorId={data.userId}
      category={data.discussType}
      content={data.content ?? ""}
      images={data.discussBoardImages.map(
        (img) => `https://hihigh.lion.it.kr${img.imageUrl}`
      )}
      likeCount={data.likes}
      liked={data.liked}
      commentCount={data.discussBoardComments.length}
      comments={data.discussBoardComments.map((comment) => ({
        id: comment.id,
        userId: comment.userId,
        authorId: comment.userId,
        content: comment.content,
        commentType: comment.commentType,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        owner: comment.owner,
      }))}
    />
  );
}
