import { btnWrap, img, imgBtn, imgWrap, input, label, mainContainer, modifyBtn, profile, profileContent, titleWrap, userInfo, userNameWrap, wrap } from "./Mypage.css"

const Mypage = () => {
  return (
    <div className={wrap}>
      <div className={mainContainer}>
        <div className={titleWrap}>
          <p>내 정보</p>
        </div>

        <div className={userNameWrap}>
          <p>경웡님 반갑습니다!</p>
        </div>
        <div className={userInfo}>
          <div className={imgWrap}>
            <div className={img}>
              <p>등록된 사진이 없어요.</p>
            </div>
            <button className={imgBtn}>사진 등록</button>
          </div>
          <div className={profile}>
            <div className={profileContent}>
              <label htmlFor="email" className={label}>E-mail</label>
              <input type="text" id="email" disabled placeholder="sexydynamite@gmail.com" className={input}></input>
            </div>
            <div className={profileContent}>
              <label htmlFor="name" className={label}>Name</label>
              <input type="text" id="name" disabled value="경웡" className={input}></input>
            </div>
            <div className={profileContent}>
              <label htmlFor="pw" className={label}>password</label>
              <input type="password" id="pw" value="비밀이다" className={input} disabled></input>
            </div>
            <div className={btnWrap}>
              <button className={modifyBtn}>
                회원정보 수정하기
              </button>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}

export default Mypage