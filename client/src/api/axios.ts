import axios from "axios";
import { useCookies } from "react-cookie";
import requests from "./requests";

const instance = axios.create({
  baseURL: "https://7fea-59-5-169-61.ngrok-free.app/api/v1",
  withCredentials: true,
});

const tokenRefresh = async (cookies, setCookies) => {
  // const [cookies, setCookies] = useCookies(["refreshToken", "accessToken"]);
  try {
    const refreshToken = cookies.refreshToken;
    const accessToken = cookies.accessToken;
    const response = await axios.post(
      `https://7fea-59-5-169-61.ngrok-free.app/api/v1` + requests.refresh,
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
        body: {
          refreshToken: refreshToken,
          accessToken: accessToken,
        },
      }
    );
    console.log("확잉용", response);

    if (response && response.data) {
      setCookies("accessToken", response.data.access, { path: "/" });
      setCookies("refreshToken", response.data.refresh, { path: "/" });
    }
  } catch (error) {
    console.error("토큰 갱신 실패", error);
  }
};

// 요청이 전달되기 전에 작업 수행 혹은 요청 오류가 있는 함수를 받음
instance.interceptors.request.use(
  (config) => {
    const [cookies] = useCookies(["accessToken"]);
    const accessToken = cookies.accessToken;

    config.headers["Content-Type"] = "application/json";
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 일세");
    }
    return response;
  },
  async (error) => {
    console.log(error);

    if (error.response?.status === 401) {
      const [cookies, setCookies] = useCookies(["accessToken"]);
      await tokenRefresh(cookies, setCookies);
      const new_accessToken = cookies.accessToken;

      error.config.headers["Authorization"] = `Bearer ${new_accessToken}`;

      const response = await axios.request(error.config);
      return response;
    }

    return Promise.reject(error);
  }
);

export default instance;
