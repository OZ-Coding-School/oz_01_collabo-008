import { Outlet, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header/Header";
import BudgetNExpenses from "./pages/BudgetNExpenses/BudgetNExpenses";
import BudgetRegister from "./pages/BudgetRegister/BudgetRegister";
import Login from "./pages/Login/Login";
import MonthlyReport from "./pages/MonthlyReport/MonthlyReport";

import Main from "./pages/MainPage/Main";
import Mypage from "./pages/Mypage/Mypage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_PAGE,
  MONTHLY_REPORT,
  MY_PAGE,
} from "./constants/components-contants";
import Signup from "./pages/SignUp/Signup";

const queryClient = new QueryClient();
const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

interface UserType {
  name: string;
}

export const UserContext = createContext<UserType>({
  name: "",
});

export const useUserContext = () => {
  const context = useContext(UserContext);

  //컴포넌트가 컨텍스트 내부에 있는지 확인
  if (!context) {
    throw new Error("not included componet in userContext");
  }
  return context;
};

const MyPage = () => {
  const user = useUserContext();
  console.log(user.name);
};

const loggedRoutes = [
  <Route path="/" element={<Layout />}>
    <Route index element={<Main />} />
    <Route
      path={BUDGET_N_FIXED_EXPENSES_COMPONENT}
      element={<BudgetNExpenses />}
    />

    <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />
    <Route path={MONTHLY_REPORT} element={<MonthlyReport />} />

    <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />

    <Route path={MY_PAGE} element={<Mypage />} />
  </Route>,
];

const commonRoutes = [
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
  </>,
];

function App() {
  // const { data } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: () => {
  //     axios.post("/me", {});
  //   },
  // });

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={700}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider
          value={{
            name: "",
          }}
        >
          <Routes>
            {...loggedRoutes}
            {...commonRoutes}
          </Routes>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
