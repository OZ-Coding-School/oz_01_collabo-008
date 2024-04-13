import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useState } from "react";
import instance from "../../api/axios.ts";
import budgetRegRequest from "../../api/budgetRegRequest.ts";
import BudgetHistoryTableCell from "../../components/BudgetNExpensesTables/BudgetHistoryTableCell.tsx";
import ExpensesRegiTableCell from "../../components/BudgetNExpensesTables/ExpensesRegiTableCell.tsx";
import SideBar from "../../components/SideBar.tsx/SideBar.tsx";
import {
  addBtn,
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

  const [budget, setBudget] = useState<string>("");
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
  const memberId = localStorage.getItem("memberId")
  const handleClickBudgetRegistration = async () => {
    try {
      await instance.post(budgetRegRequest.budget + `/${memberId}`, {
        value: budget
      })
      console.log('전체예산 등록성공')
    } catch (error) {
      console.error("전체 예산등록 에러")
    }
  };
  //#endregion


  return (
    <Box className={box}>
      <SideBar />
      <Container className={container} maxWidth="xl" >
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
                  <button className={addBtn}
                    onClick={handleClickBudgetRegistration}
                  // disabled={!budget.trim()}
                  >
                    등록하기
                  </button>
                </Box>
              </Box>
              <Box className={budgetHistory}>
                <Text as='p' className={explainText}>
                  예산 히스토리
                </Text>
                <Box className={bugetHistoryTable}>
                  <BudgetHistoryTableCell />
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
        height: "38px",
        fontSize: "14px",
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
