const moment = require('moment')

function Days(name, range, type) {
  this.name = name;
  this.range = range;
  this.type = type;
}

const rangeToDates = function (startDate, endDate) {
  const dates = [startDate.toDate()];
  const start = startDate.toDate();
  for (let i = 1; i < 100; i++) {
    const date = moment(start).add(i, 'days');
    if (date.isSame(endDate, 'day')) {
      dates.push(date.toDate());
      break;
    } else {
      dates.push(date.toDate());
    }
  }

  return dates;
};

Days.prototype.isHoliday = function () {
  return this.type === 'holiday';
};

Days.prototype.isWorkingday = function () {
  return this.type === 'workingday';
};

Days.prototype.days = function () {
  let startDate = null;
  startDate = moment(this.range[0]);
  if (this.range.length === 1) {
    return [startDate.toDate()];
  } else if (this.range.length === 2) {
    const endDate = moment(this.range[1]);
    return rangeToDates(startDate, endDate);
  }
};

module.exports = Days;
