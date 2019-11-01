var ChineseHolidays = require('../src');
var Book = require('../src/book')
var Bundled = require('../src/bundled')

var should = require('should');

describe('ChineseHolidays', function() {
  it('ready', function() {
    ChineseHolidays.ready(function(book){
      (book).should.not.be.null()
    })

    ChineseHolidays.ready().then(function(book){
      (book).should.not.be.null()
    })
  })

  it('all', function() {
    ChineseHolidays.ready(function(book){
      book.all();
    })
  })

  it('isHoliday', function() {
    ChineseHolidays.ready(function(book){
      should.equal(book.isHoliday(new Date(2016, 0, 1)), true);
      should.equal(book.isHoliday(new Date(2016, 0, 5)), false);
    })
  })

  it('isWorkingday', function() {
    ChineseHolidays.ready(function(book){
      should.equal(book.isWorkingday(new Date(2016, 0, 1)), false);
      should.equal(book.isWorkingday(new Date(2016, 0, 5)), true);
    })
  })

  it('events', function() {
    ChineseHolidays.ready(function(book){
      book.events();
    })
  })
})
