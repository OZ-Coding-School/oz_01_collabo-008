import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import BudgetNExpenses from "./pages/BudgetNExpenses/BudgetNExpenses";
import BudgetRegister from "./pages/BudgetRegister/BudgetRegister";
import Login from "./pages/Login/Login";
import MonthlyReport from "./pages/MonthlyReport/MonthlyReport";


import Main from "./pages/MainPage/Main";
import Mypage from "./pages/Mypage/Mypage";

import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_PAGE,
  MONTHLY_REPORT,
  MY_PAGE
} from "./constants/components-contants";
import Signup from "./pages/SignUp/Signup";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route
            path={BUDGET_N_FIXED_EXPENSES_COMPONENT}
            element={<BudgetNExpenses />}
          />

          <Route
            path={BUDGET_REGISTER_PAGE}
            element={<BudgetRegister />}
          />
          <Route path={MONTHLY_REPORT} element={<MonthlyReport />} />


          <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />

          <Route path={MY_PAGE} element={<Mypage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
