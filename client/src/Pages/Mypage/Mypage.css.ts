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

export const titleWrap = style({
  width: "100%",
  fontSize: "30px",
  fontWeight: "500",
  borderBottom: "2px solid #FBEAEB",
  marginBottom: "16px",
  paddingBottom: "8px",
  boxSizing: "border-box",
});

export const userNameWrap = style({
  fontSize: "20px",
  fontWeight: "500",
  marginBottom: "24px",
});

export const userInfo = style({
  display: "flex",
  justifyContent: "start",
});

export const imgWrap = style({
  display: "flex",
  justifyContent: "start",
  flexDirection: "column",
  marginRight: "16px",
});

export const img = style({
  width: "200px",
  height: "250px",
  borderRadius: "8px",
  backgroundColor: "#dedede",
  marginBottom: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const profile = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "end",
});

export const profileContent = style({
  display: "flex",
  flexDirection: "column",
});

export const label = style({
  fontSize: "14px",
  marginBottom: "4px",
});

export const input = style({
  padding: "8px",
  boxSizing: "border-box",
  width: "500px",
  marginBottom: "8px",
  outline: "none",
  border: "1px solid #DEDEDE",
  borderRadius: "8px",
});

export const imgBtn = style({
  padding: "16px",
  backgroundColor: "#F03167",
  outline: "none",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#FF779F",
  },
});

export const btnWrap = style({
  width: "100%",
  display: "flex",
  justifyContent: "end",
});

export const modifyBtn = style({
  padding: "16px",
  backgroundColor: "#F03167",
  outline: "none",
  border: "none",
  borderRadius: "6px",
  color: "white",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#FF779F",
  },
});
