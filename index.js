var _isFunction = require( "lodash/isFunction" )
var moment = require('moment');
var path = require('path');
var Book = require('./book')
var Bundled = require('./bundled')
var Cache = require('./cache')

// TODO: checkUpdateInterval 检查更新周期

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


var ChineseHolidays = {
  // ready([opt], [cb])
  ready: function(cb) {
    // if (arguments.legnth > 0 && _isFunction(arguments[arguments.length -1])){
    //   // callback way
    // } else {
    // }

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