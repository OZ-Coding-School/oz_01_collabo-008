import { createContext, useContext, useEffect, useState } from "react";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import BudgetNExpenses from "./pages/BudgetNExpenses/BudgetNExpenses";
import BudgetRegister from "./pages/BudgetRegister/BudgetRegister";
import Login from "./pages/Login/Login";
import MonthlyReport from "./pages/MonthlyReport/MonthlyReport";

import Main from "./pages/MainPage/Main";
import Mypage from "./pages/Mypage/Mypage";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cookies } from "react-cookie";
import instance from "./api/axios";
import requests from "./api/requests";
import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_PAGE,
  MONTHLY_REPORT,
  MY_PAGE,
} from "./constants/components-contants";
import LoginHandler from "./pages/LoginHandler/LoginHandler";
import Signup from "./pages/SignUp/Signup";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export interface UserType {

  email: string;
  name: string;
  id: number;
  image: string;

}

interface UserContextType {
  setUserData: any;
  userData: UserType;
}

export const UserContext = createContext<UserContextType>({
  setUserData: () => { },
  userData: {
    email: "",
    name: "",
    id: -1, // ID가 없는 경우를 위해 음수나 0을 사용할 수 있습니다. 실제 사용 시에는 유효한 ID값을 받아오게 됩니다.
    image: "",
  },
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  //컴포넌트가 컨텍스트 내부에 있는지 확인
  if (!context) {
    throw new Error("not included compoent in usercontext");
  }
  return context;
};



const loggedRoutes = [
  <Route path='/' element={<Layout />}>
    <Route index element={<Main />} />
    <Route
      path={BUDGET_N_FIXED_EXPENSES_COMPONENT}
      element={<BudgetNExpenses />}
    />

    <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />
    <Route path={MONTHLY_REPORT} element={<MonthlyReport />} />

    {/* <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} /> */}

    <Route path={MY_PAGE} element={<Mypage />} />
    <Route path={MONTHLY_REPORT} element={<MonthlyReport />} />
  </Route>,
];

const commonRoutes = [
  <>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/oauth2/redirect' element={<LoginHandler />} />
  </>,
];


interface GetMemberResponseType {
  status_code: number,
  message: string,
  member: {
    id: number,
    email: string,
    name: string,
    image: string,
    created_at: string,
    updated_at: string
  }
}

function App() {
  const [userData, setUserData] = useState<GetMemberResponseType["member"]>(
    {
      id: -1,
      email: null,
      name: null,
      image: null,
      created_at: null,
      updated_at: null,
    },
  )
  const queryClient = useQueryClient();
  const cookies = new Cookies();
  const access = cookies.get("accessToken");
  const {
    data: meData,
    isLoading: isMeLoading,
    error: meError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const response = await instance.get<GetMemberResponseType>(requests.userInfo);
        // console.log("전역 유저 정보", response.data);
        return response.data.member;
      } catch (error) {
        console.error("전역 유저정보 에러", error);
        throw error;
      }
    },
    enabled: !!access,
  });

  useEffect(() => {
    if (meData) {
      setUserData(meData)

    }
  }, [meData])


  if (isMeLoading) return <div>Loading...</div>;
  if (meError && !["/login", "/signup", "/oauth2/redirect"].includes(window.location.pathname))
    return <div>Error: {meError.message}</div>;



  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={700}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
      <UserContext.Provider
        value={{
          setUserData,
          userData: userData,
        }}
      >
        <Routes>
          {!isMeLoading && userData?.id !== -1 ? (
            <>
              {...loggedRoutes}
              <Route path='*' element={<Navigate to='/' replace />} />
            </>
          ) : (
            <>
              {...commonRoutes}
              <Route path='*' element={<Navigate to='/login' replace />} />
            </>
          )}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
