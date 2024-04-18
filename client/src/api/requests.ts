const requests = {
  signUp: "/members/register", // 회원가입
  login: "/members/login", //로그인
  logout: "/members/logout", // 로그아웃
  refresh: "/members/login/refresh", // 리프레쉬
  userInfo: "/members/detail", // 회원조회
  modify: "/members/detail", //회원정보 수정
  imageUpload: "/members/image-upload", //이미지 업로드
};

export default requests;
