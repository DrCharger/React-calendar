import React from "react";
import DateNav from "./DateNav";
import "./navigation.scss";

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        return <DateNav key={dayDate.getDate()} dayDate={dayDate} />;
      })}
    </header>
  );
};

export default Navigation;
