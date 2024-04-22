import { style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
  padding: "48px",
  boxSizing: "border-box",
  display: "flex",
});

export const mainContainer = style({
  width: "100%",
  padding: "60px 48px",
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxSizing: "border-box",
});

export const expenseBtnWrap = style({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  alignItems: "end",
  marginTop: "20px",
});
export const expenseBtn = style({
  width: "80px",
  outline: "none",
  border: "none",
  backgroundColor: "#F03167",
  color: "white",
  borderRadius: "8px",
  padding: "8px",
  cursor: "pointer",
});

export const noneList = style({
  display: "flex",
  justifyContent: "center",
});
