import React from "react";
import "./popup.scss";
import PropTypes from "prop-types";

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

PopUp.propTypes = {
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
};

PopUp.defaultProps = {
  id: null,
};
export default PopUp;
