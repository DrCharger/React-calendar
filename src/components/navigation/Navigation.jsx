import React from "react";
import DayList from "./DayList";
import "./navigation.scss";

const Navigation = ({ weekDates, start }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        console.log(dayDate);
        console.log(start);
        return (
          <DayList key={dayDate.getDate()} dayDate={dayDate} start={start} />
        );
      })}
    </header>
  );
};

export default Navigation;
