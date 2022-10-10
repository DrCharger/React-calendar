import React from "react";
import "./popup.scss";

const PopUp = ({ onDelete, id, onOpen }) => {
  return (
    <div className="popup-container">
      <button className="popup-container__btn" onClick={() => onOpen(id)}>
        Change
      </button>
      <button className="popup-container__btn" onClick={() => onDelete(id)}>
        Delete event
      </button>
    </div>
  );
};

export default PopUp;
