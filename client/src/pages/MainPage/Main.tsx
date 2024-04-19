import { useState } from "react";
import ExpenditureList from "../../components/ExpendituresList/ExpenditureList";
import CalendarList from "../../components/Scheduler/Calendar";
import SideBar from "../../components/SideBar.tsx/SideBar";
import { mainContainer, wrap } from "./Main.css";

import { FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useUserContext } from "../../App";
const Main = () => {
  const { userData } = useUserContext()

  const [showExpenditureList, setShowExpenditureList] = useState(false);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName='.Mui-focusVisible'
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#FEACC4" : "#FF779F",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#FF779F",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <div className={wrap}>
      <SideBar />
      <div className={mainContainer}>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} />}
          label='리스트로 보기'
          checked={showExpenditureList}
          onChange={() => setShowExpenditureList(!showExpenditureList)}
        />
        {showExpenditureList ? <ExpenditureList /> : <CalendarList />}
      </div>
    </div>
  );
};

export default Main;
