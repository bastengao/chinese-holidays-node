import fs from 'fs';
import path from 'path';
import Days from './days';

const loadEventsFromDir = function loadEventsFromDir(dir) {
  let files = fs.readdirSync(dir);
  files = files.filter((file) => file !== 'index.json');
  const eventsOfYears = files.map((file) => {
    const elements = JSON.parse(fs.readFileSync(path.resolve(dir, file), 'utf8'));
    return elements.map((ele) => new Days(ele.name, ele.range, ele.type));
  });

  let events = [];
  eventsOfYears.forEach((eventsOfYear) => {
    events = events.concat(eventsOfYear);
  });

  return events;
};

const loadEvents = function loadEvents() {
  const dataDirectory = path.resolve(__dirname, '../data');
  return loadEventsFromDir(dataDirectory);
};

const Bundled = {
  events() {
    if (!this.eventsData) {
      this.eventsData = loadEvents();
    }
    return this.eventsData;
  },

  loadEventsFromDir,
  loadEvents,
};

module.exports = Bundled;
