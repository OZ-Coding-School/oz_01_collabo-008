import { Box, Card } from "@radix-ui/themes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../api/axios";
import expenseRequest from "../../api/expenseRequest";
import BudgetRegTable from "../../components/BudgetRegTable/BudgetRegTable";
import {
  addBtn,
  btnWrap,
  container,
  description,
  title,
  titleWrap,
  wrap,
} from "./BudgetRegister.css";

interface Row {
  category: string;
  payment: string;
  location: string;
  price: number;
  content: string;
  date: string;
}

const BudgetRegister = () => {
  const [rows, setRows] = useState<Row[]>([
    {
      category: "",
      payment: "",
      location: "",
      price: 0,
      content: "",
      date: "",
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const memberId = localStorage.getItem("memberId");
  const navigation = useNavigate();
  // 새 행 추가 함수
  const addRow = () => {
    const newRow = { item: "", amount: 0 }; // 새 행 기본 구조
    setRows([...rows, newRow]); // 기존 행에 새 행 추가
  };

  // BudgetRegTable 컴포넌트에서 호출할 함수
  const handleTableRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
  };

  const handleClickRegi = async () => {
    const expensesToSend = rows.map((row) => ({
      category: selectedCategory, // 카테고리
      payment: selectedPayment, // 카드/현금
      location: row.location, // 사용처
      price: row.price, // 사용금액
      content: row.content, // 사용내역
      date: startDate
        .toLocaleDateString("ko-KR")
        .replace(/\. /g, "-")
        .replace(".", ""), // 사용날짜
    }));
    try {
      const response = await instance.post(
        expenseRequest.expense,
        expensesToSend
      );
      console.log("지출 등록 성공", response);
      toast.success("지출이 등록되었습니다.");
      navigation("/");
    } catch (error) {
      console.log("지출 등록 에러", error);
    }
  };

  return (
    <div className={wrap}>
      <Box className={container}>
        <Card size="3">
          <div className={titleWrap}>
            <p className={title}>가계부 등록</p>
            <p className={description}>오늘 지출한 금액을 등록해보세요</p>
          </div>
          <div className={btnWrap}>
            <button className={addBtn} onClick={addRow}>
              {" "}
              행 추가하기
            </button>
          </div>

          <BudgetRegTable
            rows={rows}
            onTableRowChange={handleTableRowChange}
            handlePaymentChange={handlePaymentChange}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
            selectedPayment={selectedPayment}
            setStartDate={setStartDate}
            startDate={startDate}
          />
          <div className={btnWrap}>
            <button className={addBtn} onClick={handleClickRegi}>
              {" "}
              등록하기
            </button>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default BudgetRegister;
