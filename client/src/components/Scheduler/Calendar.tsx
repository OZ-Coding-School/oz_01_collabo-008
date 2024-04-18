import { Box } from "@mui/material";
import "@radix-ui/themes/styles.css";
import moment from "moment";
import { useEffect, useState } from "react";

import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import { useCookies } from "react-cookie";
import instance from "../../api/axios";
import expenseRequest from "../../api/expenseRequest";
import { wrap } from "./Calendar.css";
import './calendarStyle.css';

const CalendarList = () => {
  interface Expenses {
    id: number;
    content: string;
    price: number;
    date: string;
  }
  const [date, setDate] = useState(new Date());
  const [expenses, setExpenses] = useState<Expenses[]>([]);
  const [chosenExpenses, setChosenExpenses] = useState<Expenses[]>([]);
  // const [memberId] = useState(localStorage.getItem("memberId"));
  const [cookies] = useCookies(["accessToken", "refreshToken"]);

  useEffect(() => {
    // if (!memberId) return;
    const fetchData = async () => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; //월은 1 더해야함
      try {
        const response = await instance.get(
          expenseRequest.expense + `?year=${year}&month=${month}`
        );
        setExpenses(response.data.expenses_list);
      } catch (error) {
        console.error("Error fetching Expense data:", error);
      }
    };

    fetchData();
  }, [cookies.accessToken, date]); //memberId,

  useEffect(() => {
    const chosen = expenses.filter((expense) =>
      moment(expense.date).isSame(date, "month")
    );
    setChosenExpenses(chosen);
    console.log(chosen);
  }, [expenses, date]);

  // React-Calendar 컴포넌트에서 onActiveStartDateChange 이벤트 핸들러로 사용함
  // 캘린더에서 다른 뷰로 전환할 때 발생.
  const handleActiveStartDateChange = ({
    activeStartDate,
    view,
  }: {
    activeStartDate: Date;
    view: "year" | "month" | "decade" | "century";
  }) => {
    if (view === "month" && activeStartDate !== null) {
      setDate(activeStartDate);
    }
  };

  const onChange = (newDate: Date) => {
    setDate(newDate);
  };

  return (
    <div className={wrap}>
      <Calendar
        onChange={(newDate: Date) => onChange(newDate)}
        onActiveStartDateChange={(data: {
          activeStartDate: Date | null;
          view: string;
        }) => handleActiveStartDateChange(data)}
        value={date}
        calendarType="gregory"
        formatDay={(_locale, date) => moment(date).format("D")}
        tileContent={({ date, view }) =>
          view === "month" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "0.3rem",
                textAlign: "left",
                color: "black",
              }}
            >
              {chosenExpenses
                .filter((expense) => moment(expense.date).isSame(date, "day"))
                .map((expense) => (
                  <Box key={expense.id}>
                    <span>
                      {expense.content.slice(0, 3)} {expense.price}
                    </span>
                  </Box>
                ))}
            </Box>
          )
        }
      />
    </div>
  );
};

export default CalendarList;
