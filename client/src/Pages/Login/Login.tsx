import { useState } from "react";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import "./Login.css.ts";
import {
  container,
  container2,
  error,
  errorText,
  footer,
  gosignup,
  info,
  loginbt,
  loginform,
  loginformInput,
  loginformLabel,
  loginheader,
  passwordInputWrap,
  pwToggleBtn,
} from "./Login.css.ts";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import instance from "../../api/axios.ts";
import requests from "../../api/requests.ts";
import { useCookies } from "react-cookie";
import axios from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { VITE_SECRET_KEY } = import.meta.env;

  const [cookies, setCookies] = useCookies(["refreshToken", "accessToken"]);
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("유효하지 않은 이메일 주소입니다.")
      .required("필수 입력 항목입니다."),
    password: Yup.string().required("필수 입력 항목입니다."),
  });

  const formik = useFormik<LoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // const encryptedPassword = CryptoJS.AES.encrypt(
        //   values.password,
        //   VITE_SECRET_KEY
        // ).toString();
        // 로그인 위한 API 호출
        const response = await axios.post(
          "https://7fea-59-5-169-61.ngrok-free.app/api/v1" + requests.login,
          {
            email: values.email,
            password: values.password,
          }
        );

        // 로그인 성공 처리
        console.log("로그인 성공:", response.data);
        setCookies("refreshToken", response.data.refresh);
        setCookies("accessToken", response.data.access);
        navigate("/");
        toast.success("로그인 성공");
      } catch (error) {
        // 오류 처리
        console.error("로그인 오류:", error);
        setErrorText("아이디 또는 비밀번호가 잘못되었습니다.");
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const handleClickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className={container}>
      <div className={container2}>
        {/* 제목 */}
        <p className={loginheader}>Login</p>
        {/* 이메일 입력창 */}
        <form className={loginform} onSubmit={handleSubmit}>
          <label className={loginformLabel} htmlFor="email">
            E-mail
          </label>

          <input
            className={loginformInput}
            type="text"
            id="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <div className={error}>{errors.email}</div>
          )}
          {/* 패스워드 입력창 */}
          <label className={loginformLabel} htmlFor="pw">
            Password
          </label>
          <div className={passwordInputWrap}>
            <input
              className={loginformInput}
              type={showPassword ? "text" : "password"}
              id="pw"
              name="password"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
            />
            <button
              type="button"
              className={pwToggleBtn}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
            </button>
          </div>
          {errors.password && touched.password && (
            <div className={error}>{errors.password}</div>
          )}
          {error && <p className={error}>{errorText}</p>}

          {/* 입력 버튼 */}
          <button
            className={loginbt}
            type="submit"
            // onClick={() => setCookies("token", "asdf", {})}
          >
            Login
          </button>
        </form>

        {/* 밑에 문구 */}
        <div className={footer}>
          <p className={info}>
            아직 회원이 아니신가요?{" "}
            <span className={gosignup} onClick={handleClickSignup}>
              회원가입
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
