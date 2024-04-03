import { style } from "@vanilla-extract/css";

export const wrap = style({
  width: "100%",
  padding: "48px",
  boxSizing: "border-box",
});

export const container = style({
  padding: "60px 48px",
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxSizing: "border-box",
});

export const titleWrap = style({
  borderBottom: "2px solid #FBEAEB",
  marginBottom: "16px",
});

export const title = style({
  fontSize: "30px",
  fontWeight: 500,
  marginBottom: "16px",
});

export const description = style({
  color: "#8E8E8E",
  marginBottom: "8px",
});

export const addBtn = style({
  width: "80px",
  outline: "none",
  border: "none",
  backgroundColor: "#F03167",
  color: "white",
  borderRadius: "8px",
  padding: "8px",
});

export const btnWrap = style({
  display: "flex",
  justifyContent: "end",
  marginBottom: "8px",
});
