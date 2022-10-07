import React, { useState } from "react";
import PopUp from "../popup/PopUp";

import "./event.scss";

const Event = ({ id, height, marginTop, title, time, onDelete }) => {
  const [isPopUpOpened, setOpened] = useState(false);
  const eventStyle = {
    height,
    marginTop,
  };

  const showPopUp = () => {
    setOpened(!isPopUpOpened);
  };

  return (
    <div style={eventStyle} className="event" onClick={() => showPopUp()}>
      {" "}
      {isPopUpOpened && <PopUp onDelete={onDelete} id={id} />}
      <div className="event__title">{title}</div>
      <div className="event__time">{time}</div>
    </div>
  );
};

export default Event;
