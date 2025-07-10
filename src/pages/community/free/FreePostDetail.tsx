// import { useParams } from "react-router-dom";
import PostDetail from "../components/detail";

export default function FreePostDetail() {
  // const { id } = useParams();

  const imagesPool = [
    "https://cdn.hddfs.com/files/dm/20231121/087b2fc6_202311211116319630.jpg?sf=webp&RS=750X902",
    "https://image.aladin.co.kr/product/29304/69/cover500/e092530166_1.jpg",
    "https://img.hankyung.com/photo/202503/01.39804561.1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD9xB4PrKrBhJgmI3sPnp59UA5EfUChnj2tg&s",
    "https://flexible.img.hani.co.kr/flexible/normal/640/340/imgdb/original/2020/0809/4915969718284988.jpg",
  ];

  function getRandomImages() {
    const shuffled = [...imagesPool].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 4); // 0~3장
    return shuffled.slice(0, count);
  }

  const dummyList = Array.from({ length: 10 }, (_, i) => ({
    title: `자유글 제목 ${i + 1}`,
    date: `2025.07.${String(10 + i).padStart(2, "0")}`,
    authorId: `freeUser${i + 1}`,
    content: `이건 자유글 내용이에요. ${
      i + 1
    }번째 글입니다. 여기에 다양한 내용을 작성할 수 있습니다.`,
    images: getRandomImages(),
    likeCount: Math.floor(Math.random() * 10),
    commentCount: Math.floor(Math.random() * 5),
    comments: [
      {
        id: i + 1,
        authorId: `commenter${i + 1}`,
        content: `자유글 ${i + 1}번의 댓글입니다.`,
        date: `2025.07.${String(10 + i).padStart(2, "0")}`,
      },
    ],
    isMine: i % 2 === 0, // 홀수번은 다른 사람 글
  }));

  const dummy = dummyList[0];

  return (
    <PostDetail
      isMine={dummy.isMine}
      type="free"
      title={dummy.title}
      date={dummy.date}
      authorId={dummy.authorId}
      content={dummy.content}
      images={dummy.images}
      likeCount={dummy.likeCount}
      commentCount={dummy.commentCount}
      comments={dummy.comments}
    />
  );
}
