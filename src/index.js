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

    if (_isFunction(cb)) {
      Cache.events().then((events) => {
        cb(new Book(events), null);
      }).catch((err) => {
        cb(new Book(Bundled.events()), null);
      });
    } else {
      return new Promise((resolve, reject) => {
        Cache.events().then((events) => {
          resolve(new Book(events));
        }).catch((err) => {
          resolve(new Book(Bundled.events()));
        });
      });
    }
  },
};

module.exports = ChineseHolidays;
