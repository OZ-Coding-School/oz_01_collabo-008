
import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import BudgetRegister from './Pages/BudgetRegister/BudgetRegister'
import { BUDGET_REGISTER_COMPONENT } from './constants/components-contants'
import TotalBudgetAndFixedExpenses from "./Components/TotalBudgetAndFixedExpenses/TotalBudgetAndFixedExpenses";


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
            path='/totalbudgetandfixedexpenses'
            element={<TotalBudgetAndFixedExpenses />}
          />
          <Route path={BUDGET_REGISTER_COMPONENT} element={<BudgetRegister />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
