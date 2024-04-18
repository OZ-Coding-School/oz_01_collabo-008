import { Box, Divider } from "@mui/material";
import { Text } from "@radix-ui/themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
  total_expenses_by_location: Top5Places[];
}

interface Top5Places {
  id?: number;
  location: string | null;
  total_price: number;
}

interface Top5Categories {
  content: string;
  total_price: number;
}

const MonthlyReport = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [year] = useState(currentYear);
  const [month] = useState(currentMonth);
  const [memberId] = useState(localStorage.getItem("memberId"));

  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);
  const [data, setData] = useState<MonthlyReportData | null>(null);

  //top5Categories state
  const [top5CategoriesData, setTop5CategoriesData] = useState<
    { id: number; content: string; total_price: number }[]
  >([]);

  //top5Places state
  const [top5PlacesData, setTop5PlacesData] = useState<
    MonthlyReportData["total_expenses_by_location"]
  >([]);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [savedBudget, setSavedBudget] = useState<number>(0);

  useEffect(() => {
    if (!memberId) return;

    const fetchData = async () => {
      try {
        const response = await instance.get(
          monthlyRequest.monthly + `/${memberId}?year=${year}&month=${month}`
        );

        setData(response.data);

        //total Budget 가져오기
        const budgetResponse = await instance.get(
          budgetRegRequest.budgetList +
            `/${memberId}?year=${year}&month=${month}`
        );

        console.log("budgetData : ", budgetResponse.data);

        if (budgetResponse.data.budget_list.length > 0) {
          const budgetItem = budgetResponse.data.budget_list[0];
          setTotalBudget(budgetItem.value);
        } else {
          console.log(
            "Budget Data does not exist. please set your budget first!"
          );
          setTotalBudget(0);
        }

        // totalExpense 계산
        let totalExpense = 0;
        for (const category of response.data.total_expenses_by_category) {
          totalExpense += category.total_price;
        }

        // savedBudget 계산
        const savedBudget = totalBudget - totalExpense;
        setSavedBudget(savedBudget);

        if (response.data) {
          console.log("Data : ", response.data);
        } else {
          console.log("Empty response data");
        }
      } catch (error) {
        console.error("Error fetching monthly report:", error);
      }
    };
    fetchData();
  }, [memberId, cookies.accessToken, year, month, setCookies, totalBudget]);

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
                  fontSize: "2.1rem",
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
              +{" "}
              <Box
                sx={{
                  color: "#F03167",
                  fontSize: "2.1rem",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {Number(savedBudget)
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
              원이 세이브 되었습니다.
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
                      {index + 1}. {/* {category.id}.{" "} */}
                      {category.content !== null ? category.content : "기타"}
                    </motion.li>
                  ))}
                </motion.ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartCategory
                  fetchedData={
                    data || {
                      total_expenses_by_category: [],
                      total_expenses_by_location: [],
                    }
                  }
                  top5CategoriesData={(data: Top5Categories[]) =>
                    setTop5CategoriesData(
                      data.map((item, index) => ({ ...item, id: index }))
                    )
                  }
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
                      {index + 1}. {/* {category.id}.{" "} */}
                      {place.location !== null ? place.location : "기타"}
                    </motion.li>
                  ))}
                </motion.ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartPlace
                  fetchedData={
                    data || {
                      total_expenses_by_category: [],
                      total_expenses_by_location: [],
                    }
                  }
                  top5PlacesData={(data) => setTop5PlacesData(data)}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={barChartBox}>
          <Box className={barChart}>
            <BarChart
              fetchedData={
                data || {
                  total_expenses_by_category: [],
                  total_expenses_by_location: [],
                }
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyReport;
