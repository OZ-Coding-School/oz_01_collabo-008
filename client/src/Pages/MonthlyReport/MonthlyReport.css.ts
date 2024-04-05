import { style } from "@vanilla-extract/css";

export const box = style({
  height: "100%",
  width: "100%",
  padding: "48px",
  boxSizing: "border-box",
});
export const container = style({
  padding: "56px 72px",
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "16px",
  boxSizing: "border-box",
});
export const titleWrapper = style({
  flexDirection: "row",
});

export const headText = style({
  fontSize: "26px",
  fontWeight: "bold",
});

export const explainText = style({
  fontSize: "0.8rem",
  fontWeight: "500",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  marginRight: "24px",
  color: "#8E8E8E",
  marginTop: "10px",
  marginBottom: "5px",
});

export const resultTextBox = style({
  display: "flex",
  fontSize: "26px",
  fontWeight: "800",
  flexDirection: "column",
  paddingTop: "40px",
  paddingBottom: "56px",
  gap: "1rem",
});

//#region 파이차트
export const doughnutCharts = style({
  display: "flex",
  flexDirection: "row",
  gap: "8%",
  justifyContent: "space-between",
  width: "100%",
  maxHeight: "60%",
  paddingBottom: "64px",
});
export const largestExpPlaceBox = style({
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "32px",
  width: "43%",
  height: "100%",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",

  padding: "48px 60px",
});
export const largestExpCategoryBox = style({
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: "32px",
  width: "43%",
  height: "100%",

  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: "20px",

  padding: "48px 48px",
});

export const explainTitle = style({
  fontSize: "1rem",
  paddingBottom: "1rem",
});
export const expExpainText = style({
  fontSize: "1rem",
  fontWeight: "600",
  display: "flex",
  flexDirection: "column",
});
export const ranking = style({
  fontSize: "1rem",
  display: "flex",
});
export const list = style({
  listStyleType: "none",
  margin: "0",
  padding: "0",
});
export const li = style({
  marginTop: "15px",
});
export const doughnutChartBox = style({
  width: "40%",
  height: "40%",

  display: "flex",
  minWidth: "200px",
  minHeight: "200px",
});
export const doughnutChart = style({
  width: "100%",
  height: "100%",
});
//#endregion

//#region 바 차트
export const barChartBox = style({
  backgroundColor: "rgba(255,255,255,0.8)",
  border: "none",
  display: "flex",
  width: "100%",
  height: "48vh",
});
export const barChart = style({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
});
//#endregion
