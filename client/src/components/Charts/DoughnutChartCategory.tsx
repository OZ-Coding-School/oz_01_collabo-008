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

interface Top5Categories {
  id?: number;
  content: string | null;
  total_price: number;
}

const DoughnutChartCategory = ({
  fetchedData,
  top5CategoriesData,
}: {
  fetchedData: FetchedData;
  top5CategoriesData: (data: Top5Categories[]) => void;
}) => {
  console.log(fetchedData);
  useEffect(() => {
    const top5Categories = getTop5Categories(fetchedData);
    top5CategoriesData(top5Categories);
  }, [fetchedData, top5CategoriesData]);

  const getTop5Categories = (fetchedData: FetchedData): Top5Categories[] => {
    if (
      !fetchedData ||
      !fetchedData.total_expenses_by_category ||
      fetchedData.total_expenses_by_category.length === 0
    ) {
      return [];
    }
    const filteredCategories = fetchedData.total_expenses_by_category.filter(
      (category) => category.total_price
    );

    // 내림차순 정렬
    const sortedTotalExpensesByCategory = filteredCategories.sort(
      (a, b) => b.total_price - a.total_price
    );

    // top5 카테고리 추출
    const top5Categories = sortedTotalExpensesByCategory.slice(0, 5);

    return top5Categories;
  };

  const top5Categories = getTop5Categories(fetchedData);

  if (top5Categories.length === 0) {
    return <div>지출 내역이 없어 표시할 내용이 없습니다.</div>;
  }

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
        hoverOffset: 10, // 호버 시 이동 거리
        hoverShadowBlur: 5, // 호버 시 그림자 흐림 정도
        hoverShadowColor: "rgba(0, 0, 0, 0.1)", // 호버 시 그림자 색상
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const dataLabel = top5Categories[context.dataIndex].content;
            const value = context.formattedValue;
            return `${dataLabel} ${value}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChartCategory;
