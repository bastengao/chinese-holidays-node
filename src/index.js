import _isFunction from 'lodash/isFunction';
import util from 'util';

import Book from './book';
import Bundled from './bundled';
import Cache from './cache';

/*
ChineseHolidays.ready().then(function(book){
  book.isHoliday(date)
})

async function example() {
  var book = await ChineseHolidays.ready()
  book.isHoliday(date)
}

ChineseHolidays.ready(function(book){
  book.isHoliday(date)
})
*/


function invokeCallback(cb, book) {
  if (_isFunction(cb)) {
    const callbackFunc = util.deprecate(cb, 'ChineseHolidays.ready(callback) is deprecated, use ChineseHolidays.ready().then(callback) instead.', 'Deprecation API');
    callbackFunc(book, null);
  }
}


/**
 * @class ChineseHolidays
 * @hideconstructor
 */
class ChineseHolidays {
  /**
   * @typedef {Object} options
   * @property {boolean} [offline=false] whether to update data from remote
   */

  /**
   * @callback bookCallback
   * @param {Book} book
   */

  /**
   * load events from cache or bundled data
   * @param {(options | bookCallback)} options options or callback
   * @returns {Promise<Book>}
   */
  static ready(optionsOrCallback) {
    // priority: online data => offline data => bundled data
    return new Promise((resolve) => {
      const options = optionsOrCallback;
      if (options && options.offline) {
        const book = new Book(Bundled.events());
        resolve(book);
        return;
      }

      Cache.events().then((events) => {
        const book = new Book(events);
        resolve(book);
        invokeCallback(optionsOrCallback, book);
      }).catch(() => {
        const book = new Book(Bundled.events());
        resolve(book);
        invokeCallback(optionsOrCallback, book);
      });
    });
  }
}

module.exports = ChineseHolidays;
