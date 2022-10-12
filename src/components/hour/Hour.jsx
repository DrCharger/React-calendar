import React from "react";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";
import PropTypes from "prop-types";

const Hour = ({ dataHour, hourEvents, onDelete, onOpen, openSmallModal }) => {
  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={openSmallModal}
    >
      {hourEvents.map(({ id, start, end, title, description }) => {
        const eventStart = `${new Date(start).getHours()}:${formatMins(
          new Date(start).getMinutes()
        )}`;
        const eventEnd = `${new Date(end).getHours()}:${formatMins(
          new Date(end).getMinutes()
        )}`;

        return (
          <Event
            key={id}
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
            description={description}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  dataHour: PropTypes.number,
  hourEvents: PropTypes.array,
  openSmallModal: PropTypes.func.isRequired,
};

Hour.defaultProps = {
  dataHour: 5,
  hourEvents: [],
};

export default Hour;
