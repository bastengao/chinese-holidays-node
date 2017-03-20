var moment = require('moment')

function Days(name, range, type) {
  this.name = name;
  this.range = range;
  this.type = type;
}

var rangeToDates = function(startDate, endDate) {
  var dates = [startDate.toDate()];
  var start = startDate.toDate();
  for(var i = 1; i < 100 ; i++) {
    var date = moment(start).add(i, 'days');
    if(date.isSame(endDate, 'day')) {
      dates.push(date.toDate());
      break;
    } else {
      dates.push(date.toDate());
    }
  }

  return dates;
};

Days.prototype.isHoliday = function() {
  return this.type === 'holiday';
}

Days.prototype.isWorkingday = function() {
  return this.type === 'workdingday';
}

Days.prototype.days = function() {
  var startDate = null;
  startDate = moment(this.range[0]);
  if(this.range.length === 1) {
    return [startDate.toDate()];
  } else if (this.range.length === 2) {
    endDate = moment(this.range[1]);
    return rangeToDates(startDate, endDate);
  }
}

module.exports = Days;
