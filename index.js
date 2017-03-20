var fs = require('fs');
var moment = require('moment');
var path = require('path');
var Days = require('./days');

var ChineseHolidays = {
  all: function() {
    return this.events().filter(function(event){
      return event.isHoliday();
    })
  },
  isHoliday: function(date) {
    var event = this.event(date);

    if(!event) {
      return this.isWeekend(date);
    }

    return event.isHoliday();
  },
  isWorkingday: function(date) {
    var event = this.event(date);

    if(!event) {
      return !this.isWeekend(date);
    }

    return event.isWorkingday();
  },

  events: function() {
    if (!this._events) {
      this._events = this._loadEvents();
    }
    return this._events;
  },

  event: function(date) {
    return this.book()[this._key(date)];
  },
  book: function() {
    if (!this._book) {
      var self = this;
      self._book = {};

      self.events().forEach(function(event) {
        event.days().forEach(function(date) {
          self._book[self._key(date)] = event;
        })
      })
    }

    return this._book;
  },
  isWeekend: function(date) {
    var day = moment(date).day()
    return day === 6 || day === 0;
  },
  _key: function(date){
    return moment(date).format('YYYY-MM-DD');
  },
  _loadEvents: function() {
    var dataDirectory = path.resolve(__dirname, './data');
    var files = fs.readdirSync(dataDirectory);
    var eventsOfYears = files.map(function(file) {
      var elements = JSON.parse(fs.readFileSync(path.resolve(dataDirectory, file), 'utf8'));
      return elements.map(function(ele) {
        return new Days(ele.name, ele.range, ele.type);
      })
    })

    var events = [];
    eventsOfYears.forEach(function(eventsOfYear) {
      events = events.concat(eventsOfYear);
    })

    return events;
  }
}


module.exports = ChineseHolidays;
