import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../App";
import instance from "../../api/axios";
import requests from "../../api/requests";
import {
  btnWrap,
  deleteBtn,
  deleteBtnWrap,
  img,
  imgBtn,
  imgWrap,
  input,
  label,
  mainContainer,
  modifyBtn,
  profile,
  profileContent,
  titleWrap,
  userImg,
  userInfo,
  userNameWrap,
  wrap,
} from "./Mypage.css";



const Mypage = () => {
  // const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const [name, setName] = useState("")
  const { userData, setUserData } = useUserContext()
  const { VITE_BASE_REQUEST_URL } = import.meta.env;
  const queryClient = useQueryClient();
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append("image", file);

        const access = cookies.get("accessToken");

        const response = await axios.post(VITE_BASE_REQUEST_URL + requests.imageUpload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${access}`
          }
        });

        if (response.data.status_code === 200) {
          toast.success("사진이 성공적으로 업로드되었습니다.");
          // TODO: 업로드된 사진 URL을 받아와서 상태 업데이트 등 추가 작업
        } else {
          toast.error("사진 업로드 실패");
        }
        // console.log("사진 업로드", response.data);
      } catch (error) {
        console.error("사진 업로드 에러", error);
        toast.error("사진 업로드 중 오류가 발생했습니다.");
      }
    } else {
      // 파일이 선택되지 않은 경우에 대한 처리
      console.error("파일이 선택되지 않았습니다.");
      // 사용자에게 알림을 표시하거나 다른 처리를 수행할 수 있음
    }
  };


  const handleNameChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setName(target.value);
  };

  const handlePasswordChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(target.value);
  };


  const handleClickDelete = async () => {
    try {
      await instance.delete(requests.userInfo);
      const allCookies = cookies.getAll(); // 모든 쿠키 가져오기
      Object.keys(allCookies).forEach(cookieName => cookies.remove(cookieName)); // 모든 쿠키 이름을 순회하며 삭제
      toast.success("회원 탈퇴 되었습니다.");
      window.location.href = "/login"
    } catch (error) {
      console.error("회원탈퇴 실패", error);
    }
  };
  const refresh = cookies.get("refreshToken");
  const handleClickLogout = async () => {
    try {
      await instance.post(requests.logout, { refresh });
      // 로그아웃 성공 후, 모든 쿠키 삭제
      const allCookies = cookies.getAll(); // 모든 쿠키 가져오기
      Object.keys(allCookies).forEach(cookieName => cookies.remove(cookieName)); // 모든 쿠키 이름을 순회하며 삭제
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
      setUserData({ id: -1 })
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };
  const handleClickModify = async () => {
    try {
      if (isEditing) {
        try {
          await instance.put(requests.modify, {
            name: name,
            password,
          });
          toast.success("회원정보 수정 되었습니다.");
          setIsEditing(!isEditing);
          // setIsEditing(false); // 수정 완료 후 isEditing 상태를 false로 변경
          queryClient.invalidateQueries({ queryKey: ["me"] });
        } catch (error) {
          console.error("회원정보 수정 실패", error);
        }
      } else {
        setIsEditing(true);
      }
      console.log()
    } catch (error) {
      console.error("회원정보 수정 실패", error);
    }
  };



  return (
    <div className={wrap}>
      <div className={mainContainer}>
        <div className={titleWrap}>
          <p>내 정보</p>
          <button onClick={handleClickLogout} className={deleteBtn}>
            로그아웃
          </button>
        </div>

        <div className={userNameWrap}>
          <p>{userData.name}님 반갑습니다!</p>
        </div>
        <div className={userInfo}>
          <div className={imgWrap}>
            <div className={img}>
              {userData.image ? ( // userImage가 존재하는 경우 이미지를 표시
                <img src={userData.image} alt="프로필 사진" className={userImg} />
              ) : (
                // userImage가 없는 경우 등록된 이미지가 없다는 텍스트를 표시
                <div className={img}>
                  <p>등록된 사진이 없어요.</p>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload} // 이 부분이 파일을 선택할 때 실행될 함수를 지정합니다.
              style={{ display: "none" }}
              id="imageUpload"
            />
            <label htmlFor="imageUpload" className={imgBtn}>
              사진 등록/업로드
            </label>
          </div>
          <div className={profile}>
            <div className={profileContent}>
              <label htmlFor="email" className={label}>
                E-mail
              </label>
              <input
                type="text"
                id="email"
                disabled
                placeholder={userData.email}
                className={input}
              ></input>
            </div>
            <div className={profileContent}>
              <label htmlFor="name" className={label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                disabled={!isEditing}
                value={name}
                placeholder={userData.name}
                onChange={handleNameChange}
                className={input}
              ></input>
            </div>
            <div className={profileContent}>
              <label htmlFor="pw" className={label}>
                password
              </label>
              <input
                type="password"
                id="pw"
                onChange={handlePasswordChange}
                value={password}
                className={input}
                disabled={!isEditing}
              ></input>
            </div>
            <div className={btnWrap}>
              <button className={modifyBtn} onClick={handleClickModify}>
                {isEditing ? "수정 완료" : "회원정보 수정하기"}
              </button>
            </div>
          </div>
        </div>
        <div className={deleteBtnWrap}>
          <button onClick={handleClickDelete} className={deleteBtn}>
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
