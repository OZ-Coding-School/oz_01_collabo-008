import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import BudgetHistoryTableCell from "../../components/BudgetNExpensesTables/BudgetHistoryTableCell.tsx";
import ExpensesRegiTableCell from "../../components/BudgetNExpensesTables/ExpensesRegiTableCell.tsx";
import SideBar from "../../components/SideBar.tsx/SideBar.tsx";
import {
  box,
  budgetHistory,
  budgetInputBox,
  bugetHistoryTable,
  container,
  explainText,
  fixedExpenseBox,
  fixedExpensesRegiTable,
  headText,
  totalBudgetBox,
  wrapper,
} from "./BudgetNExpenses.css.ts";

const BudgetNExpenses = () => {
  interface budgetDataType {
    date: string;
    budget: number;
  }

  const [budget, setBudget] = useState<string>("");
  const [budgetData, setBudgetData] = useState<budgetDataType[]>([]);
  const [isAddRowClicked, setIsAddRowClicked] = useState(false);
  const [isExpRegiClicked, setIsExpRegiClicked] = useState(false);
  //#region 고정 지출 등록
  const handleClickAddRow = () => {
    // BudgetHistoryTableCell의 새로운 테이블 행 추가
    setIsAddRowClicked((prevState) => !prevState);
  };
  const handleClickRegi = () => {
    setIsExpRegiClicked((prevState) => !prevState);
    // BudgetHistoryTableCell에서 state에 저장되도록
    //배열로 출력되는지 확인해보기
  };
  //#endregion

  //#region 전체 예산 등록
  const handleClickBudgetRegistration = () => {
    const newBudgetData = {
      // 현재의 날짜를 문자열로 변환
      date: new Date().toLocaleDateString(),
      budget: budget,
    };
    setBudgetData([...budgetData, newBudgetData]);
    setBudget("");
  };
  //#endregion

  return (
    <Box className={box}>
      <SideBar />
      <Container className={container}>
        <Box className={wrapper}>
          <Box className={totalBudgetBox}>
            <Text className={headText} as='div'>
              예산 등록
            </Text>
            <Box>
              <Box>
                <Text as='p' className={explainText}>
                  고정 지출을 포함한 이번 달 전체 예산을 등록해보세요
                </Text>
                <Divider
                  sx={{
                    borderColor: "#FBEAEB",
                    borderWidth: "1px",
                  }}
                />
                <Box className={budgetInputBox}>
                  <TextField
                    InputProps={{
                      sx: {
                        height: "38px",
                        width: "200px",
                        borderRadius: "8px",
                        marginLeft: "10px;",
                        backgroundColor: "#ffffff",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#F0F0F0",
                        },
                        "&.Mui-focused": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#F0F0F0",
                            borderWidth: "1px",
                          },
                        },
                        "&:hover": {
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#F0F0F0",
                          },
                        },
                      },
                    }}
                    name='totalBudget'
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    autoFocus
                  ></TextField>
                  <TotalBugetBoxButtons
                    onClick={handleClickBudgetRegistration}
                    // disabled={!budget.trim()}
                  >
                    {event?.target.value ? "수정하기" : "등록하기"}
                  </TotalBugetBoxButtons>
                </Box>
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
          </Box>
          <Box className={fixedExpenseBox}>
            <Text className={headText} as='div'>
              고정 지출 등록
            </Text>
            <Box sx={{ display: "flex" }}>
              <Text as='p' className={explainText}>
                고정 지출을 포함한 이번 달 전체 예산을 등록해보세요
              </Text>
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "auto",
                  gap: "10px",
                  marginTop: "-0.6rem",
                }}
              >
                <ButtonForFixedExpRegi onClick={handleClickAddRow}>
                  행 추가하기
                </ButtonForFixedExpRegi>
                <ButtonForFixedExpRegi onClick={handleClickRegi}>
                  등록하기
                </ButtonForFixedExpRegi>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "#FBEAEB", borderWidth: "1px" }} />
            <Box className={fixedExpensesRegiTable}>
              <ExpensesRegiTableCell
                isAddRowClicked={isAddRowClicked}
                isExpRegiClicked={isExpRegiClicked}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BudgetNExpenses;

export const TotalBugetBoxButtons = ({ children, onClick }) => {
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
        fontSize: "11px",
        "&:hover": {
          backgroundColor: "#F03167",
        },
        "&.MuiButtonBase-root:hover": {
          boxShadow: "none",
        },
        boxShadow: "none",
      }}
      disableRipple
    >
      {children}
    </Button>
  );
};

export const ButtonForFixedExpRegi = ({ children, onClick }) => {
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
        width: "90px",
        height: "38px",
        fontSize: "11px",
        marginTop: "-15px",
        marginLeft: "auto",
        "&:hover": {
          backgroundColor: "#F03167",
        },
        "&.MuiButtonBase-root:hover": {
          boxShadow: "none",
        },
        boxShadow: "none",
      }}
      disableRipple
    >
      {children}
    </Button>
  );
};
