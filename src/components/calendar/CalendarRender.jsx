import React from "react";
import Modal from "../modal/Modal";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import PropTypes from "prop-types";

const CalendarRender = (props) => {
  const {
    weekDates,
    events,
    open,
    onDelete,
    openChangeModal,
    isModalChangeOpened,
    openSmallModal,
  } = props;

  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            onDelete={onDelete}
            onOpen={openChangeModal}
            openSmallModal={openSmallModal}
          />
          {open && <Modal text="Create" {...props} />}
          {isModalChangeOpened && <Modal text="Update" {...props} />}
        </div>
      </div>
    </section>
  );
};

CalendarRender.propTypes = {
  onClose: PropTypes.func.isRequired,
  weekDates: PropTypes.array.isRequired,
  open: PropTypes.bool,
  readonly: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  openChangeModal: PropTypes.func.isRequired,
  openSmallModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  closeChangeModal: PropTypes.func.isRequired,
  onChangeModal: PropTypes.func.isRequired,
  events: PropTypes.array,
  isModalChangeOpened: PropTypes.bool,
};

CalendarRender.defaultProps = {
  open: false,
  readonly: false,
  isModalChangeOpened: false,
  events: [],
};

export default CalendarRender;
