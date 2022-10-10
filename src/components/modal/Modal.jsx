import React, { Component } from "react";

import "./modal.scss";

class Modal extends Component {
  render() {
    const {
      title,
      date,
      startTime,
      endTime,
      description,
      handleInputChange,
      close,
      onSubmit,
      readonly,
      text,
    } = this.props;

    return (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event">
            <button className="create-event__close-btn" onClick={close}>
              +
            </button>
            <form className="event-form" onSubmit={onSubmit}>
              <input
                value={title}
                onChange={handleInputChange}
                type="text"
                name="title"
                placeholder="Title"
                className="event-form__field"
              />
              <div className="event-form__time">
                <input
                  type="date"
                  name="date"
                  className="event-form__field"
                  value={date}
                  onChange={handleInputChange}
                  readOnly={readonly}
                />
                <input
                  type="time"
                  name="startTime"
                  className="event-form__field"
                  value={startTime}
                  onChange={handleInputChange}
                  readOnly={readonly}
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  className="event-form__field"
                  value={endTime}
                  onChange={handleInputChange}
                  readOnly={readonly}
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                className="event-form__field"
                value={description}
                onChange={handleInputChange}
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                {text}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
