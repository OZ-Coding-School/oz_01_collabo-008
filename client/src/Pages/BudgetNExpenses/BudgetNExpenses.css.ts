import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
});
export const box = style({
  display: "flex",
  padding: "48px 60px",
});
export const container = style({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "1rem",
});

export const totalBudgetBox = style({
  padding: "60px 48px",
});
export const headText = style({
  fontSize: "26px",
  fontWeight: "bold",
});
export const explainText = style({
  fontSize: "0.8rem",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginRight: "24px",
  color: "#8E8E8E",
  marginTop: "10px",
  marginBottom: "5px",
});

//#region 예산 등록
export const budgetInputBox = style({
  display: "flex",
  alignItems: "center",
  paddingBottom: "20px",
  paddingTop: "16px",
});
export const budgetHistory = style({
  marginBottom: "40px",
});
export const bugetHistoryTable = style({
  marginLeft: "10px",
  marginTop: "10px",
});
export const fixedExpensesRegiTable = style({
  marginLeft: "10px",
  marginTop: "16px",
});
//#endregion

//#region 고정 지출 등록
export const fixedExpenseBox = style({
  marginLeft: "48px",
  marginRight: "48px",
});
//#endregion
