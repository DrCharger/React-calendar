import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  createTasks,
  deleteTask,
  fetchTasksList,
  updateTasks,
} from "../../gateway/tasksGateWays";
import {
  TimeWithDate,
  formatDate,
  formatInvalidTime,
  formatTime,
} from "../../utils/manipulateTime";
import { crossTasks, validation } from "../../utils/Validation";
import "./calendar.scss";
import CalendarRender from "./CalendarRender";

class Calendar extends Component {
  state = {
    events: [],
    title: "",
    date: formatDate(new Date()),
    startTime: formatTime(new Date()),
    endTime: formatTime(new Date()),
    description: "",
    openModal: false,
    isModalChangeOpened: false,
    id: null,
  };
  componentDidMount() {
    this.fetchTask();
  }

  fetchTask = () => {
    fetchTasksList().then((data) => {
      this.setState({
        events: data,
      });
      this.props.toggleUpdate(false);
    });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { date, startTime, endTime, events } = this.state;
    if (validation(startTime, endTime)) {
      if (crossTasks(events, date, startTime, endTime)) {
        alert("Час був змінений кратно 15 хвилинам");
        this.props.toggleUpdate(true);
        this.setState({
          readonly: false,
        });
        const fromTime = TimeWithDate(this.state.date, this.state.startTime);
        const toTime = TimeWithDate(this.state.date, this.state.endTime);
        createTasks({
          title: this.state.title,
          description: this.state.description,
          start: fromTime,
          end: toTime,
        }).then(() => this.fetchTask());
        this.onModalClose();
      } else {
        return this.setState({
          endTime: "",
          startTime: "",
        });
      }
    } else {
      return this.setState({
        endTime: "",
      });
    }
  };
  onChangeModal = (event) => {
    event.preventDefault();
    this.props.toggleUpdate(true);
    updateTasks(this.state.id, {
      title: this.state.title,
      description: this.state.description,
      start: this.fromTime,
      end: this.toTime,
    }).then(() => this.fetchTask());
    this.closeChangeModal();
  };

  onDelete = (id) => {
    this.props.toggleUpdate(true);
    deleteTask(id).then(() => this.fetchTask());
  };

  openChangeModal = (id) => {
    const { title, description, end, start } = this.state.events.find(
      (event) => event.id === id
    );
    this.setState({
      isModalChangeOpened: true,
      id,
      title,
      description,
      endTime: formatTime(end),
      startTime: formatTime(start),
      date: formatDate(start),
    });
  };

  closeChangeModal = () => {
    this.setState({
      isModalChangeOpened: false,
    });
    this.onModalClose();
  };
  openSmallModal = (event) => {
    if (event.target.hasChildNodes()) {
      return null;
    }

    const smallModalDate = new Date(
      new Date().setDate(event.target.closest(".calendar__day").dataset.day)
    );
    this.setState({
      endTime: formatInvalidTime(`${+event.target.dataset.time}:00`),
      startTime: formatInvalidTime(`${+event.target.dataset.time - 1}:00`),
      date: formatDate(smallModalDate),
    });
    this.props.onReadonly();
    this.props.onOpen();
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  onModalClose = () => {
    this.setState({
      title: "",
      date: formatDate(new Date()),
      startTime: formatTime(new Date()),
      endTime: formatTime(new Date()),
      description: "",
    });
    this.props.onClose();
  };

  render() {
    return (
      <CalendarRender
        onClose={this.onModalClose}
        weekDates={this.props.weekDates}
        open={this.props.open}
        readonly={this.props.readonly}
        onDelete={this.onDelete}
        openChangeModal={this.openChangeModal}
        openSmallModal={this.openSmallModal}
        onSubmit={this.onSubmit}
        handleInputChange={this.handleInputChange}
        closeChangeModal={this.closeChangeModal}
        onChangeModal={this.onChangeModal}
        {...this.state}
      />
    );
  }
}

Calendar.propTypes = {
  weekDates: PropTypes.array.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
  onReadonly: PropTypes.func.isRequired,
  toggleUpdate: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  open: false,
  readonly: false,
};

export default Calendar;
