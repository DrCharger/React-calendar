import React from "react";
import { days } from "../../utils/dateUtils.js";
import moment from "moment/moment.js";
import classNames from "classnames";

const DayList = ({ dayDate }) => {
  const whatDay =
    moment(dayDate).format("MMM Do YY") ===
    moment(new Date()).format("MMM Do YY");
  return (
    <div className="calendar__day-label day-label">
      <span
        className={classNames("day-label__day-name", { "today-day": whatDay })}
      >
        {days[dayDate.getDay()]}
      </span>
      {whatDay ? (
        <div className="today">
          <span className="day-label__day-number">{dayDate.getDate()}</span>
        </div>
      ) : (
        <span className="day-label__day-number">{dayDate.getDate()}</span>
      )}
    </div>
  );
};

export default DayList;
