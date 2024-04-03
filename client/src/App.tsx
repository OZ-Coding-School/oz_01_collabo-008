// import viteLogo from '/vite.svg'
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
