import { formatter, timeInNumber } from "./manipulateTime";

export const validation = (startTime, endTime) => {
  if (timeInNumber(endTime) < timeInNumber(startTime)) {
    alert("Не правильно заданий час! Будь-ласка перевірте");
    return false;
  }
  if (timeInNumber(endTime) - timeInNumber(startTime) > 360) {
    alert("Задача не може бути більш ніж шість годин");
    return false;
  }
  return true;
};

export const crossTasks = (events, date, startTime, endTime) => {
  const crossStart = timeInNumber(startTime);
  const crossEnd = timeInNumber(endTime);

  const eventsPerDay = events
    .filter((event) => formatter(event.start) === formatter(date))
    .map((elem) => {
      const from =
        new Date(elem.start).getHours() * 60 +
        new Date(elem.start).getMinutes();
      const to =
        new Date(elem.end).getHours() * 60 + new Date(elem.end).getMinutes();

      return Array.apply(null, Array(to - from + 1)).map((elem, index) => {
        return index + from;
      });
    });

  if (
    eventsPerDay.find((el) => el.includes(crossEnd) || el.includes(crossStart))
  ) {
    alert("Вибачте, але у вас задача в заданий час! Перевірте свій графік");
    return false;
  }
  return true;
};
