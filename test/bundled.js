var Bundled = require('../src/bundled')

var should = require('should');

describe('Bundled', function() {
  it('loadEvents', function() {
    should.equal(Bundled._loadEvents().length, 48)

    var days = Bundled._loadEvents()[0].days()
    should.equal(days.length, 3);
    should(days[0]).be.a.Date();
  })
})