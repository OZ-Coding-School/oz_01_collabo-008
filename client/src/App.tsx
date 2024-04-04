// import viteLogo from '/vite.svg'
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

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
          <Route index />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
