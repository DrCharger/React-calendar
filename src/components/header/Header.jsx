import React from "react";
import { getDisplayedMonth } from "../../utils/dateUtils";

import "./header.scss";

const Header = ({ onOpen, prev, next, today, day }) => {
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
    </header>
  );
};

export default Header;
