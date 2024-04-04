
import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import TotalBudgetAndFixedExpenses from "./Components/TotalBudgetAndFixedExpenses/TotalBudgetAndFixedExpenses";
import BudgetRegister from './Pages/BudgetRegister/BudgetRegister';
import Main from './Pages/MainPage/Main';
import { BUDGET_REGISTER_PAGE } from './constants/components-contants';

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
            path='/totalbudgetandfixedexpenses'
            element={<TotalBudgetAndFixedExpenses />}
          />
          <Route path={BUDGET_REGISTER_PAGE} element={<BudgetRegister />} />
        </Route>
      </Routes >
    </>
  );
}

export default App;
