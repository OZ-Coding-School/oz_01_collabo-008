import { ArcElement, Chart, Tooltip } from "chart.js";
import { useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip);

interface FetchedData {
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

interface Top5CategoriesData {
  content: string;
}

const DoughnutChartCategory = ({
  fetchedData,
  top5CategoriesData,
}: {
  fetchedData: FetchedData;
  top5CategoriesData: (data: Top5CategoriesData[]) => void;
}) => {
  useEffect(() => {
    const top5Categories = getTop5Categories(fetchedData);
    top5CategoriesData(top5Categories);
  }, [fetchedData, top5CategoriesData]);

  const getTop5Categories = (fetchedData: FetchedData) => {
    if (!fetchedData || !fetchedData.total_expenses_by_category) {
      // null 또는 undefined 경우 처리
      return [];
    }

    //내림차순 정렬
    const sortedTotalExpensesByCategory =
      fetchedData.total_expenses_by_category.sort(
        (a, b) => b.total_price - a.total_price
      );

    //top5 카테고리 추출
    const top5Categories = sortedTotalExpensesByCategory.slice(0, 5);
    //console.log("top5Categories:", top5Categories);

    return top5Categories;
  };

  const top5Categories = getTop5Categories(fetchedData);

  const data = {
    datasets: [
      {
        label: "지출",
        data: top5Categories.map((category) => category.total_price),
        backgroundColor: [
          "rgba(240,49,103, 0.8)",
          "rgba(254,172,202,0.8)",
          "rgba(239,217,158,1)",
          "rgba(248,161,159,1)",
          "rgba(251,234,235,1)",
        ],
        borderWidth: 10,
      },
    ],
  };

  return <Doughnut data={data} />;
};
export default DoughnutChartCategory;
