var Cache = require('../cache');

var should = require('should');

describe('Cache', function() {
  it('loadEvents', function() {
    return Cache.loadEventsFromRemote().should.be.fulfilled()
    // .then(function(events) {
    //   console.log(events)
    // })
  })
})