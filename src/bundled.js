const fs = require('fs');
const path = require('path');
const Days = require('./days');

const Bundled = {
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
    let files = fs.readdirSync(dir);
    files = files.filter(function(file) {
      return file != "index.json"
    })
    const eventsOfYears = files.map(function (file) {
      const elements = JSON.parse(fs.readFileSync(path.resolve(dir, file), 'utf8'));
      return elements.map(function (ele) {
        return new Days(ele.name, ele.range, ele.type);
      })
    })

    let events = [];
    eventsOfYears.forEach(function (eventsOfYear) {
      events = events.concat(eventsOfYear);
    })

    return events;
  }
}

module.exports = Bundled;
