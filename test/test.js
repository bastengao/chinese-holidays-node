var ChinseHolidays = require('../');

var should = require('should');

describe('ChineseHolidays', function(){
  it('isHoliday', function(){
    ChinseHolidays.isHoliday(1);
  })

  it('isWorkingday', function(){
    ChinseHolidays.isWorkingday(1);
  })

  it('loadEvents', function(){
    should.equal(ChinseHolidays._loadEvents().length, 12)
    
    days = ChinseHolidays._loadEvents()[0].days()
    should.equal(days.length, 3);
    should(days[0]).be.a.Date();
  })
})
