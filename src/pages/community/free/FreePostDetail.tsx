import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PostDetail from "../components/detail";
import { getFreeBoardDetail } from "@/apis/community/community";
import type { FreeBoardDetail } from "@/apis/community/community.type";

export default function FreePostDetail() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<FreeBoardDetail>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getFreeBoardDetail(id);
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
      type="free"
      title={data.title}
      date={data.createdAt.slice(0, 10).replaceAll("-", ".")}
      authorId={data.userId}
      content={data.content}
      images={data.freeBoardImages.map(
        (img) => `https://hihigh.lion.it.kr${img.imageUrl}`
      )}
      likeCount={data.likes}
      liked={data.liked}
      commentCount={data.freeBoardComments.length}
      comments={data.freeBoardComments.map((comment) => ({
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
