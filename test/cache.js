var Cache = require('../cache');
var Days = require('../days');

var should = require('should');

describe('Cache', function() {
  it('loadEvents', function() {
    return Cache.loadEventsFromRemote().should.be.fulfilled()
  })

  it('loadEventsFromRemote', function(done) {
    Cache.loadEventsFromRemote().then(function(events) {
      events.should.not.be.null()
      events[0].should.instanceOf(Days)
      done()
    }).catch(function(err){
      console.log(err)
    })
  })
})
