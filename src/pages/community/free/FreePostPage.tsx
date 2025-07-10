import PostEditor from "../components/PostEditor";

export default function FreePostPage() {
  const handleSubmit = (data: unknown) => {
    console.log("자유게시판 작성 데이터", data);
  };

  return (
    <PostEditor
      type="free"
      title="자유 게시글 작성하기"
      onSubmit={handleSubmit}
    />
  );
}
