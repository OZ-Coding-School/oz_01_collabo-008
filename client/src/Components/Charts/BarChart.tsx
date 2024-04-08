import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import testData from "../../pages/MonthlyReport/testDB";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const options = {
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

// labels testDB에서 가져오기
const getCategories = () => {
  const categories = new Set(); // Set은 중복 허용이 안됨
  testData.expenses.forEach((expense) => {
    categories.add(expense.category);
  });
  return Array.from(categories); // Set을 배열로 변환하기
};

const dbCategories = getCategories();

// testDB의 카테고리 별로 지출금액 합산하는 함수
const getTotalExpensesPerCategories = (data) => {
  const totalExpensesPerCategories = {};

  testData.expenses.forEach((expense) => {
    if (totalExpensesPerCategories[expense.category]) {
      totalExpensesPerCategories[expense.category] += expense.amount;
    } else {
      totalExpensesPerCategories[expense.category] = expense.amount;
    }
  });
  return totalExpensesPerCategories;
};

// 카테고리 별 지출 금액을 합산해서 객체 만들기
const totalExpensesPerCategoriesResult =
  getTotalExpensesPerCategories(testData);

// console.log(
//   "totalExpensesPerCategoriesResult",
//   totalExpensesPerCategoriesResult
// );

const data = {
  labels: dbCategories,
  datasets: [
    {
      label: "지출 금액",
      data: dbCategories.map(
        (category) => totalExpensesPerCategoriesResult[category]
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
      //borderColor: [],
      borderWidth: 0,
      barThickness: 50,
    },
  ],
};

// // 평균치 보다 큰거 "rgba(240,49,103, 0.8)",
// // 평균치 보다 작은것들 "rgba(255,218,225, 0.8)",
// // 평균치 그나마 10프로?(이건 조정 필요) 정도 인접한것들 "rgba(255,165,190,0.8)"

// //평균치 구하기
// //데이터 합
// const dataSum = data.datasets[0].data.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   0
// );
// //평균 구하기
// const dataAvg = dataSum / data.datasets[0].data.length;

// //배경색 설정해주기
// const backgroundColors = data.datasets[0].data.map((value) => {
//   if (value > dataAvg) {
//     return "rgba(240,49,103, 0.8)";
//   } else if (value > dataAvg * 0.9) {
//     return "rgba(255,165,190,0.8)";
//   } else {
//     return "rgba(255,218,225, 0.8)";
//   }
// });

// data.datasets[0].backgroundColor = backgroundColors;

const BarChart = () => <Bar data={data} options={options} key='unique_key' />; // key 속성 추가

export default BarChart;
