const fs = require('fs');
const path = require('path');
const Days = require('./days');

const Bundled = {
  events() {
    if (!this._events) {
      this._events = this._loadEvents();
    }
    return this._events;
  },

  _loadEvents() {
    var dataDirectory = path.resolve(__dirname, '../data');
    return this.loadEventsFromDir(dataDirectory);
  },

  loadEventsFromDir(dir) {
    let files = fs.readdirSync(dir);
    files = files.filter((file) => file !== "index.json");
    const eventsOfYears = files.map((file) => {
      const elements = JSON.parse(fs.readFileSync(path.resolve(dir, file), 'utf8'));
      return elements.map((ele) => new Days(ele.name, ele.range, ele.type));
    });

    let events = [];
    eventsOfYears.forEach((eventsOfYear) => {
      events = events.concat(eventsOfYear);
    });

    return events;
  },
};

module.exports = Bundled;
