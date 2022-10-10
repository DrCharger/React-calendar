import moment from "moment";

const formatter = (date) => moment(date).format("YYYY-mm-dd");

export const validation = (startTime, endTime) => {
  let to = endTime.split(":")[0] * 60 + +endTime.split(":")[1];
  let from = startTime.split(":")[0] * 60 + +startTime.split(":")[1];
  if (to < from) {
    alert("Не правильно заданий час! Будь-ласка перевірте");
    return false;
  }
  if (to - from > 360) {
    alert("Задача не може бути більш ніж шість годин");
    return false;
  }
  return true;
};

export const crossTasks = (events, date, startTime, endTime) => {
  const eventsPerDay = events
    .filter((event) => {
      return formatter(event.start) === formatter(date);
    })
    .map((elem) => {
      const from =
        new Date(elem.start).getHours() * 60 +
        new Date(elem.start).getMinutes();
      const to =
        new Date(elem.end).getHours() * 60 + new Date(elem.end).getMinutes();
      let a = [];
      for (let i = from; i <= to; i++) {
        a.push(i);
      }

      return a;
    });

  let crossEnd = +endTime.split(":")[0] * 60 + +endTime.split(":")[1];
  let crossStart = +startTime.split(":")[0] * 60 + +startTime.split(":")[1];

  if (
    eventsPerDay.find((el) => el.includes(crossEnd) || el.includes(crossStart))
  ) {
    alert("Вибачте, але у вас задача в заданий час! Перевірте свій графік");
    return false;
  }

  return true;
};
