import React from 'react';
import DateNav from './DateNav';
import PropTypes from 'prop-types';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map(dayDate => {
        return <DateNav key={dayDate.getDate()} dayDate={dayDate} />;
      })}
    </header>
  );
};
Navigation.propTypes = {
  weekDates: PropTypes.array.isRequired,
};

export default Navigation;
