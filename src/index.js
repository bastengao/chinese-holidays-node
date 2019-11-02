import _isFunction from 'lodash/isFunction';

import Book from './book';
import Bundled from './bundled';
import Cache from './cache';

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
