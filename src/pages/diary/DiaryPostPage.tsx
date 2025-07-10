import PostEditor from "../community/components/PostEditor";

const PRACTICE_OPTIONS = [
  { label: "탄소감축", value: "탄소감축" },
  { label: "무역외교", value: "무역외교" },
  { label: "디지털외교", value: "디지털외교" },
  { label: "국제연대", value: "국제연대" },
  { label: "문화교류", value: "문화교류" },
] as const;

export default function DiaryPostPage() {
  const handleSubmit = (data: unknown) => {
    console.log("실천일지 작성 데이터", data);
  };

  return (
    <PostEditor
      type="diary"
      title="나의 외교실천일지"
      dropdownLabel="실천항목"
      dropdownOptions={PRACTICE_OPTIONS}
      onSubmit={handleSubmit}
    />
  );
}
