const moment = require('moment');

function Book(events) {
  this._events = events;
}

Book.prototype.all = function () {
  return this.events().filter((event) => event.isHoliday());
};

Book.prototype.isHoliday = function (date) {
  const event = this.event(date);

  if (!event) {
    return this.isWeekend(date);
  }

  return event.isHoliday();
};

Book.prototype.isWorkingday = function (date) {
  const event = this.event(date);

  if (!event) {
    return !this.isWeekend(date);
  }

  return event.isWorkingday();
};

Book.prototype.events = function () {
  return this._events;
};

Book.prototype.event = function (date) {
  return this.book()[this._key(date)];
};

Book.prototype.book = function () {
  if (!this._book) {
    const self = this;
    self._book = {};

    self.events().forEach((event) => {
      event.days().forEach((date) => {
        self._book[self._key(date)] = event;
      });
    });
  }

  return this._book;
};

Book.prototype.isWeekend = function (date) {
  const day = moment(date).day()
  return day === 6 || day === 0;
};

Book.prototype._key = function (date) {
  return moment(date).format('YYYY-MM-DD');
};

module.exports = Book;
