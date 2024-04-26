import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../api/axios";
import categoriesRequest from "../../api/categoriesRequest";
import expenseRequest from "../../api/expenseRequest";
import { BUDGET_REGISTER_PAGE } from "../../constants/components-contants";
import { expenseBtn, expenseBtnWrap } from "../../pages/MainPage/Main.css";
import { datepicker } from "../BudgetRegTable/BudgetRegTable.css";
import Input from "../Input/Input";
import SelectBox from "../SelectBox/Select";
import {
  addExpenseBtn,
  evenRow,
  h1,
  head,
  modifyBtn,
  noneList,
  oddRow,
  table,
  td,
  title,
  wrap,
} from "./ExpenditureList.css";

interface ItemType {
  id: number;
  content: number;
}

interface Payment extends ItemType {
  type: string;
}

interface ExpenseItemType {
  id: number;
  date: Date;
  category: string;
  payment: string;
  location: string;
  price: string;
  content: string;
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

const paymentMap: { [key: number]: string } = {
  0: "결제수단 선택",
  1: "현금",
  2: "카드",
  3: "계좌이체",
};
const ExpenditureList = () => {
  const queryClient = useQueryClient();
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth() + 1);
  const [modifyId, setModifyId] = useState(null);
  const [modifiedDate, setModifiedDate] = useState<Date | null>(new Date());
  const [modifiedCategory, setModifiedCategory] = useState("");
  const [modifiedPayment, setModifiedPayment] = useState("");
  const [modifiedLocation, setModifiedLocation] = useState("");
  const [modifiedPrice, setModifiedPrice] = useState("");
  const [modifiedContent, setModifiedContent] = useState("");
  const navigation = useNavigate();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const {
    data: expenseListData,
    isLoading: isExpenseListLoading,
    error: expenseListError,
  } = useQuery({
    queryKey: ["expensesList"],
    queryFn: async () => {
      try {
        const response = await instance.get(
          expenseRequest.expense + `?year=${year}&month=${month}`
        );
        const expenseListData = response.data.expenses_list;
        // console.log("지출 목록", expenseListData);
        return expenseListData;
      } catch (error) {
        throw new Error("지출 목록 조회 에러");
      }
    },
  });

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
  //지불방법
  const {
    data: paymentData,
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      try {
        const response = await instance.get(categoriesRequest.payment);
        const data = response.data.payments;
        // console.log("지불방법", data);
        return data;
      } catch (error) {
        throw new Error("지불방법 조회 에러");
      }
    },
  });

  const payment = [
    {
      value: null,
      label: "결제수단 선택",
    },
    ...(paymentData?.map((item: Payment) => ({
      value: item.id,
      label: item.type,
    })) || []),
  ];

  useEffect(() => {
    if (modifyId !== null && expenseListData) {
      const row = (expenseListData as ExpenseItemType[]).find(
        (item) => item.id === modifyId
      );
      if (row) {
        setModifiedDate(new Date(row.date));
        setModifiedCategory(row.category);
        setModifiedPayment(row.payment);
        setModifiedLocation(row.location);
        setModifiedPrice(row.price);
        setModifiedContent(row.content);
      }
    }
  }, [modifyId, expenseListData]);

  const handleModify = async (expenseId: number) => {
    try {
      if (!modifiedCategory || !modifiedPayment) {
        toast.error("카테고리와 결제수단을 선택해주세요.");
        return;
      }

      await instance.put(expenseRequest.expenseModify + `/${expenseId}`, {
        category: modifiedCategory,
        payment: modifiedPayment,
        location: modifiedLocation,
        price: modifiedPrice,
        content: modifiedContent,
        date: formatDate(modifiedDate),
      });

      toast.success("지출이 수정되었습니다.");

      setModifyId(null);
      queryClient.invalidateQueries({ queryKey: ["expensesList"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenseFixedExpense"] });
    } catch (error) {
      console.error("예산수정에러", error);
    }
  };

  const deleteList = async (expenseId: number) => {
    try {
      await instance.delete(expenseRequest.expenseModify + `/${expenseId}`);
      toast.success("지출이 삭제되었습니다");
      queryClient.invalidateQueries({ queryKey: ["expensesList"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenseFixedExpense"] });
    } catch (error) {
      console.error("지출 삭제 에러", error);
    }
  };

  const handleClick = () => {
    navigation(BUDGET_REGISTER_PAGE);
  };

  if (!expenseListData || expenseListData.length === 0)
    return (
      <div className={noneList}>
        등록된 지출 목록이 없어요
        <button className={addExpenseBtn} onClick={handleClick}>
          등록하러 가기
        </button>
      </div>
    );

  // 로딩 중인 경우
  if (isExpenseListLoading || isPaymentLoading || isLoading)
    return <div>Loading...</div>;

  if (expenseListError) return <div>Error:{expenseListError.message}</div>;

  if (paymentError) return <div>Error:{paymentError.message}</div>;

  if (error) return <div>Error:{error.message}</div>;

  return (
    <div className={wrap}>
      <div className={title}>
        <p className={h1}>
          {year}년 {month}월{" "}
        </p>
      </div>
      <table className={table}>
        <thead>
          <tr>
            <th className={head}>사용날짜</th>
            <th className={head}>카테고리</th>
            <th className={head}>결제수단</th>
            <th className={head}>사용처</th>
            <th className={head}>사용금액</th>
            <th className={head}>사용 내역</th>
            <th className={head}></th>
            <th className={head}></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(expenseListData) &&
            expenseListData.map((row) => (
              <tr key={row.id} className={row.id % 2 === 0 ? evenRow : oddRow}>
                <td className={td}>
                  {modifyId === row.id ? (
                    <ReactDatePicker
                      className={datepicker}
                      showIcon
                      selected={modifiedDate}
                      onChange={(date) => setModifiedDate(date)}
                    />
                  ) : (
                    row.date
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <SelectBox
                      key={row.id}
                      value={
                        modifyId === row.id ? modifiedCategory : row.category
                      }
                      options={options}
                      onChange={(value) => setModifiedCategory(value)}
                    />
                  ) : (
                    categoryMap[row.category]
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <SelectBox
                      key={row.id}
                      value={
                        modifyId === row.id ? modifiedPayment : row.payment
                      }
                      options={payment}
                      onChange={(value) => setModifiedPayment(value)}
                    />
                  ) : (
                    paymentMap[row.payment]
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <Input
                      type='text'
                      value={modifiedLocation}
                      onChange={(e) => setModifiedLocation(e.target.value)}
                    />
                  ) : (
                    row.location
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <Input
                      type='number'
                      value={modifiedPrice}
                      onChange={(e) => setModifiedPrice(e.target.value)}
                      min={0}
                    />
                  ) : (
                    row.price.toLocaleString()
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <Input
                      type='text'
                      value={modifiedContent}
                      onChange={(e) => setModifiedContent(e.target.value)}
                    />
                  ) : (
                    row.content
                  )}
                </td>
                <td className={td}>
                  {modifyId === row.id ? (
                    <button
                      className={modifyBtn}
                      onClick={() => handleModify(row.id)}
                    >
                      저장
                    </button>
                  ) : (
                    <button
                      className={modifyBtn}
                      onClick={() => setModifyId(row.id)}
                    >
                      수정
                    </button>
                  )}
                </td>

                <td className={td}>
                  {modifyId === row.id ? (
                    <div></div>
                  ) : (
                    <button
                      className={modifyBtn}
                      onClick={() => deleteList(row.id)}
                    >
                      삭제
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={expenseBtnWrap}>
        <button className={expenseBtn} onClick={handleClick}>
          지출 등록
        </button>
      </div>
    </div>
  );
};

export default ExpenditureList;
