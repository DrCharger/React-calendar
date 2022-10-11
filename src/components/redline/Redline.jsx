import React from "react";
import PropTypes from "prop-types";

const Redline = ({ redline }) => {
  return (
    <div className="red-line" style={{ top: redline }}>
      <div className="red-line__circle"></div>
      <div className="red-line__line"></div>
    </div>
  );
};

Redline.propTypes = {
  redline: PropTypes.number,
};
Redline.defaultProps = {
  redline: 0,
};
export default Redline;
