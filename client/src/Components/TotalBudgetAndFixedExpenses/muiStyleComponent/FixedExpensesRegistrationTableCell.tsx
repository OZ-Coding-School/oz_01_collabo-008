// import { styled } from "@mui/material/styles";

// import { Button, MenuItem, Select, TextField } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useState } from "react";

// const FixedExpensesRegistrationTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "white",
//     color: "#3B3B3B",
//     height: 40,
//     padding: "0 20px",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 12,
//     height: 30,
//     padding: "0 20px",
//     color: "#3B3B3B",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#FFF4F5",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// export default function CustomizedTables() {
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const handleChangeCategory = (event, index) => {
//     const updatedRows = [...rows];
//     updatedRows[index].category = event.target.value;
//     setSelectedCategory(event.target.value);
//   };

//   function createData(category, expenseAmount: number) {
//     return { category, expenseAmount };
//   }

//   const rows = [createData(selectedCategory, 1)];

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label='customized table'>
//         <TableHead>
//           <TableRow>
//             <FixedExpensesRegistrationTableCell>
//               카테고리
//             </FixedExpensesRegistrationTableCell>
//             <FixedExpensesRegistrationTableCell
//               align='left'
//               sx={{ padding: "0px" }}
//             >
//               지출 금액
//             </FixedExpensesRegistrationTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row, index) => (
//             <StyledTableRow key={index}>
//               <FixedExpensesRegistrationTableCell
//                 component='th'
//                 scope='row'
//                 width='150px'
//               >
//                 <Select
//                   sx={{
//                     width: "100px",
//                     height: "30px",
//                     fontSize: "12px",
//                     color: "#D5D5D5",
//                     borderColor: "#F0F0F0",
//                   }}
//                   value={row.category}
//                   onChange={(event) => handleChangeCategory(event, index)}
//                 >
//                   <MenuItem value={"주거/생활"}>주거/생활</MenuItem>
//                   <MenuItem value={"식비"}>식비</MenuItem>
//                   <MenuItem value={"공과금"}>공과금</MenuItem>
//                 </Select>
//               </FixedExpensesRegistrationTableCell>
//               <FixedExpensesRegistrationTableCell align='left'>
//                 <div
//                   style={{ display: "flex", alignItems: "center", gap: "10px" }}
//                 >
//                   <TextField
//                     sx={{
//                       width: "130px",
//                       height: "30px",
//                       "& input": {
//                         padding: "8px 3px",
//                         fontSize: "12px",
//                         color: "#D5D5D5",
//                         borderColor: "#F0F0F0",
//                       },
//                     }}
//                     value={row.expenseAmount}
//                     onChange={(event) => {
//                       // 지출 금액 관련 변경 처리 구현할 곳!!!!!!!
//                     }}
//                   ></TextField>

//                   <Button sx={{ color: "#F03167", marginLeft: "500px" }}>
//                     수정
//                   </Button>
//                 </div>
//               </FixedExpensesRegistrationTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

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
import { useState } from "react";

const FixedExpensesRegistrationTableCell = () => {
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const createData = (category, expenseAmount) => ({ category, expenseAmount });
  const [rows, setRows] = useState([createData("", 0)]);
  const handleChange = (event, index, type) => {
    const updatedRows = [...rows];
    updatedRows[index][type] = event.target.value;
    setRows(updatedRows);
  };

  const [expenseAmount, setExpenseAmount] = useState(0);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700, overflowX: "auto" }}
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
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                <Select
                  value={row.category}
                  onChange={(event) => handleChange(event, index, "category")}
                  sx={{
                    width: "100px",
                    height: "30px",
                    fontSize: "12px",
                    color: "#D5D5D5",
                    borderColor: "#F0F0F0",
                    borderRadius: "8px",
                    ".MuiOutlinedInput-notchedOutline": {
                      // border: "none",
                    },
                    ".MuiSvgIcon-root": {
                      // Select 화살표 아이콘 크기 조정 가능
                      fontSize: "1.25rem",
                    },
                  }}
                >
                  <MenuItem value='주거/생활'>주거/생활</MenuItem>
                  <MenuItem value='식비'>식비</MenuItem>
                  <MenuItem value='공과금'>공과금</MenuItem>
                </Select>
              </StyledTableCell>
              <StyledTableCell
                align='left'
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField
                  InputProps={{
                    sx: {
                      width: "130px",
                      height: "30px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "#D5D5D5",
                      borderColor: "#F0F0F0",
                    },
                  }}
                  value={row.expenseAmount}
                  onChange={(event) => setExpenseAmount(event.target.value)}
                  autoFocus
                />
              </StyledTableCell>
              <StyledTableCell align='left'>
                <Button sx={{ color: "#F03167", marginLeft: "500px" }}>
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

export default FixedExpensesRegistrationTableCell;
