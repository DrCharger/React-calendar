import React from "react";

import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";

const Hour = ({ dataHour, hourEvents, onDelete, onOpen, openSmallModal }) => {
  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={openSmallModal}
    >
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, start, end, title }) => {
        const eventStart = `${new Date(start).getHours()}:${formatMins(
          new Date(start).getMinutes()
        )}`;
        const eventEnd = `${new Date(end).getHours()}:${formatMins(
          new Date(end).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={
              (new Date(end).getTime() - new Date(start).getTime()) /
              (1000 * 60)
            }
            marginTop={new Date(start).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            onDelete={onDelete}
            id={id}
            onOpen={onOpen}
          />
        );
      })}
    </div>
  );
};

export default Hour;
