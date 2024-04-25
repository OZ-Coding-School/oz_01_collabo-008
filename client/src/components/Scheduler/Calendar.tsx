import { Box } from "@mui/material";
import "@radix-ui/themes/styles.css";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import instance from "../../api/axios";
import expenseRequest from "../../api/expenseRequest";
import { wrap } from "./Calendar.css";
import "./calendarStyle.css";

interface ExpensesData {
  id: number;
  content: string;
  price: number;
  date: string;
}

const CalendarList = () => {
  const [date, setDate] = useState(new Date());
  const [year, setYear] = useState(date.getFullYear().toString());
  const [month, setMonth] = useState((date.getMonth() + 1).toString());
  const [chosenExpenses, setChosenExpenses] = useState<ExpensesData[]>([]);

  const {
    data: expensesData,
    isLoading: isExpensesDataLoading,
    error: expensesDataError,
  } = useQuery({
    queryKey: ["expenseData", year, month],
    queryFn: async () => {
      try {
        const response = await instance.get(
          expenseRequest.expense + `?year=${year}&month=${month}`
        );
        // console.log("Expenses Data:", response.data);

        return response.data.expenses_list;
      } catch (error) {
        throw new Error(`Expense Data fetching Error: ${error.message}`);
      }
    },
  });

  useEffect(() => {
    if (!expensesData) {
      console.error("Expenses Data does not exist");
      return;
    }

    const chosen = expensesData.filter((expense) =>
      moment(expense.date).isSame(date, "month")
    );
    setChosenExpenses(chosen);
  }, [expensesData, date]);

  // React-Calendar 컴포넌트에서 onActiveStartDateChange 이벤트 핸들러로 사용함
  // 캘린더에서 다른 뷰로 전환할 때 발생.
  const handleActiveStartDateChange = ({
    activeStartDate,
    view,
  }: {
    activeStartDate: Date;
    view: "year" | "month" | "decade" | "century";
  }) => {
    if (view === "month" && activeStartDate) {
      setDate(activeStartDate);
      setYear(activeStartDate.getFullYear().toString());
      setMonth((activeStartDate.getMonth() + 1).toString());
    }
  };

  const onChange = (newDate: Date) => {
    setDate(newDate);
  };

  if (isExpensesDataLoading) return <div>Expense Data is Loading...</div>;
  if (expensesDataError) return <div>Error: {expensesDataError.message}</div>;

  return (
    <div className={wrap}>
      <Calendar
        onChange={(newDate: Date) => onChange(newDate)}
        onActiveStartDateChange={(data: {
          activeStartDate: Date | null;
          view: string;
        }) => handleActiveStartDateChange(data)}
        value={date}
        calendarType='gregory'
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
