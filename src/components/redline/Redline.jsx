import React from "react";

const Redline = ({ redline }) => {
  return (
    <div className="red-line" style={{ top: redline }}>
      <div className="red-line__circle"></div>
      <div className="red-line__line"></div>
    </div>
  );
};
export default Redline;
