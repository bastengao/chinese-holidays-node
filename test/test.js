var ChineseHolidays = require('../');

var should = require('should');

describe('ChineseHolidays', function() {
  it('all', function() {
    console.log(ChineseHolidays.all());
  })

  it('isHoliday', function() {
    should.equal(ChineseHolidays.isHoliday(new Date(2016, 0, 1)), true);
    should.equal(ChineseHolidays.isHoliday(new Date(2016, 0, 5)), false);
  })

  it('isWorkingday', function() {
    should.equal(ChineseHolidays.isWorkingday(new Date(2016, 0, 1)), false);
    should.equal(ChineseHolidays.isWorkingday(new Date(2016, 0, 5)), true);
  })

  it('events', function() {
    ChineseHolidays.events();
  })

  it('book', function() {
    ChineseHolidays.book();
  })

  it('loadEvents', function() {
    should.equal(ChineseHolidays._loadEvents().length, 12)

    days = ChineseHolidays._loadEvents()[0].days()
    should.equal(days.length, 3);
    should(days[0]).be.a.Date();
  })
})
