const should = require('should');

const Days = require('../lib/days')
const Book = require('../lib/book')

const data = [
  { "name": "元旦", "range": ["2018-12-29"], "type":"workingday" },
  { "name": "元旦", "range": ["2018-12-30", "2019-01-01"], "type":"holiday" }
]
const events = data.map(function(ele) {
  return new Days(ele.name, ele.range, ele.type)
})

describe('books', function() {
  it('events', function() {
    const book = new Book(events)
    should.equal(book.events().length, 2)
  })

  it('all', function() {
    const book = new Book(events)
    const all = book.all()
    should.equal(all.length, 1)
    should.equal(all[0], events[1])
  })

  it('book', function() {
    const book = new Book(events)
    book.book().should.not.be.null()
  })

  it('event', function() {
    const book = new Book(events)
    let event = book.event("2018-12-29")
    should.equal(event, events[0])

    event = book.event("2019-01-01")
    should.equal(event, events[1])
  })

  it('isWorkingday', function() {
    const book = new Book(events)
    should.equal(book.isWorkingday("2018-12-29"), true)
    should.equal(book.isWorkingday("2018-12-30"), false)
  })

  it('isHoliday', function() {
    const book = new Book(events)
    should.equal(book.isHoliday("2018-12-29"), false)
    should.equal(book.isHoliday("2018-12-30"), true)
  })

  it('isWeekend', function() {
    const book = new Book(events)
    should.equal(book.isWeekend("2018-12-29"), true)
    should.equal(book.isWeekend("2018-12-30"), true)
    should.equal(book.isWeekend("2018-12-31"), false)
  })
})