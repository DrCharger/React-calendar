import React, { useState } from 'react';
import PopUp from '../popup/PopUp';
import './event.scss';
import PropTypes from 'prop-types';

const Event = ({ id, height, marginTop, title, time, onDelete, onOpen, description }) => {
  const [isPopUpOpened, setOpened] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  const showPopUp = () => {
    setOpened(!isPopUpOpened);
  };

  return (
    <>
      <div style={eventStyle} className="event" onClick={() => showPopUp()}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {isPopUpOpened && (
        <PopUp onDelete={onDelete} id={id} onOpen={onOpen} description={description} />
      )}
    </>
  );
};

Event.propTypes = {
  id: PropTypes.string,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string,
  time: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

Event.defaultProps = {
  id: null,
  title: 'Test',
  time: '00:00',
};

export default Event;
