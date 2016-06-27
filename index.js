var fs = require('fs');
var Days = require('./days');

var loadEvents = function() {
  var files = fs.readdirSync('./data');
  var eventsOfYears = files.map(function(file) {
    var elements = JSON.parse(fs.readFileSync('./data/' + file, 'utf8'));
    return elements.map(function(ele) {
      return new Days(ele.name, ele.range, ele.type);
    })
  })

  var events = [];
  eventsOfYears.forEach(function(eventsOfYear){
    events = events.concat(eventsOfYear);
  })

  return events;
}



var ChineseHolidays = {
  isHoliday: function(date) {
    // TODO:
  },
  isWorkingday: function(date) {
    // TODO:
  },
  _loadEvents: loadEvents
}


module.exports = ChineseHolidays;
