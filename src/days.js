import moment from 'moment';

const rangeToDates = function rangeToDates(startDate, endDate) {
  const dates = [startDate.toDate()];
  const start = startDate.toDate();
  for (let i = 1; i < 100; i += 1) {
    const date = moment(start).add(i, 'days');
    if (date.isSame(endDate, 'day')) {
      dates.push(date.toDate());
      break;
    } else {
      dates.push(date.toDate());
    }
  }

  return dates;
};


/**
 * @class Days
 * @hideconstructor
 */
class Days {
  constructor(name, range, type) {
    this.name = name;
    this.range = range;
    this.type = type;
  }

  /**
   * return if is holiday
   * @returns {boolean}
   */
  isHoliday() {
    return this.type === 'holiday';
  }

  /**
   * return if is workingday
   * @returns {boolean}
   */
  isWorkingday() {
    return this.type === 'workingday';
  }

  /**
   * return days
   * @returns {Array<Date>} days
   */
  days() {
    let startDate = null;
    startDate = moment(this.range[0]);
    if (this.range.length === 1) {
      return [startDate.toDate()];
    }
    if (this.range.length === 2) {
      const endDate = moment(this.range[1]);
      return rangeToDates(startDate, endDate);
    }

    // TODO: handel exception
    return [];
  }
}

module.exports = Days;
