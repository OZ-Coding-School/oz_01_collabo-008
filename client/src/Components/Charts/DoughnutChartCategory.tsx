import { ArcElement, Chart, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import testData from "../../pages/MonthlyReport/testDB";

Chart.register(ArcElement, Tooltip);

//#region 타입정의

interface CategoryExpense {
  category: string;
  amount: number;
}

//#endregion

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

//#region 지출 가장 큰 곳 top 5 구하기

// totalExpensesPerCategoriesResult 이걸 지출 순서로 내림차순 정렬
// 1. 객체를 배열로 변환
const objectToArray = Object.entries(totalExpensesPerCategoriesResult);

//2. 내림차순 정렬
const sortedArrayResult = objectToArray.sort((a, b) => b[1] - a[1]);
//console.log("sortedArrayResult : ", sortedArrayResult);

//3. top5 뽑기
export const top5Categories: CategoryExpense[] = sortedArrayResult.slice(0, 5);
console.log("top5Categories:", top5Categories);

// //4. 2를 다시 객체로 변환
// const sortedObjectResult = Object.fromEntries(sortedArrayResult);
// console.log("sortedObjectResult", sortedObjectResult);

const data = {
  datasets: [
    {
      label: "지출",
      data: top5Categories.map((category) => category[1]),
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

const DoughnutChartCategory = () => <Doughnut data={data} />;

export default DoughnutChartCategory;
