import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import BudgetNExpenses from "./Pages/BudgetNExpenses/BudgetNExpenses";
import BudgetRegister from "./Pages/BudgetRegister/BudgetRegister";
import MonthlyReport from "./Pages/MonthlyReport/MonthlyReport";
import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_COMPONENT,
  MONTHLY_REPORT,
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
          <Route index />
          <Route
            path={BUDGET_N_FIXED_EXPENSES_COMPONENT}
            element={<BudgetNExpenses />}
          />
          <Route
            path={BUDGET_REGISTER_COMPONENT}
            element={<BudgetRegister />}
          />
          <Route path={MONTHLY_REPORT} element={<MonthlyReport />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
