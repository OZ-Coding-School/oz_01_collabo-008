import { Box, Divider } from "@mui/material";
import { Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../api/axios";
import budgetRegRequest from "../../api/budgetRegRequest";
import monthlyRequest from "../../api/monthlyRequest";
import BarChart from "../../components/Charts/BarChart";
import DoughnutChartCategory from "../../components/Charts/DoughnutChartCategory";
import DoughnutChartPlace from "../../components/Charts/DoughnutChartPlace";
import {
  barChart,
  barChartBox,
  box,
  container,
  doughnutChart,
  doughnutChartBox,
  doughnutCharts,
  expExpainText,
  explainText,
  explainTitle,
  headText,
  largestExpCategoryBox,
  largestExpPlaceBox,
  li,
  list,
  ranking,
  resultTextBox,
  titleWrapper,
} from "./MonthlyReport.css";

interface MonthlyReportData {
  total_expenses_by_category: {
    id: number;
    content: string;
    total_price: number;
  }[];
  total_expenses_by_location: {
    id: number;
    location: string | null;
    total_price: number;
  }[];
}

interface Top5Categories {
  id?: number;
  content: string;
  total_price: number;
}

interface Top5Places {
  id?: number;
  location: string | null;
  total_price: number;
}

const MonthlyReport = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [isLoading, setIsLoading] = useState(false);

  const [year] = useState(currentYear);
  const [month] = useState(currentMonth);

  const [data, setData] = useState<MonthlyReportData | null>(null);

  const [top5CategoriesData, setTop5CategoriesData] = useState<
    Top5Categories[]
  >([]);

  const [top5PlacesData, setTop5PlacesData] = useState<Top5Places[]>([]);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [savedBudget, setSavedBudget] = useState<number>(0);

  const {
    data: budgetData,
    isLoading: isBudgetDataLoading,
    error: budgetDataError,
  } = useQuery({
    queryKey: ["budgetData", { year, month }],
    queryFn: async () => {
      try {
        const response = await instance.get(
          budgetRegRequest.budgetList + `?year=${year}&month=${month}`
        );
        const totalBudget = response.data.total_budget;
        setTotalBudget(totalBudget);

        return totalBudget;
      } catch (error) {
        throw new Error(`Budget data fetching error: ${error.message}`);
      }
    },
  });

  const {
    data: expensesData,
    isLoading: isExpensesDataLoading,
    error: expensesDataError,
  } = useQuery({
    queryKey: ["expensesData"],
    queryFn: async () => {
      try {
        const response = await instance.get(
          monthlyRequest.monthly + `?year=${year}&month=${month}`
        );
        //console.log("Expenses Data:", response.data);
        return response.data;
      } catch (error) {
        throw new Error("Data fetching Error");
      }
    },
  });

  useEffect(() => {
    setIsLoading(true);

    if (!budgetData && !toast.isActive("budgetToast")) {
      toast.error(
        "설정하신 예산이 0원 입니까? 아니라면 예산을 먼저 등록해주세요!",
        { toastId: "budgetToast" }
      );

      console.error("예산 데이터 먼저 등록 필요");
      setTotalBudget(0);
      setIsLoading(false);
      return;
    }

    if (!expensesData) {
      console.error("Expenses Data does not exist");
      setIsLoading(false);
      return;
    }

    setData(expensesData);

    let totalExpense = 0;
    for (const category of expensesData.total_expenses_by_category) {
      totalExpense += category.total_price;
    }

    //세이브 된 액수 계산
    const savedBudget = totalBudget - totalExpense;
    setSavedBudget(savedBudget);

    setIsLoading(false);
  }, [expensesData, budgetData, totalBudget]);

  if (isExpensesDataLoading) return <div>Expense Data is Loading...</div>;
  if (expensesDataError) return <div>Error: {expensesDataError.message}</div>;

  if (isBudgetDataLoading) return <div>Budget Data is Loading...</div>;
  if (budgetDataError) return <div>Error: {budgetDataError.message}</div>;

  return (
    <Box className={box}>
      <Box className={container}>
        <Box className={titleWrapper}>
          <Text className={headText}>이번 달 레포트</Text>
          <Text as='p' className={explainText}>
            이번 달 지출한 금액을 레포트로 확인해보세요
          </Text>
          <Divider sx={{ borderColor: "#FBEAEB", borderWidth: "1px" }} />
        </Box>
        <Box className={resultTextBox} sx={{ display: "flex" }}>
          <Box>
            <Box>
              이번 달 총 예산{" "}
              <Box
                sx={{
                  color: "#F03167",
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {Number(totalBudget)
                  .toLocaleString()
                  .split("")
                  .map((char, index) => (
                    <motion.span
                      key={index}
                      style={{
                        display: "inline-block",
                        originY: 0.5,
                      }}
                      animate={{ y: [0, -10, 0], opacity: [0, 1, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
              </Box>
              원 중
            </Box>
          </Box>
          <Box>
            <Box>
              {savedBudget > 0 ? "+" : " "}{" "}
              <Box
                sx={{
                  color: "#F03167",
                  fontSize: "2.2rem",
                  fontWeight: "700",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {Math.abs(savedBudget)
                  .toLocaleString()
                  .split("")
                  .map((char, index) => (
                    <motion.span
                      key={index}
                      style={{
                        display: "inline-block",
                        originY: 0.5,
                      }}
                      animate={{ y: [0, -10, 0], opacity: [0, 1, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
              </Box>
              원
              {savedBudget > 0
                ? "이 세이브 되었습니다."
                : "을 더 사용했습니다."}
            </Box>
          </Box>
        </Box>
        <Box className={doughnutCharts}>
          <Box className={largestExpCategoryBox}>
            <Box className={expExpainText}>
              <Box className={explainTitle}>
                이번 달 지출이 가장 큰 곳이에요
              </Box>
              <Box className={ranking}>
                <motion.ul className={list}>
                  {top5CategoriesData.map((category, index) => (
                    <motion.li
                      className={li}
                      key={index + 1}
                      initial={{ opacity: 0, y: 10 * (index + 1) }} // 초기 상태
                      animate={{ opacity: 1, y: 0 }} // 애니메이션 적용 후 상태
                      transition={{ duration: 0.2 * (index + 1) }} // 애니메이션 지속 시간
                    >
                      {index + 1}.{" "}
                      {category.content !== null ? category.content : "기타"}
                    </motion.li>
                  ))}
                </motion.ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartCategory
                  fetchedData={expensesData}
                  top5CategoriesData={setTop5CategoriesData}
                />
              </Box>
            </Box>
          </Box>
          <Box className={largestExpPlaceBox}>
            <Box className={expExpainText}>
              <Box className={explainTitle}>이번 달 가장 큰 지출이에요</Box>
              <Box className={ranking}>
                <motion.ul className={list}>
                  {top5PlacesData.map((place, index) => (
                    <motion.li
                      className={li}
                      key={index + 1}
                      initial={{ opacity: 0, y: 10 * (index + 1) }} // 초기 상태
                      animate={{ opacity: 1, y: 0 }} // 애니메이션 적용 후 상태
                      transition={{ duration: 0.2 * (index + 1) }} // 애니메이션 지속 시간
                    >
                      {index + 1}.{" "}
                      {place.location !== null ? place.location : "기타"}
                    </motion.li>
                  ))}
                </motion.ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartPlace
                  fetchedData={expensesData}
                  top5PlacesData={setTop5PlacesData}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={barChartBox}>
          <Box className={barChart}>
            <BarChart fetchedData={expensesData} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyReport;
