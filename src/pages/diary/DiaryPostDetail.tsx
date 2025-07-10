// import { useParams } from "react-router-dom";

import PostDetail from "../community/components/detail";

export default function DiaryPostDetail() {
  // const { id } = useParams();

  const dummy = {
    title: "내 실천일지",
    date: "2025.07.10",
    authorId: "myUserId",
    category: "탄소감축",
    content: "오늘 외교 관련 행사에 다녀왔습니다...",
    images: ["/sample1.png", "/sample2.png"],
    likeCount: 12,
    commentCount: 3,
    isMine: true,
    comments: [
      {
        id: 1,
        authorId: "user01",
        content: "멋진 실천이네요!",
        date: "2025.07.10",
      },
    ],
  };

  return (
    <PostDetail
      isMine={dummy.isMine}
      type="diary"
      title={dummy.title}
      date={dummy.date}
      authorId={dummy.authorId}
      category={dummy.category}
      content={dummy.content}
      images={dummy.images}
      likeCount={dummy.likeCount}
      commentCount={dummy.commentCount}
      comments={dummy.comments}
    />
  );
}
