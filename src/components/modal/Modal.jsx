import React from "react";
import "./modal.scss";

const Modal = (props) => {
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    handleInputChange,
    onClose,
    onSubmit,
    readonly,
    text,
    open,
    closeChangeModal,
  } = props;

  let btn;
  if (open) {
    btn = (
      <button className="create-event__close-btn" onClick={onClose}>
        +
      </button>
    );
  } else {
    btn = (
      <button className="create-event__close-btn" onClick={closeChangeModal}>
        +
      </button>
    );
  }

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          {btn}
          <form className="event-form" onSubmit={onSubmit}>
            <input
              value={title}
              onChange={handleInputChange}
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              required
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={date}
                onChange={handleInputChange}
                readOnly={readonly}
                required
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={startTime}
                onChange={handleInputChange}
                readOnly={readonly}
                required
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={endTime}
                onChange={handleInputChange}
                readOnly={readonly}
                required
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
};

export default Modal;
