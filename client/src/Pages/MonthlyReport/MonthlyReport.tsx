import { Box, Divider } from "@mui/material";
import { Text } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
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
    location: string | null;
    total_price: number;
  }[];
}

interface BudgetData {
  budget_list: {
    id: number;
    value: number;
    created_at: string;
  };
}
function MonthlyReport() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [memberId, setMemberId] = useState(localStorage.getItem("memberId"));

  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);
  const [data, setData] = useState(null);

  //top5Categories state
  const [top5CategoriesData, setTop5CategoriesData] = useState<
    MonthlyReportData[]
  >([]);

  //top5Places state
  const [top5PlacesData, setTop5PlacesData] = useState<MonthlyReportData[]>([]);

  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [savedBudget, setSavedBudget] = useState<number>(0);

  useEffect(() => {
    if (!memberId) return;

    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
            // "ngrok-skip-browser-warning": "69420",
          },
        };

        const response = await axios.get(
          `http://ec2-13-124-35-222.ap-northeast-2.compute.amazonaws.com/api/v1/reports/${memberId}?year=${year}&month=${month}`,
          config
        );

        setData(response.data);
        // 새로운 토큰을 쿠키에 저장
        if (response.data.refreshToken && response.data.accessToken) {
          setCookies("refreshToken", response.data.refreshToken, {
            path: "/monthlyreport",
          });
          setCookies("accessToken", response.data.accessToken, {
            path: "/monthlyreport",
          });
        }

        //total Budget 가져오기
        const budgetResponse = await axios.get(
          `http://ec2-13-124-35-222.ap-northeast-2.compute.amazonaws.com/api/v1/budgets/${memberId}?year=${year}&month=${month}`,
          config
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
                component='span'
                sx={{
                  color: "#F03167",
                  fontSize: "2.1rem",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {Number(totalBudget).toLocaleString()}
              </Box>
              원 중
            </Box>
          </Box>
          <Box>
            <Box>
              +{" "}
              <Box
                component='span'
                sx={{
                  color: "#F03167",
                  fontSize: "2.1rem",
                  display: "inline-block",
                  verticalAlign: "middle",
                  marginLeft: "0.5rem",
                  marginRight: "0.5rem",
                }}
              >
                {Number(savedBudget).toLocaleString()}
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
                <ul className={list}>
                  {top5CategoriesData.map((category, index) => (
                    <li className={li} key={index + 1}>
                      {index + 1}.
                      {category.content !== null ? category.content : "기타"}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartCategory
                  fetchedData={data}
                  top5CategoriesData={setTop5CategoriesData}
                />
              </Box>
            </Box>
          </Box>
          <Box className={largestExpPlaceBox}>
            <Box className={expExpainText}>
              <Box className={explainTitle}>이번 달 가장 큰 지출이에요</Box>
              <Box className={ranking}>
                <ul className={list}>
                  {top5PlacesData.map((place, index) => (
                    <li className={li} key={index + 1}>
                      {index + 1}.{" "}
                      {place.location !== null ? place.location : "기타"}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
            <Box className={doughnutChartBox}>
              <Box className={doughnutChart}>
                <DoughnutChartPlace
                  fetchedData={data}
                  top5PlacesData={setTop5PlacesData}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={barChartBox}>
          <Box className={barChart}>
            <BarChart fetchedData={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MonthlyReport;
