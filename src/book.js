import moment from 'moment';

class Book {
  constructor(events) {
    this.eventsData = events;
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
    return this.eventsData;
  }

  event(date) {
    return this.book()[Book.key(date)];
  }

  book() {
    if (!this.bookData) {
      this.bookData = {};

      this.events().forEach((event) => {
        event.days().forEach((date) => {
          this.bookData[Book.key(date)] = event;
        });
      });
    }

    return this.bookData;
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
