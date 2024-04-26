import axios from "axios";

import { Cookies } from "react-cookie";
import requests from "./requests";

const { VITE_BASE_REQUEST_URL } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_REQUEST_URL,
  withCredentials: true,
});

const cookies = new Cookies();

const tokenRefresh = async () => {
  try {
    const refreshToken = cookies.get("refreshToken");

    const response = await axios.post(
      VITE_BASE_REQUEST_URL + requests.refresh,
      {
        // headers: {
        //   Authorization: `Bearer ${refreshToken}`,
        //   "Content-Type": "application/json",
        // },

        refresh: refreshToken,
      }
    );
    // console.log("확잉용", response);
    cookies.set("accessToken", response.data.access);
  } catch (error) {
    console.error("토큰 갱신 실패", error);
  }
};

// 요청이 전달되기 전에 작업 수행 혹은 요청 오류가 있는 함수를 받음
instance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("accessToken");

    config.headers["Content-Type"] = "application/json";
    // config.headers["Content-Type"] = "multipart/form-data";
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
      // console.log("404 일세");
    }
    return response;
  },
  async (error) => {
    // console.log(error);

    if (error.response?.status === 401) {
      await tokenRefresh();
      const new_accessToken = cookies.get("accessToken");

      error.config.headers["Authorization"] = `Bearer ${new_accessToken}`;

      const response = await axios.request(error.config);
      return response;
    }

    return Promise.reject(error);
  }
);

export default instance;
