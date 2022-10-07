import React, { Component } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import events from "../../gateway/events";

import "./calendar.scss";
import Modal from "../modal/Modal";
import moment from "moment/moment";

const formatInvalidTime = (date, start) =>
  moment([date, start].join(" "), moment.defaultFormat).toDate();

class Calendar extends Component {
  state = {
    events,
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const fromTime = formatInvalidTime(this.state.date, this.state.startTime);
    const endTime = formatInvalidTime(this.state.date, this.state.endTime);
    this.setState({
      events: [
        ...this.state.events,
        {
          id: Math.random(),
          title: this.state.title,
          description: this.state.description,
          dateFrom: fromTime,
          dateTo: endTime,
        },
      ],
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
    this.props.onClose();
  };

  render() {
    const { weekDates, open, onClose } = this.props;

    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week weekDates={weekDates} events={this.state.events} />
            {open && (
              <Modal
                close={onClose}
                handleChange={this.handleChange}
                onSubmit={this.onSubmit}
                {...this.state}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
