import { useState } from "react";
import $ from "./Signup.module.scss";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import BackgroundImg from "@/assets/img/BackgroundImg1.png";
import { checkUserId, signup } from "@/apis/auth/auth";
import { useNavigate } from "react-router-dom";

type IdCheckStatus = "idle" | "checking" | "available" | "unavailable";

export default function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  const [idCheckStatus, setIdCheckStatus] = useState<IdCheckStatus>("idle");

  const passwordsMatch = pw === pwConfirm || pwConfirm === "";
  const isFormValid =
    id && pw && pwConfirm && passwordsMatch && idCheckStatus === "available";

    const handleIdCheck = async () => {
      try {
        setIdCheckStatus("checking");
        const res = await checkUserId(id);
        const isAvailable = res.data.available;
        setIdCheckStatus(isAvailable ? "available" : "unavailable");
      } catch (e) {
        console.error(e);
        setIdCheckStatus("unavailable");
      }
    };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    if (newId !== id) {
      setIdCheckStatus("idle");
    }
    setId(newId);
  };

  const handleSignup = async () => {
    try {
      await signup({
        userId: id,
        password: pw,
      });
      navigate("/login");
    } catch (e) {
      console.error(e);
      alert("회원가입에 실패했습니다.");
    }
  };

  const getButtonText = () => {
    switch (idCheckStatus) {
      case "available":
        return "사용가능";
      case "checking":
        return "확인중";
      case "unavailable":
        return "사용중";
      default:
        return "중복체크";
    }
  };

  return (
    <div className={$.Wrapper}>
      <div className={$.container}>
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: 700, color: "#272727" }}>
            회원가입
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              fontSize: "14px",
              marginTop: "30px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              lineHeight: 1.5,
            }}
          >
            <span>'한터내셔널: 나도 외교관'에 오신 여러분, 환영합니다!</span>
            <span>시민 외교관이 되어 외교에 참여해주세요!</span>
          </div>
          <img
            src={BackgroundImg}
            className={$.BackgroundImg}
            alt="회원가입 외교돌이"
          />
        </div>

        <div className={$.formContainer}>
          <div className={$.inputsWrapper}>
            <div className={$.inputRow}>
              <div className={$.idInputWrapper}>
                <Input
                  placeholder="아이디를 입력해주세요."
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
              <div className={$.checkButtonWrapper}>
                <Button
                  variant="secondary"
                  size="large"
                  disabled={
                    id.trim() === "" ||
                    idCheckStatus === "checking" ||
                    idCheckStatus === "available"
                  }
                  onClick={handleIdCheck}
                >
                  {getButtonText()}
                </Button>
              </div>
            </div>

            <Input
              placeholder="비밀번호를 입력해주세요."
              type="text"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <Input
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              type="text"
              value={pwConfirm}
              onChange={(e) => setPwConfirm(e.target.value)}
            />
            <div className={$.errorWrapper}>
              {!passwordsMatch && (
                <p className={$.errorText}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>

          <Button
            variant="primary"
            disabled={!isFormValid}
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
