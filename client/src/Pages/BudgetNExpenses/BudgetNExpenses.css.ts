import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
});
export const box = style({
  display: "flex",
  padding: "32px 60px",
});
export const container = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "1rem",
  padding: "0",
  width: "900px",
});
export const wrapper = style({
  padding: "60px 24px",
});
export const totalBudgetBox = style({
  width: "100%",
  height: "40%",
});
export const headText = style({
  fontSize: "26px",
  fontWeight: "bold",
  paddingBottom: "0.3rem",
});
export const explainText = style({
  fontSize: "0.9rem",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  color: "#8E8E8E",
  paddingBottom: "0.15rem",
});

//#region 예산 등록
export const budgetInputBox = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "1rem",
});
export const budgetHistory = style({
  paddingTop: "1rem",
  marginBottom: "2.5rem",
});
export const bugetHistoryTable = style({
  marginLeft: "10px",
  marginTop: "10px",
});
export const fixedExpensesRegiTable = style({
  paddingTop: "1rem",
  paddingLeft: "10px",
});
//#endregion

//#region 고정 지출 등록
export const fixedExpenseBox = style({
  width: "100%",
  height: "60%",
});
//#endregion

// export const addRowBtn = style({
//   backgroundColor: "#F03167",
//   borderRadius: "8px",
//   marginLeft: "8px",
//   width: "90px",
//   height: "38px",
//   fontSize: "11px",
//   // hover": {
//   //   backgroundColor: "#F03167",
//   // },
//   boxShadow: "none",
// });
