import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = props => {
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
  } = props;

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button className="create-event__close-btn" onClick={onClose}>
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

Modal.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  readonly: PropTypes.bool,
  text: PropTypes.string,
  open: PropTypes.bool,
  closeChangeModal: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: 'Test',
  description: 'Test description',
  readonly: false,
  text: 'Create',
  open: false,
  date: '2022-10-10',
  startTime: '2022-10-11T15:49:17.908Z',
  endTime: '2022-10-11T16:49:17.908Z',
};

export default Modal;
