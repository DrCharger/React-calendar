import React from "react";
import { getDisplayedMonth } from "../../utils/dateUtils";
import Spinner from "../../Spinner";
import PropTypes from "prop-types";

import "./header.scss";

const Header = ({ onOpen, prev, next, today, day, update }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onOpen}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={today}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={prev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={next}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(day)}
        </span>
      </div>
      {update && <Spinner size={30} />}
    </header>
  );
};

Header.propTypes = {
  onOpen: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  today: PropTypes.func.isRequired,
  day: PropTypes.object,
  update: PropTypes.bool,
};

Header.defaultProps = {
  day: new Date(),
  update: true,
};

export default Header;
