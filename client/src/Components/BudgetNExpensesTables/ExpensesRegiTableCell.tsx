import {
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { categoryStyle } from "./ExpensesRegiTableCell.css.ts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "#3B3B3B",
    height: 40,
    padding: "0 20px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    height: 40,
    padding: "0 20px",
    color: "#3B3B3B",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#FFF4F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const createData = () => ({ category: "", expenseAmount: "" });

const ExpensesRegiTableCell = ({ isAddRowClicked, isExpRegiClicked }) => {
  const [expenses, setExpenses] = useState([createData()]);
  const textFieldRefs = useRef([]);

  //행 추가 관련
  useEffect(() => {
    setExpenses((prevExpenses) => [...prevExpenses, createData()]);
  }, [isAddRowClicked]);

  // 지출 데이터 저장 관련
  useEffect(() => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = [...prevExpenses];
      updatedExpenses[prevExpenses.length - 1] = createData(); // 마지막 행 데이터 업데이트
      console.log("등록된 지출 데이터", updatedExpenses);
      return updatedExpenses;
    });
  }, [isExpRegiClicked]);

  const handleSelectChange = (event, index) => {
    handleChangeCategory(event, index);
    //마지막 요소가 아니라면
    if (index < expenses.length - 1) {
      //선택한 Select 요소가 변경되면 해당 인덱스의 TextField로 포커스 이동
      //setTimeout()사용해서 비동기적 처리(렌더링 완료된 후에 TextField로 포커스 이동)
      setTimeout(() => textFieldRefs.current[index].focus(), 0);
    }
  };
  const handleChangeExpenseAmount = (event, index) => {
    const newExpenses = [...expenses];
    newExpenses[index].expenseAmount = event.target.value;
    setExpenses(newExpenses);
  };
  const handleChangeCategory = (event, index) => {
    const newExpenses = [...expenses];
    newExpenses[index].category = event.target.value;
    setExpenses(newExpenses);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "335px",
        boxShadow: "0 2px 4px #FFDAE1",
        scrollbarWidth: "thin",
      }}
    >
      <Table
        sx={{ minWidth: "100%", overflowX: "auto" }}
        aria-label='customized table'
      >
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ minWidth: "150px" }}>
              카테고리
            </StyledTableCell>
            <StyledTableCell align='left'>지출 금액</StyledTableCell>
            <StyledTableCell
              sx={{ width: "100px" }}
              align='right'
            ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                <Select
                  className={categoryStyle}
                  value={row.category || "주거/생활"}
                  onChange={(event) => handleSelectChange(event, index)}
                  sx={{
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
                    ".MuiSvgIcon-root": {
                      fontSize: "1.25rem",
                    },
                    color: "#F0F0F0",
                    fontSize: "12px",
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <MenuItem value='주거/생활'>주거/생활</MenuItem>
                  <MenuItem value='식비'>식비</MenuItem>
                  <MenuItem value='공과금'>공과금</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell align='left'>
                <TextField
                  placeholder='지출금액'
                  InputProps={{
                    sx: {
                      width: "130px",
                      height: "30px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#D5D5D5",
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
                  value={row.expenseAmount}
                  onChange={(event) => handleChangeExpenseAmount(event, index)}
                  inputRef={(el) => (textFieldRefs.current[index] = el)}
                  autoFocus={index === 0} // 첫 번째 TextField에만 autoFocus 설정
                />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Button
                  sx={{
                    color: "#F03167",
                    marginLeft: "500px",
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:active": {
                      backgroundColor: "transparent",
                    },
                  }}
                  disableRipple
                >
                  수정
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpensesRegiTableCell;
