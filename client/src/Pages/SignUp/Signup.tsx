import { useState } from "react";
import "./Signup.css.ts";
import {
  container,
  container2,
  footer,
  gologin,
  info,
  signupbt,
  signupform,
  signupformInput,
  signupformLabel,
  signupheader,
} from "./Signup.css.ts";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [ConfirmPassword, setComfirmPassWord] = useState("");
  // const [showPassword, setShowPassword] = React.useState(false);
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassWord = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setComfirmPassWord(e.target.value);
  };

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
        <h2 className={signupheader}>Sign Up</h2>
        {/* 이메일 입력창 */}
        <form className={signupform}>
          <label className={signupformLabel} htmlFor="email">
            E-mail
          </label>

          <input
            className={signupformInput}
            type="text"
            id="email"
            onChange={(e) => handleChangeEmail(e)}
            value={email}
          />

          {/* 이름 입력창 */}
          <label className={signupformLabel} htmlFor="name">
            Name
          </label>
          <input
            className={signupformInput}
            type="text"
            id="name"
            onChange={handleChangeName}
            value={name}
          />
          {/* 패스워드 입력창 */}
          <label className={signupformLabel} htmlFor="pw">
            Password
          </label>
          <input
            className={signupformInput}
            type="password"
            id="pw"
            onChange={handleChangePassword}
            value={password}
          />
          {/* 패스워드 확인 입력창 */}
          <label className={signupformLabel} htmlFor="cpw">
            ConfirmPassword
          </label>
          <input
            className={signupformInput}
            type="password"
            id="cpw"
            onChange={handleChangeConfirmPassWord}
            value={ConfirmPassword}
          />
        </form>
        {/* 입력 버튼 */}
        <button className={signupbt}>Sign up</button>
        {/* 밑에 문구 */}
        <div className={footer}>
          <p className={info}>
            이미 회원이신가요? <span className={gologin}>로그인</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
