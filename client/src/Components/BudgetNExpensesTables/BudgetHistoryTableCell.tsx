import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

const BudgetHistoryTableCell = ({ budgetData }) => {
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
      scrollbarColor: "#6b6b6b #2b2b2b",
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

  const createData = (date, budget) => ({ date, budget });

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: 150,
        boxShadow: "0 2px 4px #FFDAE1",
        scrollbarWidth: "thin",
      }}
    >
      <Table sx={{ minWidth: 700 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ width: "150px" }}>날짜</StyledTableCell>
            <StyledTableCell align='left'>예산</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {budgetData.map((item, index) => {
            const { date, budget } = item;
            return (
              <StyledTableRow key={index}>
                <StyledTableCell component='th' scope='row' width='150px'>
                  {date}
                </StyledTableCell>
                <StyledTableCell align='left'>{budget}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BudgetHistoryTableCell;
