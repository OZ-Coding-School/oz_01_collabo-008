import { useState } from "react";
import { evenRow, h1, head, modifyBtn, oddRow, table, td, title, wrap } from "./ExpenditureList.css";

const ExpenditureList = () => {


  const [rows, setRows] = useState([
    { date: "2024.04.01", category: "생활용품", payment: "카드", store: "올리브영", amount: "52,300", items: "당근패드, 비타오백" },
    { date: "2024.04.03", category: "생활용품", payment: "카드", store: "와플대학", amount: "8,000", items: "슈크림와플, 아아" },
    { date: "2024.04.03", category: "문화/생활", payment: "카드", store: "이자카야", amount: "120,000", items: "슈크림와플, 아아" },
    { date: "2024.04.05", category: "생활용품", payment: "카드", store: "딥디크", amount: "240,000", items: "친구생일선물 향수샀음" },
    // 나머지 행들 추가
  ]);

  return (
    <div className={wrap}>
      <div className={title}>
        <h1 className={h1}>2024년 4월 </h1>

      </div>
      <table className={table}>
        <thead>
          <th className={head}>사용날짜</th>
          <th className={head}>카테고리</th>
          <th className={head}>카드/현금</th>
          <th className={head}>사용처</th>
          <th className={head}>사용금액</th>
          <th className={head}>사용 내역</th>
          <th className={head}></th>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? evenRow : oddRow}>
              <td className={td}>{row.date}</td>
              <td className={td}>{row.category}</td>
              <td className={td}>{row.payment}</td>
              <td className={td}>{row.store}</td>
              <td className={td}>{row.amount}</td>
              <td className={td}>{row.items}</td>
              <td className={td}><button className={modifyBtn}>수정</button></td>
            </tr>

          ))}

        </tbody>
      </table>
    </div>
  )
}

export default ExpenditureList