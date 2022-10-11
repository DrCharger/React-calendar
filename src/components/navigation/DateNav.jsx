import React from "react";
import { days } from "../../utils/dateUtils.js";
import classNames from "classnames";
import { formatMonthYear } from "../../utils/manipulateTime.js";

const DateNav = ({ dayDate }) => {
  const whatDay = formatMonthYear(dayDate) === formatMonthYear(new Date());
  return (
    <div className="calendar__day-label day-label">
      <span
        className={classNames("day-label__day-name", { "today-day": whatDay })}
      >
        {days[dayDate.getDay()]}
      </span>

      <span
        className={classNames("day-label__day-number", {
          "today-number": whatDay,
        })}
      >
        {dayDate.getDate()}
        {whatDay && <div className="today" />}
      </span>
    </div>
  );
};

export default DateNav;
