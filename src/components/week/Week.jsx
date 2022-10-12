import React from 'react';
import Day from '../day/Day';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, onDelete, onOpen, openSmallModal }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        const dayEvents = events.filter(
          event => new Date(event.start) > dayStart && new Date(event.end) < dayEnd,
        );
        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            onDelete={onDelete}
            onOpen={onOpen}
            openSmallModal={openSmallModal}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  events: PropTypes.array,
  openSmallModal: PropTypes.func.isRequired,
};

Week.defaultProps = {
  events: [],
};

export default Week;
