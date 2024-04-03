import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import SideBar from "../SideBar.tsx/SideBar";
import {
  budgetHistory,
  budgetInputBox,
  bugetHistoryTable,
  container,
  explainText,
  fixedExpensesRegistrationTable,
  headText,
  totalBudgetBox,
} from "./TotalBudgetAndFixedExpenses.css";
import BudgetHistoryTableCell from "./muiStyleComponent/BudgetHistoryTableCell.tsx";
import FixedExpensesRegistrationTableCell from "./muiStyleComponent/FixedExpensesRegistrationTableCell.tsx";

const TotalBudgetAndFixedExpenses = () => {
  const [budget, setBudget] = useState<string>("");
  const [budgetData, setBudgetData] = useState([]);

  const handleClickBudgetRegistration = () => {
    const newBudgetData = {
      // 현재의 날자를 문자열로 변환
      date: new Date().toLocaleDateString(),
      budget: budget,
    };
    setBudgetData([...budgetData, newBudgetData]);
    setBudget("");
    console.log(budgetData);
  };

  return (
    <Box sx={{ display: "flex", marginRight: "30px" }}>
      <SideBar />
      <Container className={container}>
        <Box className={totalBudgetBox}>
          <Text className={headText} as='div'>
            예산 등록
          </Text>
          <Text as='p' className={explainText}>
            고정 지출을 포함한 이번 달 전체 예산을 등록해보세요
          </Text>
          <Divider sx={{ borderColor: "#FBEAEB", borderWidth: "1px" }} />
        </Box>
        <Box>
          <Box className={budgetInputBox}>
            <TextField
              InputProps={{
                sx: {
                  height: "38px",
                  width: "200px",
                  borderRadius: "8px",
                  marginLeft: "10px;",
                },
              }}
              name='totalBudget'
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              autoFocus
            ></TextField>
            <TotalBugetBoxButtons
              onClick={handleClickBudgetRegistration}
              disabled={!budget.trim()}
            >
              등록하기
            </TotalBugetBoxButtons>
            <TotalBugetBoxButtons>수정하기</TotalBugetBoxButtons>
          </Box>

          <Box className={budgetHistory}>
            <Text as='p' className={explainText}>
              예산 히스토리
            </Text>
            <Box className={bugetHistoryTable}>
              <BudgetHistoryTableCell budgetData={budgetData} />
            </Box>
          </Box>
        </Box>

        <Box>
          <Text className={headText} as='div'>
            고정 지출 등록
          </Text>
          <Text as='p' className={explainText}>
            고정 지출을 포함한 이번 달 전체 예산을 등록해보세요
          </Text>

          <Divider sx={{ borderColor: "#FBEAEB", borderWidth: "1px" }} />
          <Box className={fixedExpensesRegistrationTable}>
            <FixedExpensesRegistrationTableCell />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TotalBudgetAndFixedExpenses;

export const TotalBugetBoxButtons = ({ children, onClick, disabled }) => {
  const handleClick = () => {
    if (!budgetHistory.trim()) {
      return;
    }
    onClick();
  };
  return (
    <Button
      onClick={handleClick}
      variant='contained'
      sx={{
        backgroundColor: "#F03167",
        borderRadius: "8px",
        marginLeft: "8px",
        width: "90px",
        height: "38px",
        fontSize: "10px",
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
