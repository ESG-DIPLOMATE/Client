import { useNavigate } from "react-router-dom";
import $ from "./StartTest.module.scss";
import Button from "@/components/common/Button";

export default function StartTest() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/test");
  };

  return (
    <div className={$.wrapper}>
      <div className={$.contentWrapper}>
        <section className={$.introSection}>
          <h1>글로벌 시민력 테스트</h1>
          <p>
            나의 시민외교 성향을 알아보고
            <br />
            나에게 꼭 맞는 글로벌 참여 방법을 찾아보세요!
          </p>
        </section>

        <section className={$.infoSection}>
          <ul>
            <li>
              <strong>목적:</strong> 글로벌 이슈에 대한 나의 관심과 성향을
              분석해 나에게 맞는 시민외교 활동을 추천합니다.
            </li>
            <li>
              <strong>문항 수:</strong> 총 15문항 (지식, 태도, 성향이 고루 포함)
            </li>
            <li>
              <strong>시민외교 타입:</strong> 평화중재형, 기후행동형,
              문화외교형, 경제통상형, 디지털소통형
            </li>
            <li>
              각 질문의 선택지가 특정 타입 점수에 영향을 주며, 최종적으로 가장
              높은 점수의 타입을 알려드립니다.
            </li>
          </ul>
        </section>
      </div>

      <div className={$.buttonArea}>
        <Button onClick={handleStart} variant="primary" size="large">
          테스트 시작하기
        </Button>
      </div>
    </div>
  );
}
