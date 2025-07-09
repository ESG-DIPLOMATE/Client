import { useNavigate } from "react-router-dom";
import $ from "./Result.module.scss";
import Button from "@/components/common/Button";

export default function TestResult() {
  const navigate = useNavigate();

  //목데이터
  const typeName = "평화중재형";
  const typeDescription =
    "평화중재형은 국제 분쟁과 갈등 해결에 관심이 많으며, 평화와 인권을 중시하는 시민외교 타입입니다. 협력과 대화를 통해 문제를 해결하고자 합니다.";

  const handleRetry = () => {
    navigate("/test");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={$.wrapper}>
      <div className={$.content}>
        <p className={$.label}>당신의 글로벌 시민력은</p>
        <h1 className={$.typeName}>{typeName}</h1>
        <p className={$.typeDescription}>{typeDescription}</p>

        <section className={$.section}>
          <h2>외교콘텐츠 구독 추천</h2>
          <div className={$.placeholderBox}></div>
          <div className={$.placeholderBox}></div>
        </section>

        <section className={$.section}>
          <h2>외교활동 추천</h2>
          <div className={$.placeholderBox}></div>
          <div className={$.placeholderBox}></div>
        </section>

        <div className={$.buttonGroup}>
          <Button variant="secondary" onClick={handleRetry}>
            다시 테스트하기
          </Button>
          <Button variant="primary" onClick={handleGoHome}>
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
}