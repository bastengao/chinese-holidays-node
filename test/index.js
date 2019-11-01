const should = require('should');
const ChineseHolidays = require('../lib');

describe('ChineseHolidays', () => {
  it('ready', () => {
    ChineseHolidays.ready((book) => {
      (book).should.not.be.null();
    });

    ChineseHolidays.ready().then((book) => {
      (book).should.not.be.null();
    });
  });

  it('all', () => {
    ChineseHolidays.ready((book) => {
      book.all();
    });
  });

  it('isHoliday', () => {
    ChineseHolidays.ready((book) => {
      should.equal(book.isHoliday(new Date(2016, 0, 1)), true);
      should.equal(book.isHoliday(new Date(2016, 0, 5)), false);
    });
  });

  it('isWorkingday', () => {
    ChineseHolidays.ready((book) => {
      should.equal(book.isWorkingday(new Date(2016, 0, 1)), false);
      should.equal(book.isWorkingday(new Date(2016, 0, 5)), true);
    });
  });

  it('events', () => {
    ChineseHolidays.ready((book) => {
      book.events();
    });
  });
});
