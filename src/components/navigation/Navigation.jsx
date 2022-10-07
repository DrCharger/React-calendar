import React from "react";
import DayList from "./DayList";
import "./navigation.scss";

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        return <DayList key={dayDate.getDate()} dayDate={dayDate} />;
      })}
    </header>
  );
};

export default Navigation;
