import { useState } from "react";
import $ from "./Signup.module.scss";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import BackgroundImg from "@/assets/img/BackgroundImg1.png";

export default function Signup() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

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
          fontSize: "15px",
          marginTop: '30px',
          fontWeight: 600
        }}
      >
        <span>'한터내셔널: 나도 외교관'에 오신 여러분, 환영합니다!</span>
        <span>시민 외교관이 되어 외교에 참여해주세요!</span>
      </div>
      <img src={BackgroundImg} className={$.BackgroundImg} alt='회원가입 외교돌이'/>
      </div>
      
      <div className={$.formContainer}>
        <div className={$.inputsWrapper}>
          <div className={$.inputRow}>
            <div className={$.idInputWrapper}>
              <Input
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className={$.checkButtonWrapper}>
              <Button variant="secondary" size="large">
                중복체크
              </Button>
            </div>
          </div>

          <Input
            placeholder="비밀번호를 입력해주세요."
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <Input
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            type="password"
            value={pwConfirm}
            onChange={(e) => setPwConfirm(e.target.value)}
          />
        </div>

        <Button variant="primary">회원가입</Button>
      </div>
    </div>
    </div>

  );
}
