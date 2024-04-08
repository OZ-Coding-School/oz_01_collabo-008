import { ArcElement, Chart, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import testData from "../../pages/MonthlyReport/testDB";

Chart.register(ArcElement, Tooltip);

// testDB의 장소 별로 지출금액 합산하는 함수
const getTotalExpensesPerPlaces = (data) => {
  const totalExpensesPerPlaces = {};

  testData.expenses.forEach((expense) => {
    if (totalExpensesPerPlaces[expense.place]) {
      totalExpensesPerPlaces[expense.place] += expense.amount;
    } else {
      totalExpensesPerPlaces[expense.place] = expense.amount;
    }
  });
  return totalExpensesPerPlaces;
};

// 카테고리 별 지출 금액을 합산해서 객체 만들기
const totalExpensesPerPlacesResult = getTotalExpensesPerPlaces(testData);

//#region 지출 가장 큰 카테고리 top 5 구하기

// totalExpensesPerPlacesResult 지출 순서로 내림차순 정렬
//1. 객체를 배열로 변환
const objectToArray = Object.entries(totalExpensesPerPlacesResult);

//2. 내림차순으로 정렬
const sortedArrayResult = objectToArray.sort((a, b) => b[1] - a[1]);

//3. top5 뽑기
export const top5Places = sortedArrayResult.slice(0, 5);
console.log("top5Places : ", top5Places);

// 도넛 차트에 표시할 데이터 설정
const data = {
  datasets: [
    {
      label: "지출",
      data: top5Places.map((place) => place[1]),
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

const DoughnutChartPlace = () => <Doughnut data={data} />;

export default DoughnutChartPlace;

// import { ArcElement, Chart, Tooltip } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
// import testData from "./testDB";

// Chart.register(ArcElement, Tooltip);

// // testDB의 장소 별로 지출금액 합산하는 함수
// const getTotalExpensesPerPlaces = (data) => {
//   const totalExpensesPerPlaces = {};

//   testData.expenses.forEach((expense) => {
//     if (totalExpensesPerPlaces[expense.place]) {
//       totalExpensesPerPlaces[expense.place] += expense.amount;
//     } else {
//       totalExpensesPerPlaces[expense.place] = expense.amount;
//     }
//   });
//   return totalExpensesPerPlaces;
// };

// // 카테고리 별 지출 금액을 합산한 객체
// const totalExpensesPerPlacesResult = getTotalExpensesPerPlaces(testData);

// // 가장 큰 expense가 있는 장소 찾기
// let maxPlace = "";
// let maxExpense = 0;
// for (const place in totalExpensesPerPlacesResult) {
//   if (totalExpensesPerPlacesResult[place] > maxExpense) {
//     maxExpense = totalExpensesPerPlacesResult[place];
//     maxPlace = place;
//   }
// }

// console.log("가장 큰 지출한 장소 :", maxPlace);
// //console.log("가장 큰 지출 금액 :", maxExpense);

// // 나머지 카테고리들의 비용 합산
// let restSum = 0;
// for (const place in totalExpensesPerPlacesResult) {
//   if (place !== maxPlace) {
//     restSum += totalExpensesPerPlacesResult[place];
//   }
// }

// const data = {
//   datasets: [
//     {
//       label: "지출",
//       data: [maxPlace, restSum],
//       backgroundColor: ["rgba(240,49,103, 0.8)", "rgba(255,218,225, 0.8)"],
//       borderWidth: 10,
//     },
//   ],
// };

// //#region 지출 가장 큰 장소 top 5 구하기

// // 장소를 지출 금액에 따라 내림차순으로 정렬
// const sortedPlaces = Object.keys(totalExpensesPerPlacesResult).sort(
//   (a, b) => totalExpensesPerPlacesResult[b] - totalExpensesPerPlacesResult[a]
// );
// // 지출 top5 장소
// export const top5Places = sortedPlaces.slice(0, 5);
// console.log("지출 top5 장소 :", top5Places);

// // 이걸 리스트로 넘기기!

// //#endregion

// const DoughnutChartPlace = () => <Doughnut data={data} />;

// export default DoughnutChartPlace;
