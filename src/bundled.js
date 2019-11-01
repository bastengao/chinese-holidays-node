var fs = require('fs');
var path = require('path');
var Days = require('./days');

var Bundled = {
  events: function () {
    if (!this._events) {
      this._events = this._loadEvents();
    }
    return this._events;
  },

  _loadEvents: function () {
    var dataDirectory = path.resolve(__dirname, '../data');
    return this.loadEventsFromDir(dataDirectory)
  },

  loadEventsFromDir: function(dir) {
    var files = fs.readdirSync(dir);
    files = files.filter(function(file) {
      return file != "index.json"
    })
    var eventsOfYears = files.map(function (file) {
      var elements = JSON.parse(fs.readFileSync(path.resolve(dir, file), 'utf8'));
      return elements.map(function (ele) {
        return new Days(ele.name, ele.range, ele.type);
      })
    })

    var events = [];
    eventsOfYears.forEach(function (eventsOfYear) {
      events = events.concat(eventsOfYear);
    })

    return events;
  }
}

module.exports = Bundled
