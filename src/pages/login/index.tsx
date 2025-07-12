import { useState } from "react";
import $ from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import BackgroundImg from "@/assets/img/BackgroundImg3.png";
import instance from "@/apis/instance";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await instance.post("/api/v1/auth/login", {
        userId: id,
        password: pw,
      });
  
      const { accessToken, refreshToken } = res.data;
  
      if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/");
      } else {
        alert("로그인 실패: 토큰이 없습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={$.Wrapper}>
      <div className={$.container}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            fontSize: "15px",
            marginBottom: "50px",
            fontWeight: 600,
          }}
        >
          <span>국민 누구나 일상에서 외교에 참여할 수 있어요!</span>
          <span>시민 외교관, 함께 해볼까요?</span>
        </div>
        <img
          src={BackgroundImg}
          className={$.BackgroundImg}
          alt="로그인 외교돌이"
        />

        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <p style={{ fontSize: "35px", marginBottom: "5px" }}>
              한터내셔널:
            </p>
            <p style={{ fontSize: "40px" }}>나도 외교관</p>
          </div>
          <div>
            <div className={$.formContainer}>
              <Input
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Input
                placeholder="비밀번호를 입력해주세요."
                type="text"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <Button
                variant="primary"
                disabled={!id || !pw || loading}
                onClick={handleLogin}
              >
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#7B7B7B",
                marginTop: "30px",
                cursor: "pointer",
                textAlign: "center",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
