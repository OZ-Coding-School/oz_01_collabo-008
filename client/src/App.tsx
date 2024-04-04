
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import BudgetNExpenses from "./Pages/BudgetNExpenses/BudgetNExpenses";
import BudgetRegister from "./Pages/BudgetRegister/BudgetRegister";
import Main from "./Pages/MainPage/Main";
import Mypage from "./Pages/Mypage/Mypage";
import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_PAGE,
  MY_PAGE,
} from "./constants/components-contants";


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
        <Route path='/' element={<Layout />}>
          <Route index element={<Main />} />
          <Route
            path={BUDGET_N_FIXED_EXPENSES_COMPONENT}
            element={<BudgetNExpenses />}
          />

          <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />
          <Route path={MY_PAGE} element={<Mypage />} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
