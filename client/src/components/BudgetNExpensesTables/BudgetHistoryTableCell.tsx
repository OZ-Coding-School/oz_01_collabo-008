import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { Box } from "@radix-ui/themes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import instance from "../../api/axios";
import budgetRegRequest from "../../api/budgetRegRequest";
import { modifyBtn } from "../ExpendituresList/ExpenditureList.css";
import Input from "../Input/Input";
import { wrap } from "./BudgetHistoryTableCell.css";

interface Budget {
  id: number;
  created_at: string;
  value: number;
}

const BudgetHistoryTableCell = () => {
  const queryClient = useQueryClient();
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth() + 1);

  const [modifyId, setModifyId] = useState<number | null>(null);
  const [modifyValue, setModifyValue] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["budgetList"],
    queryFn: async () => {
      try {
        const response = await instance.get(
          budgetRegRequest.budgetList + `?year=${year}&month=${month}`
        );
        // if (!response.data || response.data.length === 0) {
        //   throw new Error(
        //     "There is no BugetData. Please register your budget first!"
        //   );
        // }
        // 최신 데이터 맨 위로 정렬
        const data = response.data.budget_list.sort(
          (
            a: { created_at: moment.MomentInput },
            b: { created_at: moment.MomentInput }
          ) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf()
        );

        return data;
      } catch (error) {
        throw new Error("전체 예산 조회 에러");
      }
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;
  if (!data || data.length === 0)
    return <div>예산 정보가 없습니다. 예산을 먼저 등록해주세요.</div>;

  // 예산 수정
  const handleClickModify = (id: number, value: number) => {
    setModifyId(id);
    setModifyValue(value.toString());
  };

  //예산 삭제
  const handleClickDelete = async (budgetId: number) => {
    try {
      await instance.delete(budgetRegRequest.modifyBudget + `/${budgetId}`);
      toast.success("예산 내역이 삭제되었습니다.");
      setModifyId(null);
      refetch();
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["budgetList"] });
    } catch (error) {
      console.error("예산 내역 삭제 에러", error);
      toast.error("예산 내역 삭제에 실패했습니다.");
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyValue(e.target.value);
  };

  const handleModify = async (budgetId: number) => {
    try {
      await instance.put(budgetRegRequest.modifyBudget + `/${budgetId}`, {
        value: modifyValue,
      });
      setModifyId(null);
      toast.success("예산이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["budget"] });
      queryClient.invalidateQueries({ queryKey: ["budgetList"] });
    } catch (error) {
      console.error("예산수정에러", error);
    }
  };

  return (
    <>
      <Box className={wrap} style={{ maxHeight: "600px", overflowY: "auto" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='left'>날짜</StyledTableCell>
                <StyledTableCell align='left'>등록 예산</StyledTableCell>
                <StyledTableCell align='left'></StyledTableCell>
                <StyledTableCell align='left'></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item: Budget) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align='left'>
                    {moment(item.created_at).format("YYYY.MM.DD")}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {modifyId === item.id ? (
                      <Input
                        type='number'
                        value={modifyValue}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item.value.toLocaleString()
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    {modifyId === item.id ? (
                      <button
                        className={modifyBtn}
                        onClick={() => handleModify(item.id)}
                      >
                        등록
                      </button>
                    ) : (
                      <button
                        className={modifyBtn}
                        onClick={() => handleClickModify(item.id, item.value)}
                      >
                        수정
                      </button>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align='left'>
                    <button
                      className={modifyBtn}
                      onClick={() => handleClickDelete(item.id)}
                    >
                      삭제
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    borderBottom: "2px solid #FFF4F5",
    padding: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "16px",
  },
  "&:nth-child(1)": {
    width: "30%",
  },
  "&:nth-child(2)": {
    width: "40%",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white", // 짝수 번째 행의 배경색
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#FFF4F5", // 홀수 번째 행의 배경색
  },
  // 마지막 테두리 숨기기
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td, & th": {
    borderBottom: `none`, // 경계선의 색상과 두께 조정
  },
}));
export default BudgetHistoryTableCell;
