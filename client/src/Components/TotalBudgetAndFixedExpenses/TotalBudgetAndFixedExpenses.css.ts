import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  margin: 0,
});
export const box = style({
  display: "flex",
});

export const container = style({
  padding: "60px",

  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(255,255,255,0.8)",
  borderRadius: "1rem",
});

export const headText = style({
  fontSize: "26px",
  fontWeight: "bold",
});

export const explainText = style({
  fontSize: "12px",
  color: "#8E8E8E",
  marginTop: "10px",
  marginBottom: "5px",
});

export const totalBudgetBox = style({});
export const budgetInputBox = style({
  marginTop: "16px",
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
});

export const budgetHistory = style({
  marginBottom: "40px",
});
export const bugetHistoryTable = style({
  marginLeft: "10px",
  marginTop: "10px",
});

export const fixedExpensesRegistrationTable = style({
  marginLeft: "10px",
  marginTop: "16px",
  marginBottom: "20px",
});
