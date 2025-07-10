import PostEditor from "../components/PostEditor";

const DISCUSS_OPTIONS = [
  { label: "환경", value: "ENVIRONMENT" },
  { label: "문화", value: "CULTURE" },
  { label: "평화", value: "PEACE" },
  { label: "경제", value: "ECONOMY" },
] as const;

export default function DebatePostPage() {
  const handleSubmit = (data: unknown) => {
    console.log("토론글 작성 데이터", data);
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
