import { style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
});

export const title = style({
  display: "flex",
  justifyContent: "center",
});

export const table = style({
  width: "100%",
  backgroundColor: "#fff",
  boxShadow: "0px 4px 30px #FFEBEF",
  borderRadius: "4px",
  textAlign: "left",
  borderCollapse: "collapse",
  border: "none",
});

export const head = style({
  padding: "16px",
  borderBottom: "2px solid #FFF4F5",
  fontSize: "14px",
  fontWeight: "600",
  color: "#121212",
});

export const td = style({
  padding: "16px",
  fontSize: "14px",
});

export const evenRow = style({
  backgroundColor: "#FFF4F5",
});

export const oddRow = style({
  backgroundColor: "#fff",
});

export const modifyBtn = style({
  outline: "none",
  border: "none",
  color: "#F03167",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const h1 = style({
  fontSize: "26px",
  marginBottom: "16px",
  fontWeight: 500,
});

export const addExpenseBtn = style({
  outline: "none",
  border: "none",
  backgroundColor: "#F03167",
  marginTop: "16px",
  fontSize: "16px",
  fontWeight: 400,
  padding: "8px",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
});

export const noneList = style({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  height: "100%",
});
