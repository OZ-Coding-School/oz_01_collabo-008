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
  width: "100%",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxSizing: "border-box",
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
  fontWeight: "500",
  paddingBottom: "0.3rem",
});
export const explainText = style({
  fontSize: "0.9rem",
  fontWeight: "400",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  color: "#8E8E8E",
  paddingBottom: "8px",
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
  marginTop: "10px",
});
export const fixedExpensesRegiTable = style({
  paddingTop: "1rem",
});

export const addBtn = style({
  width: "80px",
  outline: "none",
  border: "none",
  backgroundColor: "#F03167",
  color: "white",
  borderRadius: "8px",
  padding: "10px",
  marginLeft: "8px",
  cursor: "pointer",
});
//#endregion

//#region 고정 지출 등록
export const fixedExpenseBox = style({
  width: "100%",
  height: "60%",
});
//#endregion
