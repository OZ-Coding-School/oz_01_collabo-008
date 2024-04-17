import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
  userInfo,
  userNameWrap,
  wrap,
} from "./Mypage.css";

const Mypage = () => {
  const memberId = localStorage.getItem("memberId");
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const cookies = new Cookies();
  // const handleEdit = () => {
  //   setIsEditing(!isEditing);
  // };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append(
          "post",
          new Blob([JSON.stringify(selectedFile)], { type: "application/json" })
        );
        formData.append("image", file);

        const access = cookies.get("accessToken");

        const response = await instance.post(requests.imageUpload, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "ACCESS-TOKEN": access,
          },
        });

        if (response.data.status_code === 200) {
          toast.success("사진이 성공적으로 업로드되었습니다.");
          // TODO: 업로드된 사진 URL을 받아와서 상태 업데이트 등 추가 작업
        } else {
          toast.error("사진 업로드 실패");
        }
      } catch (error) {
        console.error("사진 업로드 에러", error);
        toast.error("사진 업로드 중 오류가 발생했습니다.");
      }
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(requests.userInfo);
        console.log(response.data);
        setUserData(response.data.member);
        setName(response.data.member.name); // 이름을 상태에 설정
        setPassword(response.data.member.password);
      } catch (error) {
        console.error("회원정보 조회 에러", error);
      }
    };

    fetchData();
  }, []);
  const handleClickDelete = async () => {
    try {
      await instance.delete(requests.userInfo);
      toast.success("회원 탈퇴 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원탈퇴 실패", error);
    }
  };
  const refresh = cookies.get("refreshToken");
  const handleClickLogout = async () => {
    try {
      await instance.post(requests.logout, { refresh });
      toast.success("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };
  const handleClickModify = async () => {
    try {
      if (isEditing) {
        try {
          await instance.put(requests.modify, {
            name,
            password,
          });
          toast.success("회원정보 수정 되었습니다.");
          setIsEditing(!isEditing);
          // setIsEditing(false); // 수정 완료 후 isEditing 상태를 false로 변경
        } catch (error) {
          console.error("회원정보 수정 실패", error);
        }
      } else {
        setIsEditing(true);
      }
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
              <p>등록된 사진이 없어요.</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="imageUpload"
            />
            <button onChange={handleFileChange} className={imgBtn}>
              사진 등록/업로드
            </button>
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
