import React, { Component } from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Spinner from "../../Spinner";
// import events from "../../gateway/events";
import {
  createTasks,
  deleteTask,
  fetchTasksList,
  updateTasks,
} from "../../gateway/tasksGateWays";

import "./calendar.scss";
import Modal from "../modal/Modal";
import moment from "moment/moment";

const formatInvalidTime = (date, start) =>
  moment([date, start].join(" "), moment.defaultFormat).toDate();

class Calendar extends Component {
  state = {
    events: [],
    update: false,
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
  };
  componentDidMount() {
    this.fetchTask();
  }

  fetchTask = () => {
    fetchTasksList().then((data) =>
      this.setState({
        events: data,
        update: false,
      })
    );
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      update: true,
    });
    const fromTime = formatInvalidTime(this.state.date, this.state.startTime);
    const endTime = formatInvalidTime(this.state.date, this.state.endTime);
    createTasks({
      title: this.state.title,
      description: this.state.description,
      start: fromTime,
      end: endTime,
    }).then(() => this.fetchTask());
    this.setState({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
    this.props.onClose();
  };

  onDelete = (id) => {
    this.setState({
      update: true,
    });
    deleteTask(id).then(() => this.fetchTask());
  };

  render() {
    const { weekDates, open, onClose } = this.props;
    const { events, update } = this.state;

    if (events.length === 0) {
      return <Spinner size={100} />;
    }
    return (
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar />
            <Week
              weekDates={weekDates}
              events={events}
              onDelete={this.onDelete}
            />
            {open && (
              <Modal
                close={onClose}
                handleChange={this.handleChange}
                onSubmit={this.onSubmit}
                {...this.state}
              />
            )}
            {update && <Spinner size={100} />}
          </div>
        </div>
      </section>
    );
  }
}

export default Calendar;
