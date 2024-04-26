import { AnimatedLineProgressBar } from "@frogress/line";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useState } from "react";
import instance from "../../api/axios";
import budgetRegRequest from "../../api/budgetRegRequest";
import fixedRequest from "../../api/fixedRequest";
import FixedExpenses from "./FixedExpenses/FixedExpenses";
import {
  Budget,
  percentStyle,
  progress,
  sideBox,
  spendingText,
  spendingTextwrap,
  totalTextWrap,
  wonText,
} from "./SideBar.css";

interface ItemType {
  id: number;
  created_at: string;
  value: number;
}

interface TotalExpenseAddFixedExpense {
  message: string;
  status_code: number;
  total_expense_fixed_expenses: number | null;
}

const SideBar = () => {
  const [year] = useState(new Date().getFullYear());
  const [month] = useState(new Date().getMonth() + 1);
  const [totalBudget, setTotalBudget] = useState<number>(0);

  // 전체예산
  const {
    data: budgetList,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useQuery({
    queryKey: ["budget"],
    queryFn: async () => {
      try {
        const response = await instance.get(
          budgetRegRequest.budgetList + `?year=${year}&month=${month}`
        );
        // console.log("response : ", response);
        const totalBudget = response.data.total_budget;
        // console.log("사이드 바 전체 예산 : ", totalBudget);

        setTotalBudget(totalBudget);
        return totalBudget;
      } catch (error) {
        throw new Error("전체예산 에러");
      }
    },
  });

  const {
    data: totalExpenseFixedExpenseData,
    isLoading: isTotalExpenseFixedExpenseLoading,
    error: totalExpenseFixedExpenseError,
  } = useQuery({
    queryKey: ["totalExpenseFixedExpense"],
    queryFn: async () => {
      try {
        const response = await instance.get(fixedRequest.fixedReg);
        const expenseSum = response.data;

        console.log("지출 response data : ", expenseSum);

        return expenseSum;
      } catch (error) {
        throw new Error("고정 지출 + 지출 목록 조회 에러");
      }
    },
  });

  if (isBudgetLoading) return <div>Loading...</div>;
  if (budgetError) return <div>Error:{budgetError.message}</div>;
  if (!budgetList || budgetList.length === 0) return null;

  if (isTotalExpenseFixedExpenseLoading) return <div>Loading...</div>;
  if (totalExpenseFixedExpenseError)
    return <div>Error:{totalExpenseFixedExpenseError.message}</div>;
  if (!totalExpenseFixedExpenseData) return <div>No data available</div>;

  const usedPercentage =
    totalExpenseFixedExpenseData?.total_expense_fixed_expense
      ? (totalExpenseFixedExpenseData?.total_expense_fixed_expense /
          totalBudget) *
        100
      : 0;

  // console.log("너 얼마썻어", totalExpenseData);
  return (
    <Box width='500px' className={sideBox}>
      <Card size='5'>
        <Flex gap='4' align='center'>
          <Box className={totalTextWrap}>
            <Text as='div' weight='bold'>
              이번 달 총 예산
            </Text>
            <Text as='div' className={Budget}>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {totalBudget ? totalBudget.toLocaleString() : "0"}
              </motion.p>
              <Text as='span' className={wonText}>
                원
              </Text>
            </Text>
          </Box>
        </Flex>
        <Flex gap='4' direction='column'>
          <Box className={spendingTextwrap}>
            <Text as='p'>
              전체 예산 중{" "}
              <Text as='span' className={spendingText}>
                {(
                  totalExpenseFixedExpenseData?.total_expense_fixed_expense ?? 0
                ).toLocaleString()}
              </Text>{" "}
              원을 사용했어요
            </Text>
          </Box>
          {/* <Box className={progress}>여러분 여기는 프로그래스바입니다</Box> */}
          <AnimatedLineProgressBar
            percent={Math.min(usedPercentage, 100)}
            // percent={100}
            transition={{ easing: "linear" }}
            rounded={36}
            progressColor='linear-gradient(to right, #F03167, #F35F89, #FFA5BE)'
            containerColor='#fff'
            width={400}
            height={48}
            className={progress}
            label={(value: number) => <CustomLabelComponent percent={value} />}
          />
        </Flex>

        <FixedExpenses />
      </Card>
    </Box>
  );
};

interface CustomLabelComponentProps {
  percent: number;
}

const CustomLabelComponent = ({ percent }: CustomLabelComponentProps) => {
  return <div className={percentStyle}>{Math.round(percent)}%</div>;
};

export default SideBar;
