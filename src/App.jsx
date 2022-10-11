import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import "./common.scss";
import { add, subtract } from "./utils/manipulateTime.js";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [update, toggleUpdate] = useState(true);

  const handleOpen = () => setIsModalOpened(true);
  const handleClose = () => {
    setIsModalOpened(false);
    setReadonly(false);
  };
  const onReadonly = () => setReadonly(true);
  const prevWeek = () =>
    setWeekStartDate(new Date(`${subtract(weekStartDate)}`));

  const nextWeek = () => setWeekStartDate(new Date(`${add(weekStartDate)}`));

  const thisWeek = () => setWeekStartDate(new Date());
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <>
      <Header
        onOpen={handleOpen}
        prev={prevWeek}
        next={nextWeek}
        today={thisWeek}
        day={weekStartDate}
        update={update}
      />
      <Calendar
        weekDates={weekDates}
        open={isModalOpened}
        onClose={handleClose}
        onOpen={handleOpen}
        readonly={readonly}
        onReadonly={onReadonly}
        toggleUpdate={toggleUpdate}
      />
    </>
  );
};

export default App;
