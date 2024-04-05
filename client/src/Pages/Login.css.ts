import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundImage: 'url("public/images/background.png")',
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const container2 = style({
  width: "1400px",
  height: "700px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const loginheader = style({
  marginBottom: "40px",
});

export const loginform = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

export const loginformLabel = style({
  marginBottom: "5px",
  fontSize: "12px",
  fontWeight: 600,
});

export const loginformInput = style({
  marginBottom: "10px",
  padding: "8px",
  width: "400px",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  boxShadow: "0px 1px 10px #dbdbdb7a",
  boxSizing: "border-box",
});

export const info = style({
  display: "inline",
});

export const footer = style({
  display: "flex",
  alignItems: "center",
  fontSize: "12px",
  fontWeight: 600,
});

export const loginbt = style({
  marginTop: "32px",
  marginBottom: "10px",
  padding: "10px",
  width: "400px",
  borderRadius: "8px",
  backgroundColor: "#f03167",
  border: "none",
  outline: "none",
  color: "white",
});

export const gosignup = style({
  color: "#f03167",
});