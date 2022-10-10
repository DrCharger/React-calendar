import React from "react";
import Hour from "../hour/Hour";

import "./day.scss";

const Day = ({ dataDay, dayEvents, onDelete, onOpen, openSmallModal }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        //getting all events from the day we will render
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

export default Day;
