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

function MonthlyReport() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString();

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  const [memberId, setMemberId] = useState("1");
  // const [accessToken, setAccessToken] = useState("");
  const [cookies, setCookies] = useCookies(["accessToken", "refreshToken"]);
  //const [cookies, setCookies] = useCookies(["accessToken"]);
  const [data, setData] = useState(null);

  //top5Categories state
  const [top5CategoriesData, setTop5CategoriesData] = useState<
    MonthlyReportData[]
  >([]);

  //top5Places state
  const [top5PlacesData, setTop5PlacesData] = useState<MonthlyReportData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
            // "ngrok-skip-browser-warning": "69420",
          },
        };

        const response = await axios.get(
          `http://ec2-3-35-3-27.ap-northeast-2.compute.amazonaws.com/api/v1/reports/${memberId}?year=${year}&month=${month}`,
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

        console.log(response);

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
  }, [memberId, cookies.accessToken, year, month, setCookies]);

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
        <Box className={resultTextBox}>
          <Box>
            <Text>이번 달 총 예산 700,000 원 중</Text>
          </Box>
          <Box>
            <Text>+ 100,000 원이 세이브 되었습니다.</Text>
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
