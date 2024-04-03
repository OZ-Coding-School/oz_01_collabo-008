import { style } from "@vanilla-extract/css";

export const sideBox = style({
  padding: "60px 48px",
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxSizing: "border-box",
  marginRight: "32px",
});

export const totalTextWrap = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  fontSize: "26px",
  fontWeight: "bold",
});

export const Budget = style({
  fontSize: "45px",
  color: "#F03167",
  marginTop: "10px",
});

export const wonText = style({
  fontSize: "16px",
  color: "#646464",
  fontWeight: "800",
  marginLeft: "8px",
});

export const spendingTextwrap = style({
  marginTop: "64px",
});

export const spendingText = style({
  marginLeft: "2px",
  color: "#F03167",
  fontWeight: "bold",
});

export const progress = style({
  width: "100%",
  height: "50px",
  backgroundColor: "#F03167",
  borderRadius: "200px",
  margin: "16px 0 126px",
  boxShadow: "3px 1px 10px rgba(240,49,103,0.16)",
});

export const fixedWrap = style({
  width: "100%",
  height: "400px",
  backgroundColor: "#FFF4F5",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxShadow: "0 3px 10px #FFDAE1",
  padding: "24px",
});

export const fixedText = style({
  fontSize: "28px",
  fontWeight: "bold",
});

export const list = style({
  width: "100%",
  height: "250px",
  overflow: "scroll",
  backgroundColor: "#fff",
  marginTop: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 4px #FFDAE1",
  padding: "16px",
  boxSizing: "border-box",
});

export const listItems = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  marginBottom: "16px",
});

export const listItem = style({
  fontWeight: 600,
  color: "#F03167",
});
