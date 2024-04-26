import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import instance from "../../api/axios.ts";
import categoriesRequest from "../../api/categoriesRequest.ts";
import fixedRequest from "../../api/fixedRequest.ts";
import { modifyBtn } from "../ExpendituresList/ExpenditureList.css.ts";
import Input from "../Input/Input.tsx";
import SelectBox from "../SelectBox/Select.tsx";
import { wrap } from "./ExpensesRegiTableCell.css.ts";

interface ItemType {
  id: number;
  content: number;
}

interface FixedExpense {
  fixed_expenses_list: Array<{
    id: number;
    category: number;
    price: number;
  }>;

  id: number;
  fixed_expenses_per_list: Array<{
    category: number;
    total_price: number;
  }>;
}

interface Props {
  isAddRowClicked: boolean;
  handleExpenseChange: (index: number, field: string, value: string) => void;
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
  // handleDeleteRow: (index: number) => void;
}

interface ExpenseItem extends Props {
  price: string;
  category: string;
}

const categoryMap: { [key: number]: string } = {
  0: "카테고리 선택",
  1: "식비",
  2: "주거/통신",
  3: "생활용품",
  4: "의복/미용",
  5: "건강/문화",
  6: "교육/육아",
  7: "교통/차량",
  8: "경조사/회비",
  9: "세금/이자",
  10: "기타",
};

const ExpensesRegiTableCell = ({
  isAddRowClicked,
  handleExpenseChange,
  setExpenses,
  expenses,
}: Props) => {
  // const [expenses, setExpenses] = useState<
  //   { index: number; category: string; price: string }[]
  // >([]);

  const queryClient = useQueryClient();

  const [modifyId, setModifyId] = useState<number | null>(null);
  const [modifyValue, setModifyValue] = useState("");
  const [modifyCategory, setModifyCategory] = useState("");
  const [fixedExpensesState, setFixedExpensesState] = useState<FixedExpense[]>(
    []
  );

  //행 추가 관련
  useEffect(() => {
    if (isAddRowClicked) {
      setExpenses((prevExpenses) => {
        const newIndex = prevExpenses.length;
        const updatedExpenses = [
          ...prevExpenses,
          { index: newIndex, category: "", price: "" },
        ];
        return updatedExpenses;
      });
    }
  }, [isAddRowClicked]);

  const handlePriceChange = (index: number, value: string) => {
    const isValidPrice = /^[1-9]\d*(\.\d+)?$/.test(value);
    if (!isValidPrice || Number(value) === 0) {
      toast.warning("지출금액을 유효한 숫자로 입력해주세요.");
      return;
    }
    handleExpenseChange(index, "price", value);
  };

  // 카테고리
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await instance.get(categoriesRequest.category);
        const data = response.data.categories;
        // console.log("카테고리 조회 성공", data);
        return data;
      } catch (error) {
        throw new Error("카테고리 조회 에러");
      }
    },
  });

  // const options = data?.map((item: ItemType) => ({
  //   value: item.id,
  //   label: item.content,
  // }));
  const options = [
    {
      value: null,
      label: "카테고리 선택",
    },
    ...(data?.map((item: ItemType) => ({
      value: item.id,
      label: item.content,
    })) || []),
  ];
  //고정지출
  const {
    data: fixedExpenseData,
    isLoading: isFixedExpense,
    error: fixedExpenseError,
  } = useQuery<FixedExpense, Error>({
    queryKey: ["fixedExpense"],
    queryFn: async () => {
      try {
        const response = await instance.get(fixedRequest.fixedReg);
        const data = response.data;

        // console.log("고정지출", data);
        return data;
      } catch (error) {
        throw new Error("고정지출 에러");
      }
    },
  });
  //  카테고리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error:{error.message}</div>;
  // 고정지출
  if (isFixedExpense) return <div>Loading...</div>;
  if (fixedExpenseError) return <div>Error:{fixedExpenseError.message}</div>;

  const fixedExpenses = fixedExpenseData.fixed_expenses_list;

  // 고정수정
  // 수정 버튼 클릭 시
  const handleClickModify = (id: number, category: number, price: number) => {
    setModifyId(id); // 수정할 데이터의 id 설정
    setModifyCategory(category.toString()); // 수정할 데이터의 카테고리 설정
    setModifyValue(price.toString()); // 수정할 데이터의 값 설정
  };
  // 인풋 창 값 변경 시
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyValue(e.target.value);
  };

  const handleModify = async (fixedExpenseId: number) => {
    try {
      await instance.put(fixedRequest.fixedModify + `/${fixedExpenseId}`, {
        category: modifyCategory,
        price: modifyValue,
      });
      setModifyId(null);
      toast.success("고정지출이 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["fixedExpense"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenseFixedExpense"] });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("값을 입력해주세요");
      } else {
        // console.log("예산등록 에러", error);
        toast.error("고정지출을 등록하는 중에 오류가 발생했습니다.");
      }
    }
  };

  //고정 삭제
  const deleteFixedExpenses = async (fixedExpenseId: number) => {
    try {
      await instance.delete(fixedRequest.fixedModify + `/${fixedExpenseId}`);
      // 삭제된 항목을 UI에서 제거
      setFixedExpensesState((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== fixedExpenseId)
      );
      toast.success("고정지출이 삭제되었습니다.");

      queryClient.invalidateQueries({ queryKey: ["fixedExpense"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenseFixedExpense"] });
    } catch (error) {
      console.error("고정지출 삭제 에러", error);
      toast.error("고정지출 삭제에 실패했습니다.");
    }
  };

  //행추가 삭제
  const handleDeleteRow = (indexToRemove) => {
    setExpenses((prevExpenses) => {
      // indexToRemove를 제외한 새로운 배열 생성
      return prevExpenses.filter((_, index) => index !== indexToRemove);
    });
  };

  return (
    <Box className={wrap}>
      <TableContainer>
        <Table
          sx={{ minWidth: 700, overflowX: "auto" }}
          aria-label='customized table'
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>카테고리</StyledTableCell>
              <StyledTableCell align='left'>지출 금액</StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
              <StyledTableCell align='left'></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fixedExpenses.map((fixedExpense, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {modifyId === fixedExpense.id ? (
                    <SelectBox
                      defaultValue={fixedExpense.category.toString()}
                      options={options}
                      onChange={(value) => setModifyCategory(value)}
                    />
                  ) : (
                    categoryMap[fixedExpense.category] || "기타"
                  )}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {modifyId === fixedExpense.id ? (
                    <Input
                      type='number'
                      value={modifyValue}
                      onChange={handleEditChange}
                      min={0}
                    />
                  ) : (
                    fixedExpense.price.toLocaleString()
                  )}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  {modifyId === fixedExpense.id ? (
                    <button
                      className={modifyBtn}
                      onClick={() => handleModify(fixedExpense.id)}
                    >
                      등록
                    </button>
                  ) : (
                    <button
                      className={modifyBtn}
                      onClick={() =>
                        handleClickModify(
                          fixedExpense.id,
                          fixedExpense.category,
                          fixedExpense.price
                        )
                      }
                    >
                      수정
                    </button>
                  )}
                </StyledTableCell>
                <StyledTableCell align='left'>
                  <button
                    className={modifyBtn}
                    onClick={() => deleteFixedExpenses(fixedExpense.id)}
                  >
                    삭제
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {expenses.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <SelectBox
                    defaultValue={row.category.toString()}
                    options={options}
                    onChange={(value) => {
                      handleExpenseChange(index, "category", value);
                    }}
                  />
                </StyledTableCell>

                <StyledTableCell align='left'>
                  <Input
                    placeholder='지출금액'
                    type='number'
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    min={0}
                    // onChange={(e) => {
                    //   const value = e.target.value;
                    //   handleExpenseChange(index, "price", value);
                    // }}
                  />
                </StyledTableCell>
                <StyledTableCell align='left'>
                  <button
                    className={modifyBtn}
                    onClick={() => handleDeleteRow(index)} // 해당 행의 인덱스 전달
                  >
                    행 삭제
                  </button>
                </StyledTableCell>
                <StyledTableCell align='left'></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
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

export default ExpensesRegiTableCell;
