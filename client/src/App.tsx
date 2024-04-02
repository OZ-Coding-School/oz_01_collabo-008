// import viteLogo from '/vite.svg'
import { Outlet, Route, Routes } from 'react-router-dom'
import BaseContainer from './Components/BaseContainer/BaseContainer'
import Header from './Components/Header/Header'



const Layout = () => {
  return (
    <>
      <Header />
      {/* <SideBar /> */}
      <BaseContainer />
      <Outlet />
    </>
  )
}

function App() {




  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index />

        </Route>

      </Routes>
    </>
  )
}

export default App
