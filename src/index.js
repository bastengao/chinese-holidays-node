const _isFunction = require('lodash/isFunction');
const Book = require('./book');
const Bundled = require('./bundled');
const Cache = require('./cache');

/*
ChineseHolidays.ready(function(book){
  book.isHoliday(date)
})

ChineseHolidays.ready().then(function(book){
  book.isHoliday(date)
})

async function example() {
  var book = await ChineseHolidays.ready()
  book.isHoliday(date)
}
*/


const ChineseHolidays = {
  ready(cb) {
    // priority: online data => offline data => bundled data
    return new Promise((resolve) => {
      Cache.events().then((events) => {
        const book = new Book(events);
        resolve(book);
        if (_isFunction(cb)) {
          cb(book, null);
        }
      }).catch(() => {
        const book = new Book(Bundled.events());
        resolve(book);
        if (_isFunction(cb)) {
          cb(book, null);
        }
      });
    });
  },
};

module.exports = ChineseHolidays;
