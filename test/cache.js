const Cache = require('../lib/cache');
const Days = require('../lib/days');

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

  // TODO: more test
})
