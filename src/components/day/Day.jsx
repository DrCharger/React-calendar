import React, { useEffect, useState } from "react";
import Hour from "../hour/Hour";
import Redline from "../redline/Redline";
import "./day.scss";
import { timeNow } from "../../utils/manipulateTime";
import PropTypes from "prop-types";

const Day = ({ dataDay, dayEvents, onDelete, onOpen, openSmallModal }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const [redLine, setRedline] = useState(timeNow(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setRedline(timeNow(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {dataDay === new Date().getDate() && <Redline redline={redLine} />}
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => new Date(event.start).getHours() === hour
        );
        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            onDelete={onDelete}
            onOpen={onOpen}
            openSmallModal={openSmallModal}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  dataDay: PropTypes.number,
  dayEvents: PropTypes.array,
  openSmallModal: PropTypes.func.isRequired,
};

Hour.defaultProps = {
  dataDay: 5,
  dayEvents: [],
};

export default Day;
