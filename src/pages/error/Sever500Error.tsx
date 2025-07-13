import { useNavigate } from "react-router-dom";
import $ from "./Sever500Error.module.scss";
import { FiAlertTriangle } from "react-icons/fi";
import Button from "@/components/common/Button";

export default function Sever500Error() {
  const navigate = useNavigate();

  return (
    <div className={$.wrapper}>
      <div>
        <FiAlertTriangle className={$.errorIcon} />
        <h1>서버 내부 에러가 발생했습니다.</h1>
        <p>잠시 후 다시 이용해주세요.</p>
      </div>
      <Button variant="primary" onClick={() => navigate("/")}>홈으로</Button>
    </div>
  );
}
