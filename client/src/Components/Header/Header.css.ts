import { style } from "@vanilla-extract/css";

export const header = style({
  width: "100%",
  height: "80px",
  display: "flex",
  justifyContent: "space-between",
  padding: "24px",
  boxSizing: "border-box",
  alignItems: "center",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

export const logo = style({
  color: "#F03167",
  fontSize: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
});

export const nav = style({
  width: "600px",
  display: "flex",
  justifyContent: "space-around",
});

export const user = style({
  display: "flex",
  justifyContent: "space-between",
});

export const belliIcon = style({
  cursor: "pointer",
});

export const listItem = style({
  // 기본 스타일
  padding: "10px 15px",
  cursor: "pointer",
  ":hover": {
    borderBottom: "2px solid #F03167", // 호버 시 하단 테두리 스타일
  },
  boxSizing: "border-box",
});
