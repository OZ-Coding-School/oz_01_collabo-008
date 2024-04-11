import axios from "axios";

const instance = axios.create({
  baseURL: "https://7fea-59-5-169-61.ngrok-free.app/api/v1",
  withCredentials: true,
});

export default instance;
