import { useState } from "react";
import "./Login.css";
import {
  container,
  container2,
  footer,
  gosignup,
  info,
  loginbt,
  loginform,
  loginformInput,
  loginformLabel,
  loginheader,
} from "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // const [showPassword, setShowPassword] = React.useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };
  // const preventDefault = (event: React.SyntheticEvent) =>
  //   event.preventDefault();
  return (
    <div className={container}>
      <div className={container2}>
        {/* 제목 */}
        <h2 className={loginheader}>Login</h2>
        {/* 이메일 입력창 */}
        <form className={loginform}>
          <label className={loginformLabel} htmlFor="email">
            E-mail
          </label>

          <input
            className={loginformInput}
            type="text"
            id="email"
            onChange={handleChangeEmail}
            value={email}
          />

          {/* 패스워드 입력창 */}
          <label className={loginformLabel} htmlFor="pw">
            Password
          </label>
          <input
            className={loginformInput}
            type="password"
            id="pw"
            onChange={handleChangePassword}
            value={password}
          />
        </form>
        {/* 입력 버튼 */}
        <button className={loginbt}>Login</button>
        {/* 밑에 문구 */}
        <div className={footer}>
          <p className={info}>
            아직 회원이 아니신가요? <span className={gosignup}>회원가입</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
