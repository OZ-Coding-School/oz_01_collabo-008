import { style } from "@vanilla-extract/css";

export const container = style({
  backgroundImage: 'url("/images/background.png")',
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
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid rgba(0, 0, 0, 0.1)",
});

export const signupheader = style({
  marginBottom: "30px",
  fontSize: "30px",
  fontWeight: "600",
});

export const signupform = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  flexDirection: "column",
});

export const signupformLabel = style({
  marginBottom: "5px",
  fontSize: "12px",
  fontWeight: 600,
});

export const signupformInput = style({
  marginBottom: "8px",
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
  fontSize: "14px",
  fontWeight: 500,
});

export const signupbt = style({
  marginTop: "32px",
  marginBottom: "16px",
  padding: "10px",
  width: "400px",
  borderRadius: "8px",
  backgroundColor: "#f03167",
  border: "none",
  outline: "none",
  color: "white",
  cursor: "pointer",
});

export const gologin = style({
  color: "#f03167",
  cursor: "pointer",
  marginLeft: "4px",
});

export const passwordInputWrap = style({
  position: "relative",
});

export const pwToggleBtn = style({
  position: "absolute",
  top: "50%",
  right: "8px",
  transform: "translateY(-60%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  outline: "none",
});

export const error = style({
  fontSize: "14px",
  color: "red",
  marginBottom: "8px",
});
