import moment from 'moment/moment.js';

export const subtract = date => moment(date).subtract(7, 'days').format();

export const add = date => moment(date).add(7, 'days').format();

export const formatter = date => moment(date).format('YYYY-mm-dd');

export const formatMonthYear = date => moment(date).format('MMM Do YY');

export const timeInNumber = time => +time.split(':')[0] * 60 + +time.split(':')[1];

export const timeNow = date => date.getHours() * 60 + date.getMinutes();

export const TimeWithDate = (date, time) => {
  let possibleTime;
  if (time.split(':')[1] % 15 === 0) {
    possibleTime = time;
  } else {
    possibleTime = time.split(':')[0] + ':' + (time.split(':')[1] - (time.split(':')[1] % 15));
  }

  return moment([date, possibleTime].join(' '), moment.defaultFormat).toDate();
};

export const formatTime = date => moment(date).format('HH:mm');
export const formatDate = date => moment(date).format('YYYY-MM-DD');
export const formatInvalidTime = time => moment(time, 'HH:mm').format('HH:mm');
