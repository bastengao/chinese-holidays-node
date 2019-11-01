const _isFunction = require( "lodash/isFunction" );
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
  ready: function(cb) {
    // priority: online data => offline data => bundled data

    if (_isFunction(cb)) {
      Cache.events().then(function(events){
        cb(new Book(events), null)
      }).catch(function(err) {
        cb(new Book(Bundled.events()), null)
      })
    } else {
      return new Promise(function(resolve, reject){
        Cache.events().then(function(events) {
          resolve(new Book(events))
        }).catch(function(err) {
          resolve(new Book(Bundled.events()))
        })
      });
    }
  }
}

module.exports = ChineseHolidays;
