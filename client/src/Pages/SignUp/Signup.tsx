import { useState } from "react";
import { RiEyeCloseLine, RiEyeFill } from "react-icons/ri";
import "./Signup.css.ts";
import {
  container,
  container2,
  error,
  footer,
  gologin,
  info,
  passwordInputWrap,
  pwToggleBtn,
  signupbt,
  signupform,
  signupformInput,
  signupformLabel,
  signupheader,
} from "./Signup.css.ts";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import instance from "../../api/axios.ts";
import requests from "../../api/requests.ts";
import { useCookies } from "react-cookie";
import axios, { AxiosError } from "axios";

interface SignUpForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {
  const { VITE_SECRET_KEY } = import.meta.env;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const [cookies, setCookies] = useCookies(["refreshToken", "accessToken"]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("유효하지 않은 이메일 주소입니다.")
      .required("필수 입력 항목입니다."),
    name: Yup.string().required("필수 입력 항목입니다."),
    password: Yup.string()
      .min(4, "비밀번호는 4자 이상이어야 합니다.")
      .max(16, "비밀번호는 16자 이하여야 합니다.")
      .matches(/[~!@#$%*]/, "비밀번호에는 특수문자~!@#$%*을 포함해야 합니다.")
      .required("필수 입력 항목입니다."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "비밀번호가 일치하지 않습니다."
    ),
  });

  const formik = useFormik<SignUpForm>({
    initialValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // const encryptedPassword = CryptoJS.AES.encrypt(
        //   values.password,
        //   VITE_SECRET_KEY
        // ).toString();
        // 사용자 등록을 위한 API 호출
        const response = await axios.post(
          "https://7fea-59-5-169-61.ngrok-free.app/api/v1" + requests.signUp,
          {
            email: values.email,
            password: values.password,
            name: values.name,
          }
        );

        // 사용자 등록 성공 처리
        console.log("사용자 등록 성공:", response.data);
        navigate("/login");
        toast.success("회원가입 성공");
      } catch (error) {
        // 오류 처리

        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 409
        ) {
          console.error(
            "이미 존재하는 회원입니다:",
            (error as AxiosError).response?.data
          );
          toast.error("이미 존재하는 회원입니다.");
        } else {
          console.error("사용자 등록 오류:", error);
        }
      }
    },
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  const handleClickLogin = () => {
    navigate("/login");
  };

  return (
    <div className={container}>
      <div className={container2}>
        {/* 제목 */}
        <p className={signupheader}>Sign Up</p>
        {/* 이메일 입력창 */}
        <form className={signupform} onSubmit={handleSubmit}>
          <label className={signupformLabel} htmlFor="email">
            E-mail
          </label>

          <input
            className={signupformInput}
            type="text"
            id="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <div className={error}>{errors.email}</div>
          )}

          {/* 이름 입력창 */}
          <label className={signupformLabel} htmlFor="name">
            Name
          </label>
          <input
            className={signupformInput}
            type="text"
            id="name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <div className={error}>{errors.name}</div>
          )}
          {/* 패스워드 입력창 */}
          <label className={signupformLabel} htmlFor="pw">
            Password
          </label>
          <div className={passwordInputWrap}>
            <input
              className={signupformInput}
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
          {/* 패스워드 확인 입력창 */}

          <label className={signupformLabel} htmlFor="cpw">
            ConfirmPassword
          </label>
          <div className={passwordInputWrap}>
            <input
              className={signupformInput}
              type={showConfirmPassword ? "text" : "password"}
              id="cpw"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword}
              onBlur={handleBlur}
            />
            <button
              type="button"
              className={pwToggleBtn}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
            </button>
          </div>
          {errors.confirmPassword && touched.confirmPassword && (
            <div className={error}>{errors.confirmPassword}</div>
          )}
          {/* 입력 버튼 */}
          <button className={signupbt} type="submit">
            Sign up
          </button>
        </form>
        {/* 밑에 문구 */}
        <div className={footer}>
          <p className={info}>
            이미 회원이신가요?
            <span className={gologin} onClick={handleClickLogin}>
              로그인
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
