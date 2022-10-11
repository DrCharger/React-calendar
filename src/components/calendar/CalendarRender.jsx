import React from "react";
import Modal from "../modal/Modal";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";

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

export default CalendarRender;
