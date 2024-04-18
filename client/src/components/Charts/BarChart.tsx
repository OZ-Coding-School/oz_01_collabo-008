import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

const options: ChartOptions<"bar"> = {
  scales: {
    x: {
      type: "category",
      display: true,
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false, //캔버스 자체에 크기 고정되어 있는 부분 해제
};

const BarChart = ({ fetchedData }: { fetchedData: FetchedData }) => {
  if (
    !fetchedData ||
    !fetchedData.total_expenses_by_category ||
    fetchedData.total_expenses_by_category.length === 0
  ) {
    return <div>지출 내역이 없습니다.</div>;
  }

  const data = {
    labels: fetchedData.total_expenses_by_category.map(
      (category) => category.content
    ),
    datasets: [
      {
        label: "지출 금액",
        data: fetchedData.total_expenses_by_category.map(
          (category) => category.total_price
        ),
        backgroundColor: [
          "rgba(248,161,159,0.7)",
          "rgba(227,187,99,0.8)",
          "rgba(247,203,201,0.8)",
          "rgba(239,217,158,0.8)",
          "rgba(187,14,0,0.8)",
          "rgba(254,172,196,0.8)",
          "rgba(255,218,223,0.8)",
          "rgba(239,49,103,0.8)",
          "rgba(254,172,196,0.8)",
          "rgba(253,198,214,1)",
          "rgba(255,119,158,1)",
        ],
        borderWidth: 0,
        barThickness: 50,
      },
    ],
  };
  return <Bar data={data} options={options} key='unique_key' />;
}; // key 속성 추가

export default BarChart;
