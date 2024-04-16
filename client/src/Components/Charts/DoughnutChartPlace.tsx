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
interface Top5PlacesData {
  location: string | null;
}

const DoughnutChartPlace = ({
  fetchedData,
  top5PlacesData,
}: {
  fetchedData: FetchedData;
  top5PlacesData: (data: Top5PlacesData[]) => void;
}) => {
  useEffect(() => {
    const top5Places = getTop5Places(fetchedData);
    top5PlacesData(top5Places);
  }, [fetchedData, top5PlacesData]);

  const getTop5Places = (fetchedData: FetchedData) => {
    if (!fetchedData || !fetchedData.total_expenses_by_location) {
      // null 또는 undefined 경우 처리
      return [];
    }

    // // location이 null 인 경우 기타로 처리
    // if(fetchedData.total_expenses_by_location.location === 'null' && fetchedData.total_expenses_by_location.total_price){

    // }

    //내림차순 정렬
    const sortedTotalExpensesByPlace =
      fetchedData.total_expenses_by_location.sort(
        (a, b) => b.total_price - a.total_price
      );

    //top5 카테고리 추출
    const top5Places = sortedTotalExpensesByPlace.slice(0, 5);

    return top5Places;
  };

  const top5Places = getTop5Places(fetchedData);

  // 도넛 차트에 표시할 데이터 설정
  const data = {
    datasets: [
      {
        label: "지출",
        data: top5Places.map((place) => place.total_price),
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
export default DoughnutChartPlace;
