import React, { Component } from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import Spinner from "../../Spinner";
import {
  createTasks,
  deleteTask,
  fetchTasksList,
  updateTasks,
} from "../../gateway/tasksGateWays";

import "./calendar.scss";
import Modal from "../modal/Modal";
import moment from "moment/moment";
import { crossTasks, validation } from "../../utils/Validation";

const formatInvalidTimeWithDate = (date, time) => {
  let possibleTime;
  if (time.split(":")[1] % 15 === 0) {
    possibleTime = time;
  } else {
    possibleTime =
      time.split(":")[0] +
      ":" +
      (time.split(":")[1] - (time.split(":")[1] % 15));
  }

  return moment([date, possibleTime].join(" "), moment.defaultFormat).toDate();
};

const formatTime = (date) => moment(date).format("HH:mm");
const formatDate = (date) => moment(date).format("YYYY-MM-DD");
const formatInvalidTime = (time) => moment(time, "HH:mm").format("HH:mm");

class Calendar extends Component {
  state = {
    events: [],
    update: false,
    title: "",
    date: `${formatDate(new Date())}`,
    startTime: formatTime(new Date()),
    endTime: formatTime(new Date()),
    description: "",
    openModal: false,
    openChangeModal: false,
    id: null,
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
  openChangeModal = (id) => {
    const { title, description, end, start } = this.state.events.find(
      (event) => event.id === id
    );
    this.setState({
      openChangeModal: true,
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
      openChangeModal: false,
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
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
  onSubmit = (event) => {
    event.preventDefault();
    const { date, startTime, endTime, events } = this.state;
    if (validation(startTime, endTime)) {
      if (crossTasks(events, date, startTime, endTime)) {
        alert("Час був змінений кратно 15 хвилинам");
        this.setState({
          update: true,
          readonly: false,
        });
        const fromTime = formatInvalidTimeWithDate(
          this.state.date,
          this.state.startTime
        );
        const toTime = formatInvalidTimeWithDate(
          this.state.date,
          this.state.endTime
        );
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
    this.setState({
      update: true,
    });

    const fromTime = formatInvalidTimeWithDate(
      this.state.date,
      this.state.startTime
    );
    const endTime = formatInvalidTimeWithDate(
      this.state.date,
      this.state.endTime
    );
    updateTasks(this.state.id, {
      title: this.state.title,
      description: this.state.description,
      start: fromTime,
      end: endTime,
    }).then(() => this.fetchTask());
    this.closeChangeModal();
  };

  onDelete = (id) => {
    this.setState({
      update: true,
    });
    deleteTask(id).then(() => this.fetchTask());
  };

  onModalClose = () => {
    this.setState({
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    });
    this.props.onClose();
  };

  render() {
    const { weekDates, open, readonly } = this.props;
    const { events, update, openChangeModal } = this.state;

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
              onOpen={this.openChangeModal}
              openSmallModal={this.openSmallModal}
            />
            {open && (
              <Modal
                close={this.onModalClose}
                handleInputChange={this.handleInputChange}
                onSubmit={this.onSubmit}
                text="Create"
                readonly={readonly}
                {...this.state}
              />
            )}
            {openChangeModal && (
              <Modal
                close={this.closeChangeModal}
                handleInputChange={this.handleInputChange}
                onSubmit={this.onChangeModal}
                text="Update"
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
