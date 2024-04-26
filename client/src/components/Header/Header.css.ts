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
  width: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  cursor: "pointer",
});

export const logoImg = style({
  width: "100%",
  objectFit: "cover",
});

export const nav = style({
  width: "600px",
  display: "flex",
  justifyContent: "space-around",
});

export const user = style({
  width: "50px",
  height: "50px",
  borderRadius: "25px",
});

export const belliIcon = style({
  cursor: "pointer",
});

export const listItem = style({
  // 기본 스타일
  padding: "10px 15px",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const selectedListItem = style({
  color: "#F03167",
  fontWeight: 600,
  padding: "10px 15px",
  cursor: "pointer",
  boxSizing: "border-box",
});

export const profileImg = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "25px",
});
