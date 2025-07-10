// import { useParams } from "react-router-dom";

import PostDetail from "../components/detail";

export default function DebatePostDetail() {
  //   const { id } = useParams();

  const dummy = {
    title: "지구온난화 대책",
    date: "2025.07.12",
    authorId: "debater01",
    category: "환경",
    content: "기후 위기 대응 어떻게 생각하시나요?",
    images: [],
    likeCount: 5,
    commentCount: 2,
    isMine: true,
    // isMine: false,
    comments: [
      {
        id: 1,
        authorId: "userA",
        content:
          "찬성합니다!찬성합니다!찬성합니다!찬성합니다!찬성합니다!찬성합니다!찬성합니다!찬성합니다!찬성합니다!",
        date: "2025.07.12",
        opinion: "찬성",
      },
    ],
  };

  return (
    <PostDetail
      isMine={dummy.isMine}
      type="debate"
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
