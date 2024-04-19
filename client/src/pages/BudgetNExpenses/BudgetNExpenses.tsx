import { Box, Button, Container, Divider, TextField } from "@mui/material";
import { Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../api/axios.ts";
import budgetRegRequest from "../../api/budgetRegRequest.ts";
import fixedRequest from "../../api/fixedRequest.ts";
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

interface ExpenseItem {
  price: string;
  category: string;
}

const BudgetNExpenses = () => {
  const queryClient = useQueryClient();
  const [budget, setBudget] = useState<string>("");
  const [isAddRowClicked, setIsAddRowClicked] = useState<
    { price: string; category: string }[]
  >([]);

  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);

  //#region 고정 지출 등록
  const handleClickAddRow = () => {
    setIsAddRowClicked((prevExpenses) => [
      ...prevExpenses,
      { price: "", category: "" }, // 새 지출 항목의 초기값 설정
    ]);
    console.log("고정지출 행추가", isAddRowClicked)

  };

  const handleExpenseChange = (index: number, field: string, value: string) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      const updatedExpense = { ...updatedExpenses[index], [field]: value };
      updatedExpenses[index] = updatedExpense;
      return updatedExpenses;
    });
  };

  const handleClickRegi = async () => {
    // setIsExpRegiClicked((prevState) => !prevState);
    // BudgetHistoryTableCell에서 state에 저장되도록
    // 배열로 출력되는지 확인해보기

    try {
      const response = await instance.post(fixedRequest.fixedReg, expenses);
      console.log("고정 지출 등록 성공", response);
      queryClient.invalidateQueries({ queryKey: ["fixedExpense"] });
    } catch (error) {
      if (error.response && error.response.status === 400) {

        toast.error("카테고리,지출금액을 입력해주세요")
      } else {
        console.log("고정지출 등록 에러", error);
        toast.error("고정 지출을 등록하는 중에 오류가 발생했습니다.")
      }
    }
  };
  //#endregion

  //#region 전체 예산 등록
  const handleClickBudgetRegistration = async () => {
    if (!budget.trim()) {
      toast.error("예산을 입력해주세요.");
      return;
    }
    try {
      await instance.post(budgetRegRequest.budgetList, {
        value: budget,
      });
      console.log("전체예산 등록성공");
      toast.success("예산이 등록되었습니다");
      queryClient.invalidateQueries({ queryKey: ["budgetList"] });
    } catch (error) {
      if (error.response && error.response.status === 400) {

        toast.error("예산 값을 입력해주세요")
      } else {
        console.log("예산등록 에러", error);
        toast.error("예산을 등록하는 중에 오류가 발생했습니다.")
      }
    }
  };
  //#endregion

  return (
    <Box className={box}>
      <SideBar />
      <Container className={container} maxWidth='xl'>
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
                    type='number'
                  ></TextField>
                  <button
                    className={addBtn}
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
                handleExpenseChange={handleExpenseChange}
                // setPrice={setPrice}
                // setCategory={setCategory}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BudgetNExpenses;

export const ButtonForFixedExpRegi = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  const handleClick = () => {
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
