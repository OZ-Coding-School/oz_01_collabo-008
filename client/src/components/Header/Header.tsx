import { To, useNavigate } from "react-router-dom";
import {
  header,
  listItem,
  logo,
  nav,
  profileImg,
  selectedListItem,
  user,
} from "./Header.css";
import {
  BUDGET_N_FIXED_EXPENSES_COMPONENT,
  BUDGET_REGISTER_PAGE,
  MONTHLY_REPORT,
  MY_PAGE,
} from "../../constants/components-contants";
import { useState } from "react";
const Header = () => {
  const navigation = useNavigate();
  const [currentPath, setCurrentPath] = useState("/");

  const navItems = [
    { name: "지출등록", path: BUDGET_REGISTER_PAGE },
    { name: "전체예산/고정지출", path: BUDGET_N_FIXED_EXPENSES_COMPONENT },
    { name: "보고서", path: MONTHLY_REPORT },
  ];

  const handleClick = (path: string) => {
    setCurrentPath(path);
    navigation(path);
  };
  return (
    <header className={header}>
      <div className={logo} onClick={() => handleClick("/")}>
        RR
      </div>
      <ul className={nav}>
        {navItems.map((item, index) => (
          <li
            key={index}
            className={currentPath === item.path ? selectedListItem : listItem}
            onClick={() => handleClick(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      <div className={user} onClick={() => handleClick(MY_PAGE)}>
        <img src="/images/jandi.png" alt="profileImg" className={profileImg} />
      </div>
    </header>
  );
};

export default Header;
