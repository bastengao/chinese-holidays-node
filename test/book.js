var should = require('should');

var Book = require('../book')

describe('books', function() {
  it('events', function() {
    var book = new Book()
    book.events();
  })

  it('book', function() {
    var book = new Book()
    book.book();
  })
})