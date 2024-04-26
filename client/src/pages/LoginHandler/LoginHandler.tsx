import axios from "axios";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const { VITE_BASE_REQUEST_URL } = import.meta.env;


const LoginHandler = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const cookies = new Cookies();

  const kakaoLogin = async () => {

    try {
      const response = await axios.post(`${VITE_BASE_REQUEST_URL}/members/kakao/login`, {
        code: code
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
      );
      // console.log("카카오", response)
      // localStorage.setItem("name",response.data)
      cookies.set("accessToken", response.data.access, { path: '/', secure: true, })
      cookies.set("refreshToken", response.data.refresh, { path: '/', secure: true, })
      window.location.href = "/"
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  };

  useEffect(() => {
    kakaoLogin()
  }, [])

  // }, [])
  return (
    <div className="spinner center">
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
      <div className="spinner-blade"></div>
    </div>
  )
}

export default LoginHandler