const moment = require('moment-timezone');

moment.tz('Asia/Tokyo').locale('ja');

//
// constants
//

// the ISO day of the week with 1 being Monday and 7 being Sunday.
const Monday = 1;
const Tuesday = 2;
const Wednesday = 3;
const Thursday = 4;
const Friday = 5;
const Saturday = 6;
const Sunday = 7;

//
// formatter
//
function getMoment(date = new Date()) {
  return moment(date)
    .tz('Asia/Tokyo')
    .locale('ja');
}

function getWeekOfMonth(date) {
  return Math.ceil(date.date() / 7);
}

module.exports = {
  Monday: Monday,
  Tuesday: Tuesday,
  Wednesday: Wednesday,
  Thursday: Thursday,
  Friday: Friday,
  Saturday: Saturday,
  Sunday: Sunday,
  getMoment: getMoment,
  getWeekOfMonth: getWeekOfMonth,
};