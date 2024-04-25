import { Box, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useQuery } from "@tanstack/react-query";
import instance from "../../../api/axios";
import fixedRequest from "../../../api/fixedRequest";
import {
  fixedText,
  fixedWrap,
  list,
  listItem,
  listItems,
} from "../SideBar.css";

interface FixedExpense {
  fixed_expenses_per_list: Array<{
    category: number;
    total_price: number;
  }>;
}

const FixedExpenses = () => {
  //고정 지출
  const {
    data: fixedExpense,
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

  if (isFixedExpense) return <div>Loading...</div>;
  if (fixedExpenseError) return <div>Error:{fixedExpenseError.message}</div>;
  if (!fixedExpense || fixedExpense.fixed_expenses_per_list.length === 0)
    return <div>등록된 고정지출이 없습니다.</div>;

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

  return (
    <Box className={fixedWrap}>
      <Text className={fixedText}>고정지출</Text>
      <ul className={list}>
        {fixedExpense.fixed_expenses_per_list.map((item, index) => (
          <li className={listItems} key={index}>
            <Text as='p' className={listItem}>
              {categoryMap[item.category] || "기타"}
            </Text>
            <Text as='p'>{item.total_price.toLocaleString()}원</Text>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default FixedExpenses;
