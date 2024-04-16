import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import instance from "../../api/axios.ts";
import categoriesRequest from "../../api/categoriesRequest.ts";
import Input from "../Input/Input.tsx";
import SelectBox from "../SelectBox/Select.tsx";
import { wrap } from "./ExpensesRegiTableCell.css.ts";

interface ItemType {
  id: number;
  content: number;
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    borderBottom: "2px solid #FFF4F5",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white", // 짝수 번째 행의 배경색
  },
  '&:nth-of-type(even)': {
    backgroundColor: "#FFF4F5", // 홀수 번째 행의 배경색
  },
  // 마지막 테두리 숨기기
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& td, & th': {
    borderBottom: `none`, // 경계선의 색상과 두께 조정
  },
}));

const createData = () => ({ category: "", expenseAmount: "" });



const ExpensesRegiTableCell = ({ isAddRowClicked, handleExpenseChange }) => {
  const [expenses, setExpenses] = useState([createData()]);


  //행 추가 관련
  useEffect(() => {
    if (isAddRowClicked) {
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        updatedExpenses.push(createData());
        return updatedExpenses;
      });
    }
  }, [isAddRowClicked]);





  // 카테고리 
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await instance.get(categoriesRequest.category);
        const data = response.data.categories
        console.log("카테고리 조회 성공", data)
        return data
      } catch (error) {
        console.error("카테고리 조회 에러", error)
      }
    }
  })

  const options = data?.map((item: ItemType) => ({
    value: item.id,
    label: item.content
  }));


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error:{error.message}</div>








  return (
    <Box className={wrap}>

      <TableContainer>
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
                  <SelectBox
                    defaultValue="카드"
                    options={options}
                    onChange={(value) => {
                      handleExpenseChange(index, 'category', value);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align='left'>
                  <Input
                    placeholder="지출금액"
                    onChange={(e) => {
                      const value = e.target.value;
                      handleExpenseChange(index, 'price', value);
                    }}
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
    </Box>
  );
};

export default ExpensesRegiTableCell;
