import React, { Component } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import moment from "moment/moment.js";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

class App extends Component {
  state = {
    weekStartDate: new Date(),
    openModal: false,
  };

  handleOpen = () => {
    this.setState({
      openModal: true,
    });
  };
  handleClose = () => {
    this.setState({
      openModal: false,
    });
  };
  weekPrevious = () => {
    const prevDate = moment(this.state.weekStartDate)
      .subtract(7, "days")
      .format();
    this.setState({
      weekStartDate: new Date(`${prevDate}`),
    });
  };
  weekNext = () => {
    const nextDate = moment(this.state.weekStartDate).add(7, "days").format();
    this.setState({
      weekStartDate: new Date(`${nextDate}`),
    });
  };
  thisWeek = () => {
    this.setState({
      weekStartDate: new Date(),
    });
  };

  render() {
    const { weekStartDate, openModal } = this.state;
    const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

    return (
      <>
        <Header
          onOpen={this.handleOpen}
          prev={this.weekPrevious}
          next={this.weekNext}
          today={this.thisWeek}
          day={weekStartDate}
        />
        <Calendar
          weekDates={weekDates}
          open={openModal}
          onClose={this.handleClose}
        />
      </>
    );
  }
}

export default App;
