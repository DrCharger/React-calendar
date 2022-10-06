import React from "react";
import { days } from "../../utils/dateUtils.js";
import classNames from "classnames";

const DayList = ({ dayDate, start }) => {
  let today;
  if (dayDate.getDate() === start.getDate()) {
    return (
      <div className="calendar__day-label day-label">
        <span className="day-label__day-name today-day">
          {days[dayDate.getDay()]}
        </span>
        <div className="today">
          <span className="day-label__day-number">{dayDate.getDate()}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="calendar__day-label day-label">
      <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
      <span className="day-label__day-number">{dayDate.getDate()}</span>
    </div>
  );
};
export default DayList;
