const Bundled = require('../lib/bundled')

const should = require('should');

describe('Bundled', () => {
  it('loadEvents', () => {
    should.equal(Bundled._loadEvents().length, 48)

    const days = Bundled._loadEvents()[0].days()
    should.equal(days.length, 3);
    should(days[0]).be.a.Date();
  })
})