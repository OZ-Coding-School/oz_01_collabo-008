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
  date: Date;
}

const BudgetRegister = () => {
  const [rows, setRows] = useState<Row[]>([
    {
      category: "",
      payment: "",
      location: "",
      price: 0,
      content: "",
      date: new Date(),
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const navigation = useNavigate();
  // 새 행 추가 함수
  const addRow = () => {
    const newRow: Row = {
      category: "",
      payment: "",
      location: "",
      price: 0,
      content: "",
      date: new Date() //startDate.toLocaleDateString("ko-KR").replace(/\. /g, "-").replace(".", ""), // 현재 선택된 날짜를 초기값으로 설정합니다.
    };
    setRows([...rows, newRow]); // 기존 행에 새 행 추가
  };
  // BudgetRegTable 컴포넌트에서 호출할 함수
  const handleTableRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    if (field === 'date') {
      // 날짜 필드가 변경된 경우, Date 객체로 변환하여 저장
      updatedRows[index][field] = new Date(value);
    } else {
      updatedRows[index][field] = value;
    }
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
      category: selectedCategory,
      payment: selectedPayment,
      location: row.location,
      price: row.price,
      content: row.content,
      date: row.date
        .toLocaleDateString("ko-KR")
        .replace(/\. /g, "-")
        .replace(".", ""),
    }));
    try {
      await instance.post(
        expenseRequest.expense,
        expensesToSend
      );
      // console.log("지출 등록 성공", response);
      // console.log("전송 데이터:", rows);
      toast.success("지출이 등록되었습니다.");
      navigation("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {

        toast.error("값을 입력해주세요")
      } else {
        console.log("예산등록 에러", error);
        toast.error("예산을 등록하는 중에 오류가 발생했습니다.")

      }
    }
  };

  return (
    <div className={wrap}>
      <Box className={container}>
        <Card size='3'>
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
