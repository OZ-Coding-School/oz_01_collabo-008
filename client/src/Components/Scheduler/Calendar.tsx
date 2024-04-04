
import '@radix-ui/themes/styles.css';
import moment from "moment";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { wrap } from "./Calendar.css";

const CalendarList = () => {
  const [date, setDate] = useState<Date>(new Date());

  const onChange = () => {
    setDate(date);
  }



  return (
    <div className={wrap}>
      <Calendar
        onChange={onChange}
        value={date}
        calendarType="gregory"
        formatDay={(_locale, date) => moment(date).format("D")}
      />
    </div>
  );
}

export default CalendarList;
