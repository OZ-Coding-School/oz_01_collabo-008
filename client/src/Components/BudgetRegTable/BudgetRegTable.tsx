import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Box } from "@radix-ui/themes";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Input from "../Input/Input";
import SelectBox from "../SelectBox/Select";
import { datepicker, wrap } from "./BudgetRegTable.css";

const categories = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" }
];

const tools = [
  { value: "카드", label: "카드" },
  { value: "현금", label: "현금" }
]



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





const BudgetRegTable = ({ rows }) => {
  const [startDate, setStartDate] = useState(new Date());
  // const handleSelectChange = (value: string) => {
  //   console.log(value);
  // };
  return (

    <>

      <Box className={wrap} style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>사용날짜</StyledTableCell>
                <StyledTableCell align="left">카테고리</StyledTableCell>
                <StyledTableCell align="left">카드/현금</StyledTableCell>
                <StyledTableCell align="left">사용처</StyledTableCell>
                <StyledTableCell align="left">사용금액</StyledTableCell>
                <StyledTableCell align="left">사용내역</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {rows.map((row, index) => (

                <StyledTableRow key={index} >
                  <StyledTableCell component="th" scope="row">
                    <DatePicker
                      className={datepicker}
                      showIcon
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="left">


                    <SelectBox defaultValue="apple" options={categories} onChange={(value) => console.log(value)} />

                  </StyledTableCell>
                  <StyledTableCell align="left">

                    <SelectBox defaultValue="카드" options={tools} onChange={(value) => console.log(value)} />

                  </StyledTableCell>
                  <StyledTableCell align="left"><Input placeholder="사용처" /></StyledTableCell>
                  <StyledTableCell align="left"><Input placeholder="사용금액" /></StyledTableCell>
                  <StyledTableCell align="left"><Input placeholder="사용내역" /></StyledTableCell>

                </StyledTableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>

  )
}

export default BudgetRegTable