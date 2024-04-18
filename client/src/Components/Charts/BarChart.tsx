import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
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
interface Options {
  scales: {
    x: {
      type: "category";
      display: boolean;
      grid: {
        display: boolean;
      };
    };
    y: {
      display: boolean;
    };
  };
  plugins: {
    legend: {
      display: boolean;
    };
  };
  maintainAspectRatio: boolean;
}

const options: Options = {
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
  if (!fetchedData || !fetchedData.total_expenses_by_category) {
    return null; // fetchedData가 없거나 total_expenses_by_category가 없는 경우, null을 반환하여 컴포넌트를 렌더링하지 않음
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
