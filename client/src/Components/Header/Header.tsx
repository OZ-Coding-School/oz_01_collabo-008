import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Avatar, Badge } from '@mui/material';
import { belliIcon, header, listItem, logo, nav, user } from "./Header.css";
const Header = () => {

  return (
    <header className={header}>
      <div className={logo}>
        RR
      </div>
      <ul className={nav}>
        <li className={listItem}>지출리스트</li>
        <li className={listItem}>전체예산/고정지출</li>
        <li className={listItem}>보고서</li>
      </ul>

      <div className={user}>
        <Avatar sx={{ bgcolor: "#FEACC3" }}>N</Avatar>
        <Badge sx={{
          ".MuiBadge-dot": {
            backgroundColor: "#E64A2C", // 뱃지 색상 변경
          }
        }} variant="dot" overlap="circular">
          <NotificationsRoundedIcon sx={{ fontSize: 40, color: '#D5D5D5' }} className={belliIcon} />
        </Badge>
      </div>
    </header>
  )
}

export default Header