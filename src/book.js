const moment = require('moment');

class Book {
  constructor(events) {
    this._events = events;
  }

  all() {
    return this.events().filter((event) => event.isHoliday());
  }

  isHoliday(date) {
    const event = this.event(date);

    if (!event) {
      return Book.isWeekend(date);
    }

    return event.isHoliday();
  }

  isWorkingday(date) {
    const event = this.event(date);

    if (!event) {
      return !Book.isWeekend(date);
    }

    return event.isWorkingday();
  }

  events() {
    return this._events;
  }

  event(date) {
    return this.book()[Book.key(date)];
  }

  book() {
    if (!this._book) {
      const self = this;
      self._book = {};

      self.events().forEach((event) => {
        event.days().forEach((date) => {
          self._book[Book.key(date)] = event;
        });
      });
    }

    return this._book;
  }

  static isWeekend(date) {
    const day = moment(date).day();
    return day === 6 || day === 0;
  }

  static key(date) {
    return moment(date).format('YYYY-MM-DD');
  }
}


module.exports = Book;
